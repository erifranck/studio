import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, typography } from '../styles';
import { ExperienceEntry } from '@/types/cv';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitleContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  experienceItem: {
    marginBottom: 14,
  },
  itemDates: {
    ...typography.dates,
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.lightGrey,
  },
  itemTitle: {
    ...typography.itemTitle,
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  itemSubTitle: {
    ...typography.itemSubtitle,
    fontSize: 11,
    marginBottom: 6,
    color: colors.darkGrey,
  },
  listItem: {
    ...typography.body,
    marginBottom: 6,
    flexDirection: 'row',
    lineHeight: 1.6,
    marginLeft: 10,
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
    color: colors.darkGrey,
  },
});

interface ExperienceProps {
  experiences: ExperienceEntry[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  if (experiences.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
      </View>
      {experiences.map((exp) => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, paddingLeft: 5 }}>
              <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
              <Text style={styles.itemSubTitle}>
                {exp.company}
                {exp.location ? `, ${exp.location}` : ''}
              </Text>
              <Text style={[styles.itemDates, { flex: 1, textAlign: 'left', marginBottom: 20 }]}>
                {exp.startDate} - {exp.endDate}
              </Text>
            </View>
          </View>
          {exp.description.split('\n').map((line: string, i: number) => 
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