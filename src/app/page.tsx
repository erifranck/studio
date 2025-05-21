// src/app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { type CVData, initialCvData } from '@/types/cv';
import CvEditor from '@/components/cv-editor/cv-editor';
import CvPreview from '@/components/cv-preview/cv-preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import CvForgeLogo from '@/components/cv-forge-logo';
import dynamic from 'next/dynamic'; // Import dynamic
import { useToast } from '@/hooks/use-toast';
import AiEnhancementDialog from '@/components/ai-enhancement-dialog';
import { CvDocument } from '@/lib/pdf-generator'; // This import is fine

const CV_STORAGE_KEY = 'cvForgeData';

// Dynamically import PDFDownloadLink
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => ( // Optional: show a loading state for the button itself while the component loads
      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={true}>
        <Download className="mr-2 h-4 w-4" /> Loading PDF...
      </Button>
    )
  }
);

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
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData]); // This effect runs whenever cvData changes

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
          {/* Use the dynamically imported component */}
          <PDFDownloadLink
            document={<CvDocument cvData={cvData} />} // Changed data to cvData
            fileName={`${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`}>
            {({ blob, url, loading: pdfLoading, error }) => ( // Renamed loading to pdfLoading
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pdfLoading}>
                {pdfLoading ? 'Preparing PDF...' : <><Download className="mr-2 h-4 w-4" /> Download PDF</>}
              </Button>
            )}
          </PDFDownloadLink>
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
