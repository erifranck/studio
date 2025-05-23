// src/app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { type CVData, initialCvData } from '@/types/cv';
import CvEditor from '@/components/cv-editor/cv-editor';
import CvPreview from '@/components/cv-preview/cv-preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import CvForgeLogo from '@/components/cv-forge-logo';
import { useToast } from '@/hooks/use-toast';
import AiEnhancementDialog from '@/components/ai-enhancement-dialog';
import { CvDocument } from '@/lib/pdf-generator';
import { pdf } from '@react-pdf/renderer';

const CV_STORAGE_KEY = 'cvForgeData';

export default function CVForgePage() {
  const [cvData, setCvData] = useState<CVData>(initialCvData);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [textToEnhance, setTextToEnhance] = useState("");
  const [applyEnhancementCallback, setApplyEnhancementCallback] = useState<((newText: string) => void) | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load CV data from localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(CV_STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setCvData(parsedData);
        } catch (error) {
          console.error("Failed to parse CV data from localStorage:", error);
          localStorage.removeItem(CV_STORAGE_KEY);
        }
      }
    }
  }, []);

  // Save CV data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData]);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const blob = await pdf(<CvDocument cvData={cvData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error Generating PDF",
        description: "There was an issue generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
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
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground" 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? 'Preparing PDF...' : <><Download className="mr-2 h-4 w-4" /> Download PDF</>}
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
