import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, typography } from '../styles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 11,
    height: 180,
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
  listItemText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.6,
    textAlign: 'justify',
    flexWrap: 'wrap',
    color: colors.darkGrey,
  },
});

interface SummaryProps {
  summary: string;
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
  if (!summary) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
      </View>
      <Text style={styles.listItemText}>{summary}</Text>
    </View>
  );
}; 