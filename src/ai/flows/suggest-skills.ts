'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestSkillsInputSchema = z.object({
  role: z.string().optional().describe('The target role to suggest skills for.'),
  existingSkills: z.array(z.string()).describe('The list of existing skills to consider for suggestions.'),
  prompt: z.string().optional().describe('Optional custom prompt for skill suggestions.'),
});

export type SuggestSkillsInput = z.infer<typeof SuggestSkillsInputSchema>;

const SuggestSkillsOutputSchema = z.object({
  suggestedSkills: z.array(z.string()).describe('List of suggested skills based on the input.'),
});

export type SuggestSkillsOutput = z.infer<typeof SuggestSkillsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestSkillsPrompt',
  input: { schema: SuggestSkillsInputSchema },
  output: { schema: SuggestSkillsOutputSchema },
  prompt: `You are an expert career advisor and skills analyst. Your task is to suggest relevant skills based on the provided information.

Input Information:
- Target Role: {{{role}}}
- Existing Skills: {{{existingSkills}}}
- Custom Prompt: {{{prompt}}}

Guidelines for Skill Suggestions:
1. If a role is provided:
   - Suggest skills that are essential for that specific role
   - Include both technical and soft skills relevant to the role
   - Consider industry standards and current trends
   - Prioritize skills that complement the existing skills

2. If no role is provided:
   - Analyze the existing skills to understand the career direction
   - Suggest complementary skills that would enhance the current skill set
   - Consider skills that would make the candidate more versatile
   - Include both technical and soft skills that align with the existing profile

3. If a custom prompt is provided:
   - Focus on skills that specifically address the prompt
   - Ensure suggestions align with the career context
   - Consider both immediate and long-term career development

4. General Rules:
   - Avoid suggesting skills that are already in the existing skills list
   - Keep suggestions concise and clear
   - Focus on practical, demonstrable skills
   - Include a mix of hard and soft skills
   - Consider current industry trends and demands

Return a list of suggested skills that would be valuable additions to the candidate's profile.`,
});

const suggestSkillsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsFlow',
    inputSchema: SuggestSkillsInputSchema,
    outputSchema: SuggestSkillsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);

export const suggestSkills = suggestSkillsFlow; 