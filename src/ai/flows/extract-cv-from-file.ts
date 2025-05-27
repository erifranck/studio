'use server';

/**
 * @fileOverview An AI agent that extracts CV information from PDF/DOC files and converts it to structured JSON format.
 *
 * - extractCvFromFile - A function that handles the CV extraction process from files.
 * - ExtractCvFromFileInput - The input type for the extractCvFromFile function.
 * - ExtractCvFromFileOutput - The return type for the extractCvFromFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { type CVData } from '@/types/cv';

const PersonalInfoSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedin: z.string(),
  github: z.string(),
  address: z.string(),
  website: z.string().optional(),
});

const ExperienceEntrySchema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

const EducationEntrySchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  graduationDate: z.string(),
  description: z.string().optional(),
});

const QualificationEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  issuer: z.string().optional(),
});

const CVDataSchema = z.object({
  personalInfo: PersonalInfoSchema,
  summary: z.string(),
  experience: z.array(ExperienceEntrySchema),
  education: z.array(EducationEntrySchema),
  skills: z.array(z.string()),
  qualifications: z.array(QualificationEntrySchema),
});

const ExtractCvFromFileInputSchema = z.object({
  fileContent: z.string().describe('The text content extracted from the CV file.'),
  fileName: z.string().describe('The name of the file being processed.'),
});

export type ExtractCvFromFileInput = z.infer<typeof ExtractCvFromFileInputSchema>;

const ExtractCvFromFileOutputSchema = z.object({
  cvData: CVDataSchema.describe('The extracted CV data in structured JSON format.'),
});

export type ExtractCvFromFileOutput = z.infer<typeof ExtractCvFromFileOutputSchema>;

export async function extractCvFromFile(input: ExtractCvFromFileInput): Promise<ExtractCvFromFileOutput> {
  return extractCvFromFileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractCvFromFilePrompt',
  input: {schema: ExtractCvFromFileInputSchema},
  output: {schema: ExtractCvFromFileOutputSchema},
  prompt: `You are an expert CV parser and data extraction specialist. You will receive the text content of a CV file and need to extract structured information from it.

Your task is to:
1. Analyze the CV content carefully
2. Extract all relevant information into the specified JSON structure
3. Ensure all required fields are filled with appropriate data
4. Generate unique IDs for experience, education, and qualification entries
5. Format dates consistently (e.g., "MMM YYYY" for experience dates, "YYYY-YYYY" for education dates)
6. Extract skills as an array of individual skills
7. Ensure all contact information is properly formatted

File Name: {{{fileName}}}
CV Content:
{{{fileContent}}}

EXTRACTION GUIDELINES:
1. Personal Information:
   - Extract name, title, email, phone, LinkedIn, GitHub, address, and website (if available)
   - Ensure email and phone are in standard formats
   - URLs should be complete and properly formatted
   - If any field is missing, use an empty string

2. Experience:
   - Extract each job entry with title, company, location, dates, and description
   - Generate unique IDs in format "exp1", "exp2", etc.
   - Format dates as "MMM YYYY" (e.g., "Jan 2020")
   - Use "Present" for current positions
   - Preserve bullet points and formatting in descriptions

3. Education:
   - Extract each education entry with degree, institution, location, graduation date, and description
   - Generate unique IDs in format "edu1", "edu2", etc.
   - Format graduation dates as "YYYY-YYYY" or "YYYY"
   - Include any relevant achievements or details in description

4. Skills:
   - Extract all mentioned skills into an array
   - Remove duplicates
   - Keep skills concise and clear
   - Include both technical and soft skills

5. Qualifications:
   - Extract certifications, licenses, and other qualifications
   - Generate unique IDs in format "qual1", "qual2", etc.
   - Include dates, names, and issuing organizations
   - Format dates consistently

6. Summary:
   - Extract or create a professional summary
   - Keep it concise and impactful
   - Focus on key achievements and career goals

IMPORTANT RULES:
- If information is missing for a required field, use an empty string or appropriate default
- Maintain consistent date formats throughout
- Preserve the original meaning and context of all information
- Do not invent or assume information that is not present
- Handle special characters and formatting appropriately
- Ensure all IDs are unique within their respective sections

Return the extracted CV data in the exact JSON structure specified, with all fields properly formatted and organized.`,
});

const extractCvFromFileFlow = ai.defineFlow(
  {
    name: 'extractCvFromFileFlow',
    inputSchema: ExtractCvFromFileInputSchema,
    outputSchema: ExtractCvFromFileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
); 