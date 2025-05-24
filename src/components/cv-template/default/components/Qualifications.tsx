import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, typography } from '../styles';
import { Qualification } from '@/types/cv';

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
    color: colors.lightGrey,
    fontStyle: 'italic',
    fontSize: 10,
  },
  itemTitle: {
    ...typography.itemTitle,
    fontSize: 12,
    marginBottom: 5,
  },
  itemSubTitle: {
    ...typography.itemSubtitle,
    fontSize: 10,
    marginBottom: 2,
    color: colors.lightGrey,
    fontStyle: 'italic',
  },
});

interface QualificationsProps {
  qualifications: Qualification[];
}

export const Qualifications: React.FC<QualificationsProps> = ({ qualifications }) => {
  if (qualifications.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Qualifications</Text>
      </View>
      {qualifications.map((qual) => (
        <View key={qual.id} style={styles.experienceItem}>
          <Text style={styles.itemTitle}>{qual.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemDates}>{qual.date}</Text>
            <Text style={styles.itemSubTitle}>•</Text>
            {qual.issuer && <Text style={styles.itemSubTitle}>{qual.issuer}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}; 