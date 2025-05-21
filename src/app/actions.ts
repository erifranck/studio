// src/app/actions.ts
'use server';
import { improveCvContent as improveCvContentFlow, type ImproveCvContentInput } from '@/ai/flows/improve-cv-content';
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
