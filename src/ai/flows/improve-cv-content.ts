'use server';

/**
 * @fileOverview An AI agent that improves the phrasing and word choice of a given text for a CV.
 *
 * - improveCvContent - A function that handles the content improvement process.
 * - ImproveCvContentInput - The input type for the improveCvContent function.
 * - ImproveCvContentOutput - The return type for the improveCvContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveCvContentInputSchema = z.object({
  text: z
    .string()
    .describe('The text from the CV that needs to be improved.'),
  prompt: z
    .string()
    .optional()
    .describe('Optional instructions for how to improve the text (e.g., "make it more professional", "simplify the language").'),
});
export type ImproveCvContentInput = z.infer<typeof ImproveCvContentInputSchema>;

const ImproveCvContentOutputSchema = z.object({
  improvedText: z.string().describe('The improved version of the input text.'),
});
export type ImproveCvContentOutput = z.infer<typeof ImproveCvContentOutputSchema>;

export async function improveCvContent(input: ImproveCvContentInput): Promise<ImproveCvContentOutput> {
  return improveCvContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveCvContentPrompt',
  input: {schema: ImproveCvContentInputSchema},
  output: {schema: ImproveCvContentOutputSchema},
  prompt: `You are an expert CV writer. You will receive a section of text from a CV, and you will improve the phrasing and word choice to make it more impactful.

{{#if prompt}}
Specific Instructions: {{{prompt}}}
{{/if}}

Text: {{{text}}}

Improved Text:`,
});

const improveCvContentFlow = ai.defineFlow(
  {
    name: 'improveCvContentFlow',
    inputSchema: ImproveCvContentInputSchema,
    outputSchema: ImproveCvContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
