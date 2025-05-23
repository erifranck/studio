import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, PDFDownloadLink, renderToStream } from '@react-pdf/renderer';
import { type CVData, type ExperienceEntry, type EducationEntry, type QualificationEntry } from '@/types/cv';
import { BaseTemplate } from '@/components/cv-template/default/template';
import { TemplateHTML } from '@/components/cv-template/default/template-html';

// Using consistent color constants
const primaryColor = '#B71C1C';
const lightGreyText = '#4A4A4A';
const darkGreyText = '#333333';
const borderColor = '#E0E0E0';
const whiteColor = '#FFFFFF';

// It's good practice to register fonts if you use specific ones.
// For simplicity, we'll rely on Helvetica (default sans-serif) and standard PDF fonts.
// If Montserrat is strictly needed in PDF, TTF files would need to be added and registered.
// Font.register({
//   family: 'Montserrat',
//   fonts: [
//     { src: '/path/to/Montserrat-Regular.ttf' },
//     { src: '/path/to/Montserrat-Bold.ttf', fontWeight: 'bold' },
//   ],
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: whiteColor,
    paddingHorizontal: 30,
    paddingVertical: 25,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkGreyText,
    marginBottom: 2,
  },
  titleBanner: {
    backgroundColor: primaryColor,
    paddingVertical: 4,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: whiteColor,
    textTransform: 'uppercase',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderTopColor: borderColor,
    borderTopWidth: 1,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
    color: lightGreyText,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  // SVG/Icon handling would be more complex, using text placeholders for now
  // contactIcon: { marginRight: 3, color: primaryColor }, 
  mainContent: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 15,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: borderColor,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitleContainer: {
    backgroundColor: primaryColor,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: whiteColor,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 10,
    color: darkGreyText,
    lineHeight: 1.4,
  },
  listItem: {
    fontSize: 10,
    color: darkGreyText,
    lineHeight: 1.4,
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
    fontSize: 10,
    marginRight: 0,
  },
  listItemText: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: primaryColor,
  },
  itemSubTitle: {
    fontSize: 10,
    color: darkGreyText,
    marginBottom: 1,
  },
  itemDates: {
    fontSize: 9,
    color: lightGreyText,
    fontStyle: 'italic',
  },
  educationItem: {
    marginBottom: 10,
  },
  link: {
    color: lightGreyText,
    textDecoration: 'none',
  }
});

const renderContactItem = (label: string, value?: string) => {
  if (!value) return null;
  const isLink = label.toLowerCase().includes('linkedin') || label.toLowerCase().includes('email') || label.toLowerCase().includes('github') || label.toLowerCase().includes('website');
  let displayValue = value;
  if (isLink) {
    displayValue = value.replace(/^https?:\/\//, '').replace(/^www\./, '');
  }
  const href = label.toLowerCase().includes('email') ? `mailto:${value}` : (isLink ? `https://${value.replace(/^https?:\/\//, '')}`: undefined);

  return (
    <View style={styles.contactItem}>
      {/* Icon placeholder - e.g., Text for 'LI', 'Ph', 'Em' */}
      {/* <Text style={styles.contactIcon}>{label.substring(0,2)}: </Text> */}
      {href ? <Link src={href} style={styles.link}><Text>{displayValue}</Text></Link> : <Text>{displayValue}</Text>}
    </View>
  );
};

// Personal Info Component
const PersonalInfo: React.FC<{ data: CVData['personalInfo'] }> = ({ data }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.nameText}>{(data.name || "LEO O'REILLY").toUpperCase()}</Text>
    <View style={styles.titleBanner}>
      <Text style={styles.titleText}>{data.title || "CARE WORKER"}</Text>
    </View>
    <View style={styles.contactInfoContainer}>
      {data.linkedin && renderContactItem('LinkedIn', data.linkedin)}
      {data.phone && renderContactItem('Phone', data.phone)}
      {data.email && renderContactItem('Email', data.email)}
      {data.address && renderContactItem('Location', data.address)}
    </View>
  </View>
);

// Personal Statement Component
const PersonalStatement: React.FC<{ summary?: string }> = ({ summary }) => {
  if (!summary) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Personal Statement</Text>
      </View>
      <Text style={styles.sectionContent}>{summary}</Text>
    </View>
  );
};

// Experience Component
const Experience: React.FC<{ experience: ExperienceEntry[] }> = ({ experience }) => {
  if (experience.length === 0) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
      </View>
      {experience.map((exp) => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.itemDates, { flex: 1, textAlign: 'left' }]}>{exp.startDate} - {exp.endDate}</Text>
            <View style={{ flex: 3, paddingLeft: 5 }}>
              <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
              <Text style={styles.itemSubTitle}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
            </View>
          </View>
          {exp.description.split('\n').map((line, i) => line.trim() && (
            <View key={i} style={[styles.listItem, { marginLeft: 10 }]}>
              <Text style={styles.bullet}>• </Text>
              <Text style={styles.listItemText}>{line.replace(/^- /, '')}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

// Education Component
const Education: React.FC<{ education: EducationEntry[] }> = ({ education }) => {
  if (education.length === 0) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Education</Text>
      </View>
      {education.map((edu) => (
        <View key={edu.id} style={styles.educationItem}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.itemDates, { flex: 1, textAlign: 'left' }]}>{edu.graduationDate}</Text>
            <View style={{ flex: 3, paddingLeft: 5 }}>
              <Text style={styles.itemTitle}>{edu.institution}</Text>
              <Text style={styles.itemSubTitle}>{edu.degree}</Text>
            </View>
          </View>
          {edu.description && edu.description.split('\n').map((line, i) => line.trim() && (
            <View key={i} style={[styles.listItem, { marginLeft: 10 }]}>
              <Text style={styles.bullet}>• </Text>
              <Text style={styles.listItemText}>{line.replace(/^- /, '')}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

// Skills Component
const Skills: React.FC<{ skills: string[], title: string }> = ({ skills, title }) => {
  if (skills.length === 0) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {skills.map((skill, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemText}>{skill}</Text>
        </View>
      ))}
    </View>
  );
};

// Qualifications Component
const Qualifications: React.FC<{ qualifications: QualificationEntry[] }> = ({ qualifications }) => {
  if (qualifications.length === 0) return null;
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Qualifications</Text>
      </View>
      {qualifications.map((qual) => (
        <View key={qual.id} style={styles.educationItem}>
          <Text style={styles.itemDates}>{qual.date}</Text>
          <Text style={styles.itemTitle}>{qual.name}</Text>
          {qual.issuer && <Text style={styles.itemSubTitle}>{qual.issuer}</Text>}
        </View>
      ))}
    </View>
  );
};

export const CvDocument: React.FC<{ cvData: CVData }> = ({ cvData }) => {
  const halfSkillsIndex = Math.ceil(cvData.skills.length / 2);
  const keySkills = cvData.skills.slice(0, halfSkillsIndex);
  const additionalSkills = cvData.skills.slice(halfSkillsIndex);

  return (
    <BaseTemplate cvData={cvData} />
  );
};

