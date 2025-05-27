"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { enhanceFullCvWithAI } from '@/app/actions';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type CVData } from '@/types/cv';
import { PreviewTemplate } from '@/components/cv-template/default/preview/template';

interface AiFullCvEnhancementDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  originalCvData: CVData;
  onApplyEnhancement: (enhancedCvData: CVData) => void;
}

const AiFullCvEnhancementDialog: React.FC<AiFullCvEnhancementDialogProps> = ({
  isOpen,
  onOpenChange,
  originalCvData,
  onApplyEnhancement,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [enhancedCvData, setEnhancedCvData] = useState<CVData | null>(null);
  const { toast } = useToast();

  const defaultPrompt = "Improve the overall quality, impact, and professionalism of my CV content while maintaining factual accuracy.";

  const fetchEnhancement = useCallback(async (prompt?: string) => {
    if (!originalCvData || !isOpen) return;
    setIsLoading(true);
    setEnhancedCvData(null);

    const result = await enhanceFullCvWithAI(originalCvData, prompt);
    
    if (result.error) {
        toast({
            title: "AI Enhancement Failed",
            description: result.error,
            variant: "destructive",
        });
        setEnhancedCvData(originalCvData); // Show original data if error
    } else {
        setEnhancedCvData(result.enhancedCvData);
        
        // Log if AI tried to modify restricted fields (for debugging)
        if (result.modifiedFields && result.modifiedFields.length > 0) {
            console.log("AI attempted to modify restricted fields, but they were preserved:", result.modifiedFields);
        }
        
        toast({
            title: "AI Enhancement Ready",
            description: "Review the enhanced CV below. All factual information has been preserved.",
        });
    }
    setIsLoading(false);
  }, [originalCvData, isOpen, toast]);

  useEffect(() => {
    if (isOpen && originalCvData) {
      // Auto-enhance with default prompt when dialog opens
      fetchEnhancement(userPrompt || defaultPrompt);
    } else if (!isOpen) {
      // Reset state when dialog closes
      setEnhancedCvData(null);
      setUserPrompt('');
    }
  }, [isOpen, originalCvData, fetchEnhancement]);

  const handleCustomEnhancement = () => {
    const prompt = userPrompt.trim() || defaultPrompt;
    fetchEnhancement(prompt);
  };

  const handleApply = () => {
    if (enhancedCvData && enhancedCvData !== originalCvData) {
      onApplyEnhancement(enhancedCvData);
    }
    onOpenChange(false);
  };

  const handleReset = () => {
    setUserPrompt('');
    setEnhancedCvData(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-7xl bg-card shadow-xl rounded-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <Wand2 className="text-primary h-6 w-6" /> AI CV Enhancement
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Transform your entire CV with AI-powered enhancements. Provide specific instructions or use the default improvement.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 my-6 max-h-[70vh] overflow-y-auto">
          {/* Prompt Section */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
            <div>
              <Label htmlFor="user-prompt" className="text-base font-medium">
                Enhancement Instructions (Optional)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Describe how you want to transform your CV (e.g., "change focus from Backend Developer to Frontend Developer", "make it more senior-level", "optimize for marketing roles")
              </p>
              <Textarea
                id="user-prompt"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder={defaultPrompt}
                rows={3}
                className="bg-background border-input focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCustomEnhancement}
                disabled={isLoading}
                variant="outline"
                className="text-primary border-primary hover:bg-primary/10"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Enhancing...' : 'Enhance CV'}
              </Button>
              <Button
                onClick={handleReset}
                disabled={isLoading}
                variant="ghost"
                size="sm"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-lg text-foreground/90">Current CV:</h3>
              <div className="border rounded-lg bg-background p-4 max-h-[500px] overflow-y-auto">
                <div className="transform scale-75 origin-top-left w-[133%] h-[133%]">
                  <PreviewTemplate data={originalCvData} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg text-foreground/90">Enhanced CV:</h3>
              {isLoading ? (
                <div className="flex items-center justify-center h-[500px] border rounded-lg bg-muted/50">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">Enhancing your CV...</p>
                    <p className="text-sm text-muted-foreground">This may take a few moments</p>
                  </div>
                </div>
              ) : enhancedCvData ? (
                <div className="border rounded-lg bg-background p-4 max-h-[500px] overflow-y-auto border-primary/50">
                  <div className="transform scale-75 origin-top-left w-[133%] h-[133%]">
                    <PreviewTemplate data={enhancedCvData} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[500px] border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">Enhanced CV will appear here</p>
                    <p className="text-sm text-muted-foreground">Click "Enhance CV" to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleApply}
            disabled={isLoading || !enhancedCvData || enhancedCvData === originalCvData}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Apply Enhancement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiFullCvEnhancementDialog; 