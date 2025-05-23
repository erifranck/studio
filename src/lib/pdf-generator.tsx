import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { type CVData, type ExperienceEntry, type EducationEntry } from '@/types/cv';

// Using a common red color from the wireframe
const primaryColor = '#B71C1C'; // A strong red, adjust if a specific one is preferred
const lightGreyText = '#4A4A4A';
const darkGreyText = '#333333';
const borderColor = '#E0E0E0'; // Light grey for subtle borders

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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 25,
    fontFamily: 'Helvetica', // Defaulting to Helvetica
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
    // fontFamily: 'Montserrat', // Would require font registration
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
    color: '#FFFFFF',
    textTransform: 'uppercase',
    // fontFamily: 'Montserrat',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // In wireframe it's left-aligned under banner, but contact bar is wider
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
    flex: 2, // Takes up more space
    paddingRight: 15,
  },
  rightColumn: {
    flex: 1, // Takes up less space
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
    color: '#FFFFFF',
    textTransform: 'uppercase',
    // fontFamily: 'Montserrat',
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
    marginRight:0,
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
    // fontFamily: 'Montserrat',
  },
  itemSubTitle: { // For company/institution
    fontSize: 10,
    color: darkGreyText,
    marginBottom: 1,
  },
  itemDates: {
    fontSize: 9,
    color: lightGreyText,
    fontStyle: 'italic', // Dates in wireframe appear italicized and smaller
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


export const CvDocument: React.FC<{ cvData: CVData }> = ({ cvData }) => (
  <Document author={cvData.personalInfo.name || "CV Forge User"} title={`${cvData.personalInfo.name || 'CV'} - ${cvData.personalInfo.title || 'Resume'}`}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.nameText}>{(cvData.personalInfo.name || "LEO O'REILLY").toUpperCase()}</Text>
        <View style={styles.titleBanner}>
          <Text style={styles.titleText}>{cvData.personalInfo.title || "CARE WORKER"}</Text>
        </View>
      </View>
      <View style={styles.contactInfoContainer}>
        {renderContactItem('LinkedIn', cvData.personalInfo.linkedin)}
        {renderContactItem('Phone', cvData.personalInfo.phone)}
        {renderContactItem('Email', cvData.personalInfo.email)}
        {renderContactItem('Location', cvData.personalInfo.address)}
        {/* Github and Website are not in the wireframe's top contact bar */}
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {cvData.summary && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>Personal Statement</Text></View>
              <Text style={styles.sectionContent}>{cvData.summary}</Text>
            </View>
          )}

          {cvData.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>Work Experience</Text></View>
              {cvData.experience.map((exp: ExperienceEntry) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={{ flexDirection: 'row' }}>
                     <Text style={[styles.itemDates, { flex: 1, textAlign: 'left'}]}>{exp.startDate} - {exp.endDate}</Text>
                     <View style={{ flex: 3, paddingLeft: 5}}>
                        <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.itemSubTitle}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                     </View>
                  </View>
                  {exp.description.split('\n').map((line, i) => line.trim() && (
                    <View key={i} style={[styles.listItem, {marginLeft: 10}]}>
                       <Text style={styles.bullet}>• </Text>
                       <Text style={styles.listItemText}>{line.replace(/^- /, '')}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {cvData.education.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>Education</Text></View>
              {cvData.education.map((edu: EducationEntry) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.itemDates, {flex:1, textAlign: 'left'}]}>{edu.graduationDate}</Text> {/* Assuming graduationDate implies a range or single date like "2010-201X" */}
                     <View style={{ flex: 3, paddingLeft: 5}}>
                        <Text style={styles.itemTitle}>{edu.institution}</Text>
                        <Text style={styles.itemSubTitle}>{edu.degree}</Text>
                     </View>
                  </View>
                  {edu.description && edu.description.split('\n').map((line, i) => line.trim() && (
                     <View key={i} style={[styles.listItem, {marginLeft: 10}]}>
                       <Text style={styles.bullet}>• </Text>
                       <Text style={styles.listItemText}>{line.replace(/^- /, '')}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {cvData.skills.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>Key Skills</Text></View>
              {cvData.skills.slice(0, Math.ceil(cvData.skills.length / 2)).map((skill, i) => ( // Example: First half as key skills
                <View key={`key-${i}`} style={styles.listItem}><Text style={styles.bullet}>• </Text><Text style={styles.listItemText}>{skill}</Text></View>
              ))}
            </View>
          )}
          
          {/* Placeholder for Additional Skills */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>Additional Skills</Text></View>
             {cvData.skills.slice(Math.ceil(cvData.skills.length / 2)).map((skill, i) => ( // Example: Second half as additional skills
                <View key={`add-${i}`} style={styles.listItem}><Text style={styles.bullet}>• </Text><Text style={styles.listItemText}>{skill}</Text></View>
              ))}
            {(cvData.skills.length < 3) && <>
                <View style={styles.listItem}><Text style={styles.bullet}>• </Text><Text style={styles.listItemText}>Time management skills</Text></View>
                <View style={styles.listItem}><Text style={styles.bullet}>• </Text><Text style={styles.listItemText}>Empathy</Text></View>
                <View style={styles.listItem}><Text style={styles.bullet}>• </Text><Text style={styles.listItemText}>Communication skills</Text></View>
            </>}
          </View>

          {/* Qualifications Section */}
          {cvData.qualifications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>Qualifications</Text></View>
              {cvData.qualifications.map((qual) => (
                <View key={qual.id} style={styles.educationItem}>
                  <Text style={styles.itemDates}>{qual.date}</Text>
                  <Text style={styles.itemTitle}>{qual.name}</Text>
                  {qual.issuer && <Text style={styles.itemSubTitle}>{qual.issuer}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

// This component is not used by page.tsx directly for download, 
// but kept for potential direct use or as a reference.
// The page.tsx uses PDFDownloadLink with CvDocument.
export const CvPdfDownloadLink: React.FC<{ cvData: CVData, fileName?: string }> = ({ cvData, fileName = 'cv.pdf' }) => (
  <PDFDownloadLink document={<CvDocument cvData={cvData} />} fileName={fileName}>
    {({ blob, url, loading, error }) =>
      loading ? 'Preparing PDF...' : 'Download PDF'
    }
  </PDFDownloadLink>
);
