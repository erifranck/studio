// src/app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { type CVData, initialCvData } from '@/types/cv';
import CvEditor from '@/components/cv-editor/cv-editor';
import { CVPreview } from '@/components/cv-preview/cv-preview';
import { Button } from '@/components/ui/button';
import { Download, Eye, Wand2, ClipboardPaste, Save, Menu } from 'lucide-react';
import CvForgeLogo from '@/components/cv-forge-logo';
import { useToast } from '@/hooks/use-toast';
import AiEnhancementDialog from '@/components/ai-enhancement-dialog';
import AiFullCvEnhancementDialog from '@/components/ai-full-cv-enhancement-dialog';
import { CvDocument } from '@/lib/pdf-generator';
import { pdf } from '@react-pdf/renderer';
import { PDFPreviewModal } from '@/components/pdf-preview-modal';
import { CVFileUpload } from '@/components/cv-file-upload';
import { CVTextImportDialog } from '@/components/cv-text-import-dialog';
import { CVHistoryMenu } from '@/components/cv-history-menu';

const CV_STORAGE_KEY = 'cvForgeData';
const ENABLE_CV_UPLOAD = false; // Feature flag to control CV upload functionality

export default function CVForgePage() {
  const [cvData, setCvData] = useState<CVData>(initialCvData);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [isFullCvAiDialogOpen, setIsFullCvAiDialogOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [textToEnhance, setTextToEnhance] = useState("");
  const [applyEnhancementCallback, setApplyEnhancementCallback] = useState<((newText: string) => void) | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();
  const [isTextImportDialogOpen, setIsTextImportDialogOpen] = useState(false);

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

  const handleApplyFullCvEnhancement = (enhancedCvData: CVData) => {
    setCvData(enhancedCvData);
    setIsFullCvAiDialogOpen(false);
    toast({
      title: "CV Enhanced Successfully",
      description: "Your CV has been enhanced with AI improvements.",
    });
  };

  const handleCvExtracted = (extractedCvData: CVData) => {
    setCvData(extractedCvData);
    toast({
      title: 'CV Loaded',
      description: 'Your CV has been loaded into the editor.',
    });
  };

  const handleSaveCV = () => {
    try {
      const savedCVsData = localStorage.getItem('cvForgeSavedCVs');
      const savedCVs = savedCVsData ? JSON.parse(savedCVsData) : [];
      
      const newCV = {
        id: crypto.randomUUID(),
        name: cvData.personalInfo.name || 'Untitled CV',
        date: new Date().toLocaleString(),
        data: cvData
      };

      const updatedCVs = [...savedCVs, newCV];
      localStorage.setItem('cvForgeSavedCVs', JSON.stringify(updatedCVs));
      
      toast({
        title: "CV Saved",
        description: "Your CV has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving CV:", error);
      toast({
        title: "Error Saving CV",
        description: "There was an issue saving your CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLoadSavedCV = (cvData: CVData) => {
    setCvData(cvData);
    toast({
      title: "CV Loaded",
      description: "Your saved CV has been loaded successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <CvForgeLogo />
          <div className="flex gap-2">
            {ENABLE_CV_UPLOAD && <CVFileUpload onCvExtracted={handleCvExtracted} />}
            <Button
              variant="outline"
              onClick={() => setIsTextImportDialogOpen(true)}
            >
              <ClipboardPaste className="mr-2 h-4 w-4" /> Pegar CV
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsFullCvAiDialogOpen(true)}
              className="text-primary border-primary hover:bg-primary/10"
            >
              <Wand2 className="mr-2 h-4 w-4" /> Enhance CV with AI
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsPdfPreviewOpen(true)}
            >
              <Eye className="mr-2 h-4 w-4" /> Preview PDF
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveCV}
            >
              <Save className="mr-2 h-4 w-4" /> Save CV
            </Button>
            <CVHistoryMenu onLoadCV={handleLoadSavedCV} />
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground" 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? 'Preparing PDF...' : <><Download className="mr-2 h-4 w-4" /> Download PDF</>}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto flex flex-col lg:flex-row gap-8 lg:py-8 py-4 px-4">
        <div className="w-full lg:w-1/2">
          <CvEditor 
            cvData={cvData} 
            setCvData={setCvData} 
            openAiEnhanceDialog={openAiEnhanceDialog} 
          />
        </div>
        <div className="w-full lg:w-1/2">
          <CVPreview cvData={cvData} />
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

      <AiFullCvEnhancementDialog
        isOpen={isFullCvAiDialogOpen}
        onOpenChange={setIsFullCvAiDialogOpen}
        originalCvData={cvData}
        onApplyEnhancement={handleApplyFullCvEnhancement}
      />

      <CVTextImportDialog
        isOpen={isTextImportDialogOpen}
        onOpenChange={setIsTextImportDialogOpen}
        onCvExtracted={handleCvExtracted}
      />

      <PDFPreviewModal
        isOpen={isPdfPreviewOpen}
        onOpenChange={setIsPdfPreviewOpen}
        cvData={cvData}
      />
    </div>
  );
}
