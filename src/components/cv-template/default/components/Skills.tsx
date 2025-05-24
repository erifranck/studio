import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    backgroundColor: '#B71C1C',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
    minHeight: 32, // height fijo para evitar desfases
  },
  chip: {
    backgroundColor: '#F2F2F2',
    color: '#4A4A4A',
    fontSize: 10,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
    fontWeight: 400,
  },
});

interface SkillsProps {
  skills: string[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (skills.length === 0) return null;


  return (
    <>
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Skills</Text>
        </View>
        <View style={styles.chipContainer}>
          {skills.map((skill, i) => (
            <Text key={i} style={styles.chip}>{skill}</Text>
          ))}
        </View>
      </View>
    </>
  );
}; 