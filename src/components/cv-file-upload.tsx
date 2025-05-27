'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { extractCvFromFile } from '@/ai/flows/extract-cv-from-file';
import { type CVData } from '@/types/cv';
import { extractTextFromPDF } from '@/lib/simple-pdf-parser';

interface CVFileUploadProps {
  onCvExtracted: (cvData: CVData) => void;
}

export function CVFileUpload({ onCvExtracted }: CVFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const fileType = file.name.toLowerCase().split('.').pop();
    if (!['pdf', 'doc', 'docx', 'txt'].includes(fileType || '')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF, Word document, or text file.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      let text: string;
      
      if (fileType === 'pdf') {
        // Extract text from PDF
        text = await extractTextFromPDF(file);
      } else {
        // For Word documents and text files, read as text
        text = await file.text();
      }
      
      // Check if we extracted any meaningful text
      if (!text || text.length < 50) {
        throw new Error('Could not extract sufficient text from the file');
      }
      
      // Extract CV data using AI
      const result = await extractCvFromFile({
        fileContent: text,
        fileName: file.name,
      });

      // Call the callback with extracted data
      onCvExtracted(result.cvData);

      toast({
        title: 'CV extracted successfully',
        description: 'Your CV has been processed and loaded into the editor.',
      });
    } catch (error) {
      console.error('Error processing CV:', error);
      toast({
        title: 'Error processing CV',
        description: error instanceof Error ? error.message : 'There was an error processing your CV. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
        id="cv-upload"
        disabled={isUploading}
      />
      <label htmlFor="cv-upload">
        <Button
          variant="outline"
          disabled={isUploading}
          asChild
        >
          <span>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing CV...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload CV
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  );
} 