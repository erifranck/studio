import { type SetStateAction } from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  address: string; // For Location
  website?: string;
}

export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string; // Multiline, use \n for bullets
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string; // Though wireframe doesn't show location for education explicitly
  graduationDate: string; // Could be "Year" or "Month YYYY" or "Year - Year"
  description?: string; // For bullet points like "Top 10% in the course"
}

// For future expansion to match wireframe more closely
// export interface QualificationEntry {
//   id: string;
//   date: string;
//   name: string;
//   issuer?: string;
// }

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string; // Maps to "Personal Statement"
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[]; // Will be used for "Key Skills" and "Additional Skills"
  // qualifications: QualificationEntry[]; // Future
}

export const initialCvData: CVData = {
  personalInfo: {
    name: 'Leo O\'Reilly', // Updated to match wireframe example
    title: 'Care Worker', // Updated
    email: 'your.name@email.com',
    phone: '07123 456 789',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername', // Not in wireframe header
    address: 'Smethwick, Sandwell, SE23 SW', // Location
    website: 'yourportfolio.com' // Not in wireframe header
  },
  summary: // Placeholder for Personal Statement
    'Client-focused Care Worker with a 12-year track record of providing dependable care and support to patients. Demonstrate thorough understanding of the CQC Quality Commissions regulatory structure and the Health and Social Care Act. An outstanding team player who is trustworthy and industrious. Strive to apply knowledge and expertise to provide patients with the individualised care and support they need to manage a range of medical conditions.',
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Care Worker',
      company: 'Cleveland Clinic',
      location: 'London',
      startDate: 'Sep 2011',
      endDate: 'Present',
      description:
        '- Achieved 20% reduction in recovery time by assessing patients at every stage creating and delivering recovery-boosting support along the recovery journey.\n- Maintain 100% adherence to DPA guidelines to ensure the security and privacy of patients\' sensitive information.\n- Manage a caseload of 3-4 patients weekly, offering them care and help on a regular schedule.\n- Received 5 personal letters from patients and family members thanking me for my excellent client handling skills.\n- Assist patients begin their day with daily activities including bathing, eating, and movement needs.',
    },
     {
      id: 'exp2',
      jobTitle: 'Care Worker',
      company: 'Northfields Nursing Home',
      location: 'Birmingham',
      startDate: 'Aug 2009',
      endDate: 'Aug 2011',
      description:
        '- Provided daily personal care to a caseload of 10 elderly residents, ensuring their hygiene and comfort needs were met in accordance with individual care plans.',
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'MA Counselling Psychology',
      institution: 'University of Leeds',
      location: 'Leeds', // Assuming location for consistency
      graduationDate: '2009-2010', // Format from wireframe
      description: '- Top 10% in the course',
    },
    {
      id: 'edu2',
      degree: 'BSc (Hons) Guidance and Counselling',
      institution: 'University of Portsmouth',
      location: 'Portsmouth', // Assuming location
      graduationDate: '2006-2009',
      description: '- UDLP Module (A)', // Example detail from wireframe
    },
  ],
  skills: [ // This will be split for Key and Additional skills
    'Patient Care', 
    'Medicine administration', 
    'First aid', 
    'NHS Constitution', 
    'Safeguarding', 
    'MID Confidentiality policies',
    'Measuring Vitals', // End of Key Skills from wireframe
    'Time management skills', // Start of Additional Skills from wireframe
    'Empathy',
    'Communication skills'
  ],
  // qualifications: [ // Example for future data structure
  //   { id: 'q1', date: '2011', name: 'FULL CARE CERTIFICATE', issuer: 'Relevant Body'}
  // ]
};

// Type for the function that opens the AI enhancement dialog
export type OpenAiEnhanceDialogFn = (
  currentText: string,
  onApplyEnhancement: (enhancedText: string) => void
) => void;

export type SetCvDataFn = (update: SetStateAction<CVData>) => void;

// Props for editor components not changed in this step, but would need updates for new data fields.
export interface SectionEditorProps<T> {
  data: T;
  onChange: (field: keyof T, value: any) => void;
  openAiEnhanceDialog?: OpenAiEnhanceDialogFn;
  onListChange?: (index: number, field: keyof T extends (infer K)[] ? K : never, value: any) => void;
  onListAddItem?: () => void;
  onListRemoveItem?: (id: string) => void;
  enhanceableFields?: Array<{ field: keyof T, label: string }>;
}
