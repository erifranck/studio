import { type SetStateAction } from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  address: string;
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
  location: string;
  graduationDate: string;
  description?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[]; // Array of skill strings
}

export const initialCvData: CVData = {
  personalInfo: {
    name: 'Your Name',
    title: 'Aspiring Professional',
    email: 'your.email@example.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername',
    address: 'City, State',
    website: 'yourportfolio.com'
  },
  summary:
    'A brief and compelling summary about yourself, your career goals, and what you bring to the table. Highlight your key achievements and skills. Aim for 2-4 sentences.',
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Relevant Job Title',
      company: 'Company Name',
      location: 'City, State',
      startDate: 'Month YYYY',
      endDate: 'Present',
      description:
        '- Achieved X by implementing Y, resulting in Z% improvement.\n- Led a team of N to deliver project P ahead of schedule.\n- Developed and maintained Q using technologies R, S, and T.',
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Degree Name (e.g., B.S. in Computer Science)',
      institution: 'University Name',
      location: 'City, State',
      graduationDate: 'Month YYYY',
      description: 'Optional: Relevant coursework, honors, GPA (if noteworthy).',
    },
  ],
  skills: ['Skill 1', 'Skill 2', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Problem Solving'],
};

// Type for the function that opens the AI enhancement dialog
export type OpenAiEnhanceDialogFn = (
  currentText: string,
  onApplyEnhancement: (enhancedText: string) => void
) => void;

// Prop types for editor components
export interface SectionEditorProps<T> {
  data: T;
  onChange: (field: keyof T, value: any) => void;
  openAiEnhanceDialog?: OpenAiEnhanceDialogFn;
  // For list items like experience/education
  onListChange?: (index: number, field: keyof T extends (infer K)[] ? K : never, value: any) => void;
  onListAddItem?: () => void;
  onListRemoveItem?: (id: string) => void;
  // Specific for text areas that can be enhanced
  enhanceableFields?: Array<{ field: keyof T, label: string }>;
}

export type SetCvDataFn = (update: SetStateAction<CVData>) => void;
