import { StyleSheet } from '@react-pdf/renderer';

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
    marginBottom: 24,
  },
  nameText: {
    ...typography.name,
    marginBottom: 4,
  },
  titleBanner: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  titleText: typography.title,
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
    color: colors.lightGrey,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  mainContent: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 20,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
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
    fontSize: 12,
  },
  itemSubTitle: {
    ...typography.itemSubtitle,
    fontSize: 11,
    marginBottom: 2,
  },
  listItem: {
    ...typography.body,
    marginBottom: 6,
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