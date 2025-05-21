
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { CvData } from '@/types/cv'; // Assuming you have a type for your CV data
import {PersonalInfoPreview} from '@/components/cv-preview/personal-info-preview'
import {SummaryPreview} from '@/components/cv-preview/summary-preview'
import { ExperiencePreview } from '@/components/cv-preview/experience-preview';
import { EducationPreview } from '@/components/cv-preview/education-preview';
import { SkillsPreview } from '@/components/cv-preview/skills-preview';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'Helvetica', // You might want to register custom fonts
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    borderBottom: '1px solid #000',
    paddingBottom: 2,
  },
  subheading: {
    fontSize: 12,
    marginBottom: 3,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  }
});

export const CvDocument: React.FC<{ cvData: CvData }> = ({ cvData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={[styles.heading, styles.bold]}>{cvData.personalInfo.name}</Text>
        <Text style={styles.text}>{cvData.personalInfo.title}</Text>
        <Text style={styles.text}>{cvData.personalInfo.email}</Text>
        <Text style={styles.text}>{cvData.personalInfo.phone}</Text>
        <Text style={styles.text}>{cvData.personalInfo.location}</Text>
        <Text style={styles.text}>{cvData.personalInfo.linkedin}</Text>
        <Text style={styles.text}>{cvData.personalInfo.github}</Text>
      </View>

      {/* Summary */}
      {cvData.summary && (
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.text}>{cvData.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          {cvData.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={[styles.subheading, styles.bold]}>{exp.jobTitle} at {exp.company}</Text>
              <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {cvData.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={[styles.subheading, styles.bold]}>{edu.degree} from {edu.institution}</Text>
              <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
              <Text style={styles.text}>{edu.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text style={styles.text}>{cvData.skills.join(', ')}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export const CvPdfDownloadLink: React.FC<{ cvData: CvData, fileName?: string }> = ({ cvData, fileName = 'cv.pdf' }) => (
  <PDFDownloadLink document={<CvDocument cvData={cvData} />} fileName={fileName}>
    {({ blob, url, loading, error }) =>
      loading ? 'Preparing PDF...' : 'Download PDF'
    }
  </PDFDownloadLink>
);
