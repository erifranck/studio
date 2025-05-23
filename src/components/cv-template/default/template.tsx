import React from 'react';
import { type CVData } from '@/types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

// Shared color constants
export const colors = {
  primary: '#B71C1C',
  lightGrey: '#4A4A4A',
  darkGrey: '#333333',
  border: '#E0E0E0',
  white: '#FFFFFF',
};

// Shared typography constants
export const typography = {
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase' as const,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase' as const,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
  },
  itemSubtitle: {
    fontSize: 10,
    color: colors.darkGrey,
  },
  dates: {
    fontSize: 9,
    color: colors.lightGrey,
    fontStyle: 'italic' as const,
  },
  body: {
    fontSize: 10,
    color: colors.darkGrey,
    lineHeight: 1.4,
  },
};

// PDF Styles
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 25,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: typography.name,
  titleBanner: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  titleText: typography.title,
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
    color: colors.lightGrey,
    marginHorizontal: 8,
    marginVertical: 2,
  },
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
    borderLeftColor: colors.border,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitleContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  sectionTitle: typography.sectionTitle,
  experienceItem: {
    marginBottom: 10,
  },
  itemDates: typography.dates,
  itemTitle: typography.itemTitle,
  itemSubTitle: typography.itemSubtitle,
  listItem: {
    ...typography.body,
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
});

// HTML Styles (Tailwind classes)
export const htmlStyles = {
  page: 'p-8',
  headerContainer: 'text-center mb-5',
  name: 'text-[28pt] font-bold text-[#333333] mb-0.5',
  titleBanner: 'bg-[#B71C1C] text-white py-1 px-5 mb-2 text-[13pt] font-bold uppercase',
  contactInfo: 'flex flex-wrap justify-center items-center mb-4 py-2 border-t border-b border-[#E0E0E0] text-[9pt] text-[#4A4A4A]',
  contactItem: 'mx-2 my-0.5',
  mainContent: 'flex gap-4',
  leftColumn: 'flex-[2] pr-4',
  rightColumn: 'flex-1 pl-4 border-l border-[#E0E0E0]',
  section: 'mb-4',
  sectionHeader: 'bg-[#B71C1C] text-white py-0.5 px-2 mb-2 text-[11pt] font-bold uppercase',
  itemTitle: 'text-[11pt] font-bold text-[#B71C1C]',
  itemSubtitle: 'text-[10pt] text-[#333333] mb-0.5',
  itemDates: 'text-[9pt] text-[#4A4A4A] italic',
  listItem: 'flex ml-4 mb-1',
  bullet: 'w-2',
  listItemText: 'flex-1 text-[10pt] text-[#333333] leading-[1.4]',
};

// Base Template Component
export const BaseTemplate: React.FC<{ cvData: CVData }> = ({ cvData }) => {
  const halfSkillsIndex = Math.ceil(cvData.skills.length / 2);
  const keySkills = cvData.skills.slice(0, halfSkillsIndex);
  const additionalSkills = cvData.skills.slice(halfSkillsIndex);

  return (
    <Document author={cvData.personalInfo.name || "CV Forge User"} title={`${cvData.personalInfo.name || 'CV'} - ${cvData.personalInfo.title || 'Resume'}`}>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.headerContainer}>
          <Text style={pdfStyles.nameText}>{(cvData.personalInfo.name || "LEO O'REILLY").toUpperCase()}</Text>
          <View style={pdfStyles.titleBanner}>
            <Text style={pdfStyles.titleText}>{cvData.personalInfo.title || "CARE WORKER"}</Text>
          </View>
          <View style={pdfStyles.contactInfoContainer}>
            {cvData.personalInfo.linkedin && (
              <View style={pdfStyles.contactItem}>
                <Text>LinkedIn: {cvData.personalInfo.linkedin}</Text>
              </View>
            )}
            {cvData.personalInfo.phone && (
              <View style={pdfStyles.contactItem}>
                <Text>Phone: {cvData.personalInfo.phone}</Text>
              </View>
            )}
            {cvData.personalInfo.email && (
              <View style={pdfStyles.contactItem}>
                <Text>Email: {cvData.personalInfo.email}</Text>
              </View>
            )}
            {cvData.personalInfo.address && (
              <View style={pdfStyles.contactItem}>
                <Text>Location: {cvData.personalInfo.address}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={pdfStyles.mainContent}>
          <View style={pdfStyles.leftColumn}>
            {/* Personal Statement */}
            {cvData.summary && (
              <View style={pdfStyles.section}>
                <View style={pdfStyles.sectionTitleContainer}>
                  <Text style={pdfStyles.sectionTitle}>Personal Statement</Text>
                </View>
                <Text style={pdfStyles.listItemText}>{cvData.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {cvData.experience.length > 0 && (
              <View style={pdfStyles.section}>
                <View style={pdfStyles.sectionTitleContainer}>
                  <Text style={pdfStyles.sectionTitle}>Work Experience</Text>
                </View>
                {cvData.experience.map((exp) => (
                  <View key={exp.id} style={pdfStyles.experienceItem}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[pdfStyles.itemDates, { flex: 1, textAlign: 'left' }]}>{exp.startDate} - {exp.endDate}</Text>
                      <View style={{ flex: 3, paddingLeft: 5 }}>
                        <Text style={pdfStyles.itemTitle}>{exp.jobTitle}</Text>
                        <Text style={pdfStyles.itemSubTitle}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                      </View>
                    </View>
                    {exp.description.split('\n').map((line, i) => line.trim() && (
                      <View key={i} style={[pdfStyles.listItem, { marginLeft: 10 }]}>
                        <Text style={pdfStyles.bullet}>• </Text>
                        <Text style={pdfStyles.listItemText}>{line.replace(/^- /, '')}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={pdfStyles.rightColumn}>
            {/* Education */}
            {cvData.education.length > 0 && (
              <View style={pdfStyles.section}>
                <View style={pdfStyles.sectionTitleContainer}>
                  <Text style={pdfStyles.sectionTitle}>Education</Text>
                </View>
                {cvData.education.map((edu) => (
                  <View key={edu.id} style={pdfStyles.experienceItem}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[pdfStyles.itemDates, { flex: 1, textAlign: 'left' }]}>{edu.graduationDate}</Text>
                      <View style={{ flex: 3, paddingLeft: 5 }}>
                        <Text style={pdfStyles.itemTitle}>{edu.institution}</Text>
                        <Text style={pdfStyles.itemSubTitle}>{edu.degree}</Text>
                      </View>
                    </View>
                    {edu.description && edu.description.split('\n').map((line, i) => line.trim() && (
                      <View key={i} style={[pdfStyles.listItem, { marginLeft: 10 }]}>
                        <Text style={pdfStyles.bullet}>• </Text>
                        <Text style={pdfStyles.listItemText}>{line.replace(/^- /, '')}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {cvData.skills.length > 0 && (
              <>
                <View style={pdfStyles.section}>
                  <View style={pdfStyles.sectionTitleContainer}>
                    <Text style={pdfStyles.sectionTitle}>Key Skills</Text>
                  </View>
                  {keySkills.map((skill, i) => (
                    <View key={i} style={pdfStyles.listItem}>
                      <Text style={pdfStyles.bullet}>• </Text>
                      <Text style={pdfStyles.listItemText}>{skill}</Text>
                    </View>
                  ))}
                </View>

                <View style={pdfStyles.section}>
                  <View style={pdfStyles.sectionTitleContainer}>
                    <Text style={pdfStyles.sectionTitle}>Additional Skills</Text>
                  </View>
                  {additionalSkills.map((skill, i) => (
                    <View key={i} style={pdfStyles.listItem}>
                      <Text style={pdfStyles.bullet}>• </Text>
                      <Text style={pdfStyles.listItemText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Qualifications */}
            {cvData.qualifications.length > 0 && (
              <View style={pdfStyles.section}>
                <View style={pdfStyles.sectionTitleContainer}>
                  <Text style={pdfStyles.sectionTitle}>Qualifications</Text>
                </View>
                {cvData.qualifications.map((qual) => (
                  <View key={qual.id} style={pdfStyles.experienceItem}>
                    <Text style={pdfStyles.itemDates}>{qual.date}</Text>
                    <Text style={pdfStyles.itemTitle}>{qual.name}</Text>
                    {qual.issuer && <Text style={pdfStyles.itemSubTitle}>{qual.issuer}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}; 