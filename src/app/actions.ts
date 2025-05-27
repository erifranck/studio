// src/app/actions.ts
'use server';
import { improveCvContent as improveCvContentFlow, type ImproveCvContentInput } from '@/ai/flows/improve-cv-content';
import { enhanceFullCv as enhanceFullCvFlow, type EnhanceFullCvInput } from '@/ai/flows/enhance-full-cv';
import { type CVData } from '@/types/cv';
import { preserveFactualData, detectModifiedFields } from '@/lib/cv-validation';
import { toast } from '@/hooks/use-toast'; // Assuming useToast can be used or adapted for server feedback if needed, or remove for client-side toast

export async function enhanceTextWithAI(text: string): Promise<{ improvedText: string; error?: string }> {
  if (!text.trim()) {
    return { improvedText: text, error: "Input text is empty." };
  }
  try {
    const input: ImproveCvContentInput = { text };
    console.log("Sending to AI:", input);
    const result = await improveCvContentFlow(input);
    console.log("Received from AI:", result);
    if (result && result.improvedText) {
      return { improvedText: result.improvedText };
    }
    return { improvedText: text, error: "AI did not return improved text."};
  } catch (error)
 {
    console.error("Error enhancing text with AI:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error during AI enhancement.";
    return { improvedText: text, error: `AI enhancement failed: ${errorMessage}` };
  }
}

export async function enhanceFullCvWithAI(cvData: CVData, userPrompt?: string): Promise<{ enhancedCvData: CVData; error?: string; modifiedFields?: string[] }> {
  try {
    const prompt = userPrompt?.trim() || "Improve the overall quality, impact, and professionalism of this CV content while maintaining factual accuracy.";
    const input: EnhanceFullCvInput = { cvData, userPrompt: prompt };
    console.log("Sending full CV to AI:", input);
    const result = await enhanceFullCvFlow(input);
    console.log("Received enhanced CV from AI:", result);
    
    if (result && result.enhancedCvData) {
      // Detect what fields the AI tried to modify
      const modifiedFields = detectModifiedFields(cvData, result.enhancedCvData, prompt);
      
      // Log if AI tried to modify restricted fields
      if (modifiedFields.length > 0) {
        console.warn("AI attempted to modify restricted fields:", modifiedFields);
      }
      
      // Apply validation to preserve factual data
      const validatedCvData = preserveFactualData(cvData, result.enhancedCvData, prompt);
      
      return { 
        enhancedCvData: validatedCvData,
        modifiedFields: modifiedFields.length > 0 ? modifiedFields : undefined
      };
    }
    
    return { enhancedCvData: cvData, error: "AI did not return enhanced CV data." };
  } catch (error) {
    console.error("Error enhancing full CV with AI:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error during full CV enhancement.";
    return { enhancedCvData: cvData, error: `Full CV enhancement failed: ${errorMessage}` };
  }
}
