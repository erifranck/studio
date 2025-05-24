import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, typography } from '../styles';
import { Education as EducationType } from '@/types/cv';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: typography.sectionTitle,
  experienceItem: {
    marginBottom: 14,
  },
  itemDates: {
    ...typography.dates,
    fontSize: 10,
  },
  itemTitle: {
    ...typography.itemTitle,
    fontSize: 11,
    marginBottom: 2,
  },
  itemSubTitle: {
    ...typography.itemSubtitle,
    fontSize: 11,
    marginBottom: 2,
  },
  listItem: {
    ...typography.body,
    marginTop: 10,
    flexDirection: 'row',
    lineHeight: 1.6,
  },
  bullet: {
    width: 10,
    fontSize: 12,
    marginRight: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.6,
  },
});

interface EducationProps {
  education: EducationType[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  if (education.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Education</Text>
      </View>
      {education.map((edu) => (
        <View key={edu.id} style={styles.experienceItem}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, paddingLeft: 15, marginBottom: 5 }}>
              <Text style={styles.itemTitle}>{edu.institution}</Text>
              <Text style={styles.itemSubTitle}>{edu.degree}</Text>
              <Text style={[styles.itemDates, { flex: 1, textAlign: 'left' }]}>
                {edu.graduationDate}
              </Text>
            </View>
          </View>
          {edu.description && edu.description.split('\n').map((line: string, i: number) => 
            line.trim() && (
              <View key={i} style={[styles.listItem, { marginLeft: 10 }]}>
                <Text style={styles.bullet}>• </Text>
                <Text style={styles.listItemText}>{line.replace(/^- /, '')}</Text>
              </View>
            )
          )}
        </View>
      ))}
    </View>
  );
}; 