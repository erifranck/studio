// src/app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { type CVData, initialCvData } from '@/types/cv';
import CvEditor from '@/components/cv-editor/cv-editor';
import CvPreview from '@/components/cv-preview/cv-preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import CvForgeLogo from '@/components/cv-forge-logo';
import { downloadPdf } from '@/lib/pdf-generator';
import AiEnhancementDialog from '@/components/ai-enhancement-dialog';
import { useToast } from '@/hooks/use-toast';

const CV_PREVIEW_ELEMENT_ID = "cv-preview-content";
const CV_STORAGE_KEY = 'cvForgeData';

export default function CVForgePage() {
  const [cvData, setCvData] = useState<CVData>(initialCvData);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [textToEnhance, setTextToEnhance] = useState("");
  const [applyEnhancementCallback, setApplyEnhancementCallback] = useState<((newText: string) => void) | null>(null);
  const { toast } = useToast();

  // Load CV data from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(CV_STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          // You might want to add validation here to ensure parsedData conforms to CVData structure
          setCvData(parsedData);
        } catch (error) {
          console.error("Failed to parse CV data from localStorage:", error);
          // If parsing fails, remove the corrupted data
          localStorage.removeItem(CV_STORAGE_KEY);
        }
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save CV data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Debounce or throttle this if cvData changes very frequently,
      // but for typical form input, direct saving is usually fine.
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData]); // This effect runs whenever cvData changes

  const handleDownloadPdf = async () => {
    toast({ title: "Generating PDF...", description: "Please wait while your CV is being prepared." });
    try {
      await downloadPdf(CV_PREVIEW_ELEMENT_ID, `${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`);
      toast({ title: "PDF Downloaded", description: "Your CV has been successfully downloaded." });
    } catch (error) {
      toast({ title: "PDF Generation Failed", description: "Could not generate PDF. Please try again.", variant: "destructive" });
      console.error("PDF generation error:", error);
    }
  };

  const openAiEnhanceDialog = useCallback((currentText: string, onApply: (newText: string) => void) => {
    setTextToEnhance(currentText);
    setApplyEnhancementCallback(() => onApply);
    setIsAiDialogOpen(true);
  }, []);

  const handleApplyAiEnhancement = (enhancedText: string) => {
    if (applyEnhancementCallback) {
      applyEnhancementCallback(enhancedText);
    }
    setIsAiDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <CvForgeLogo />
          <Button onClick={handleDownloadPdf} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-4">
        <div className="md:pr-4">
          <CvEditor 
            cvData={cvData} 
            setCvData={setCvData} 
            openAiEnhanceDialog={openAiEnhanceDialog} 
          />
        </div>
        <div className="relative">
          <div className="md:sticky md:top-[calc(4rem+2rem)]">
             <CvPreview cvData={cvData} />
          </div>
        </div>
      </main>
      
      {isAiDialogOpen && (
        <AiEnhancementDialog
          isOpen={isAiDialogOpen}
          onOpenChange={setIsAiDialogOpen}
          originalText={textToEnhance}
          onApplyEnhancement={handleApplyAiEnhancement}
        />
      )}
    </div>
  );
}
