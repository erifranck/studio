import React from 'react';
import { Document, Page, View, StyleSheet } from '@react-pdf/renderer';
import { type CVData } from '@/types/cv';
import { colors } from './styles';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Qualifications } from './components/Qualifications';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontFamily: 'Helvetica',
  },
  mainContent: {
    flexDirection: 'row',
    marginTop: 0,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 20,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
});

export const BaseTemplate: React.FC<{ cvData: CVData }> = ({ cvData }) => {
  return (
    <Document 
      author={cvData.personalInfo.name || "CV Forge User"} 
      title={`${cvData.personalInfo.name || 'CV'} - ${cvData.personalInfo.title || 'Resume'}`}
    >
      <Page size="A4" style={styles.page}>
        <Header personalInfo={cvData.personalInfo} />
        
        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            <Summary summary={cvData.summary} />
            <Experience experiences={cvData.experience} />
          </View>

          <View style={styles.rightColumn}>
            <Education education={cvData.education} />
            <Skills skills={cvData.skills} />
            <Qualifications qualifications={cvData.qualifications} />
          </View>
        </View>
      </Page>
    </Document>
  );
}; 