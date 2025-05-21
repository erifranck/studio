
// src/app/page.tsx
"use client";

import React, { useState, useEffect, useCallback, ComponentType } from 'react';
import { type CVData, initialCvData } from '@/types/cv';
import CvEditor from '@/components/cv-editor/cv-editor';
import CvPreview from '@/components/cv-preview/cv-preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import CvForgeLogo from '@/components/cv-forge-logo';
import { useToast } from '@/hooks/use-toast';
import AiEnhancementDialog from '@/components/ai-enhancement-dialog';
import { CvDocument } from '@/lib/pdf-generator';
// Import the props type for PDFDownloadLink
import type { PDFDownloadLinkProps } from '@react-pdf/renderer';

const CV_STORAGE_KEY = 'cvForgeData';

// Placeholder component for when PDFDownloadLink is loading
const PDFButtonLoading = () => (
  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={true}>
    <Download className="mr-2 h-4 w-4" /> Loading PDF...
  </Button>
);

export default function CVForgePage() {
  const [cvData, setCvData] = useState<CVData>(initialCvData);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [textToEnhance, setTextToEnhance] = useState("");
  const [applyEnhancementCallback, setApplyEnhancementCallback] = useState<((newText: string) => void) | null>(null);
  const { toast } = useToast();

  // State to hold the dynamically imported PDFDownloadLink component
  const [DynamicPDFDownloadLink, setDynamicPDFDownloadLink] = useState<ComponentType<PDFDownloadLinkProps> | null>(null);

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

    // Dynamically import PDFDownloadLink on the client side after mount
    import('@react-pdf/renderer')
      .then(mod => {
        if (typeof mod.PDFDownloadLink === 'function' || (typeof mod.PDFDownloadLink === 'object' && mod.PDFDownloadLink !== null)) {
          setDynamicPDFDownloadLink(() => mod.PDFDownloadLink); // Use functional update to ensure correct state update
        } else {
          console.error("PDFDownloadLink resolved to an invalid type:", mod.PDFDownloadLink);
          toast({
            title: "Error Loading PDF Component",
            description: "The PDF download component did not load correctly. Please try refreshing.",
            variant: "destructive",
          });
        }
      })
      .catch(err => {
        console.error("Failed to load PDFDownloadLink:", err);
        toast({
          title: "Error Loading PDF Tool",
          description: "There was an issue loading the PDF generation tool. Please try refreshing the page.",
          variant: "destructive",
        });
      });
  }, []); // Ensuring this effect runs only once on mount

  // Save CV data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData]);

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
          {DynamicPDFDownloadLink ? (
            <DynamicPDFDownloadLink
              document={<CvDocument cvData={cvData} />}
              fileName={`${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`}>
              {({ blob, url, loading: pdfLoading, error: pdfError }) => {
                if (pdfError) {
                  console.error("react-pdf render error:", pdfError);
                  // Display an error state for the button, or toast once
                  return (
                     <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" disabled>
                       PDF Error
                     </Button>
                  );
                }
                return (
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pdfLoading}>
                    {pdfLoading ? 'Preparing PDF...' : <><Download className="mr-2 h-4 w-4" /> Download PDF</>}
                  </Button>
                );
              }}
            </DynamicPDFDownloadLink>
          ) : (
            <PDFButtonLoading />
          )}
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
