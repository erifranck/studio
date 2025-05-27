'use server';

/**
 * @fileOverview An AI agent that enhances or transforms an entire CV based on user prompts.
 *
 * - enhanceFullCv - A function that handles the full CV enhancement process.
 * - EnhanceFullCvInput - The input type for the enhanceFullCv function.
 * - EnhanceFullCvOutput - The return type for the enhanceFullCv function.
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

const EnhanceFullCvInputSchema = z.object({
  cvData: CVDataSchema.describe('The complete CV data to be enhanced or transformed.'),
  userPrompt: z.string().describe('The user\'s specific request for how to enhance or change the CV (e.g., "change focus from Backend Developer to Frontend Developer").'),
});

export type EnhanceFullCvInput = z.infer<typeof EnhanceFullCvInputSchema>;

const EnhanceFullCvOutputSchema = z.object({
  enhancedCvData: CVDataSchema.describe('The enhanced CV data with all improvements applied.'),
});

export type EnhanceFullCvOutput = z.infer<typeof EnhanceFullCvOutputSchema>;

export async function enhanceFullCv(input: EnhanceFullCvInput): Promise<EnhanceFullCvOutput> {
  return enhanceFullCvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceFullCvPrompt',
  input: {schema: EnhanceFullCvInputSchema},
  output: {schema: EnhanceFullCvOutputSchema},
  prompt: `You are an expert CV writer and career consultant. You will receive a complete CV in JSON format and a specific user request for how to enhance or transform it.

Your task is to:
1. Analyze the current CV data
2. Apply the user's requested changes or improvements
3. Enhance the content to be more impactful and professional
4. Maintain the same JSON structure while improving all relevant fields
5. Ensure consistency across all sections after the transformation

User Request: {{{userPrompt}}}

Current CV Data:
{{{cvData}}}

CRITICAL INSTRUCTIONS - DO NOT MODIFY THESE FIELDS:
1. PERSONAL INFORMATION (preserve EXACTLY as provided):
   - personalInfo.name - NEVER change the person's name
   - personalInfo.email - NEVER change the email address
   - personalInfo.phone - NEVER change the phone number
   - personalInfo.linkedin - NEVER change the LinkedIn URL
   - personalInfo.github - NEVER change the GitHub URL
   - personalInfo.website - NEVER change the website URL
   - personalInfo.address - NEVER change the address/location

2. EXPERIENCE FIELDS (preserve EXACTLY as provided):
   - experience[].id - Keep all IDs unchanged
   - experience[].jobTitle - ONLY change if user explicitly requests job title changes (e.g., "adapt job titles for X role")
   - experience[].company - NEVER change company names
   - experience[].location - NEVER change locations
   - experience[].startDate - NEVER change start dates
   - experience[].endDate - NEVER change end dates

3. EDUCATION FIELDS (preserve EXACTLY as provided):
   - education[].id - Keep all IDs unchanged
   - education[].degree - NEVER change degree names
   - education[].institution - NEVER change institution names
   - education[].location - NEVER change locations
   - education[].graduationDate - NEVER change graduation dates

4. QUALIFICATION FIELDS (preserve EXACTLY as provided):
   - qualifications[].id - Keep all IDs unchanged
   - qualifications[].date - NEVER change dates
   - qualifications[].name - Keep the exact qualification name (can improve formatting only)
   - qualifications[].issuer - NEVER change issuer names

FIELDS YOU CAN AND SHOULD ENHANCE:
- personalInfo.title - Only modify if user specifically requests a career change (e.g., "Backend to Frontend Developer")
- summary - Improve to be more compelling and relevant
- experience[].description - ONLY enhance the description text with action verbs and better formatting
- education[].description - ONLY improve description text if present
- skills[] - Optimize skill list for relevance based on user request

ENHANCEMENT GUIDELINES:
- If the user requests a career focus change (e.g., Backend to Frontend), update ONLY the title, summary, experience descriptions, and skills accordingly
- If the user requests to adapt/change job titles (e.g., "adapt job titles for marketing role"), you MAY modify the jobTitle fields in experience entries
- Enhance job descriptions with action verbs and quantifiable achievements
- Make content ATS-friendly and professionally written
- Maintain all factual accuracy - do not invent information
- Use consistent formatting and style throughout

FINAL CRITICAL REMINDER:
You MUST preserve ALL factual data exactly as provided. This includes:
- ALL dates (start dates, end dates, graduation dates, qualification dates)
- ALL names (person name, company names, institution names, degree names)
- ALL locations
- ALL job titles (unless user specifically requests a career change)
- ALL contact information

ONLY modify the descriptive text content to improve quality and impact. If a field is empty, leave it empty. Do NOT invent or add new information.

Return the enhanced CV data in the exact same JSON structure with all factual information preserved EXACTLY as provided.`,
});

const enhanceFullCvFlow = ai.defineFlow(
  {
    name: 'enhanceFullCvFlow',
    inputSchema: EnhanceFullCvInputSchema,
    outputSchema: EnhanceFullCvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
); 