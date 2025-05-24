import React from 'react';
import { View, Text, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { PersonalInfo } from '@/types/cv';

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    height: 140,
    justifyContent: 'flex-start',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 700,
    color: '#333333',
    marginBottom: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 0,
    height: 32,
  },
  titleBanner: {
    backgroundColor: '#B71C1C',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderRadius: 2,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  titleText: {
    fontSize: 13,
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#fff',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingVertical: 8,
    minHeight: 32,
    gap: 0,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
    color: '#4A4A4A',
    marginHorizontal: 10,
    marginVertical: 5,
    gap: 2,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 4,
    color: '#4A4A4A',
  },
});

interface HeaderProps {
  personalInfo: PersonalInfo;
}

export const Header: React.FC<HeaderProps> = ({ personalInfo }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.nameText}>{(personalInfo.name || "LEO O'REILLY").toUpperCase()}</Text>
      <View style={styles.titleBanner}>
        <Text style={styles.titleText}>{(personalInfo.title || 'CARE WORKER').toUpperCase()}</Text>
      </View>
      <View style={styles.contactInfoContainer}>
        {personalInfo.linkedin && (
          <View style={styles.contactItem}>
            <Svg style={styles.icon} viewBox="0 0 24 24">
              <Path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                fill="#4A4A4A"
              />
            </Svg>
            <Text>{personalInfo.linkedin}</Text>
          </View>
        )}
        {personalInfo.phone && (
          <View style={styles.contactItem}>
            <Svg style={styles.icon} viewBox="0 0 24 24">
              <Path
                d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-8.9-9-8.9v2c3.9 0 7 3.1 7 6.9z"
                fill="#4A4A4A"
              />
            </Svg>
            <Text>{personalInfo.phone}</Text>
          </View>
        )}
        {personalInfo.email && (
          <View style={styles.contactItem}>
            <Svg style={styles.icon} viewBox="0 0 24 24">
              <Path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill="#4A4A4A"
              />
            </Svg>
            <Text>{personalInfo.email}</Text>
          </View>
        )}
        {personalInfo.address && (
          <View style={styles.contactItem}>
            <Svg style={styles.icon} viewBox="0 0 24 24">
              <Path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="#4A4A4A"
              />
            </Svg>
            <Text>{personalInfo.address}</Text>
          </View>
        )}
      </View>
    </View>
  );
};