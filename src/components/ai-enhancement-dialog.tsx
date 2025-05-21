// src/components/ai-enhancement-dialog.tsx
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
import { enhanceTextWithAI } from '@/app/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AiEnhancementDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  originalText: string;
  onApplyEnhancement: (enhancedText: string) => void;
}

const AiEnhancementDialog: React.FC<AiEnhancementDialogProps> = ({
  isOpen,
  onOpenChange,
  originalText,
  onApplyEnhancement,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedText, setSuggestedText] = useState('');
  const { toast } = useToast();

  const fetchEnhancement = useCallback(async () => {
    if (!originalText || !isOpen) return;
    setIsLoading(true);
    setSuggestedText(''); // Clear previous suggestion

    const result = await enhanceTextWithAI(originalText);
    
    if (result.error) {
        toast({
            title: "AI Enhancement Failed",
            description: result.error,
            variant: "destructive",
        });
        setSuggestedText(originalText); // Show original text if error
    } else {
        setSuggestedText(result.improvedText);
        toast({
            title: "AI Suggestion Ready",
            description: "Review the suggestion below.",
        });
    }
    setIsLoading(false);
  }, [originalText, isOpen, toast]);

  useEffect(() => {
    if (isOpen && originalText) {
      fetchEnhancement();
    }
  }, [isOpen, originalText, fetchEnhancement]);
  
  const handleApply = () => {
    if (suggestedText && suggestedText !== originalText) {
      onApplyEnhancement(suggestedText);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" /> AI Content Enhancement
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Review the AI-powered suggestion to improve your content.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 max-h-[60vh] overflow-y-auto p-1">
          <div>
            <h3 className="font-medium mb-2 text-lg text-foreground/90">Your Original Text:</h3>
            <Textarea value={originalText} readOnly rows={10} className="bg-muted/50 border-muted text-sm" />
          </div>
          <div>
            <h3 className="font-medium mb-2 text-lg text-foreground/90">AI Suggestion:</h3>
            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-[200px] bg-muted/50 rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating suggestion...</p>
              </div>
            ) : (
              <Textarea
                value={suggestedText}
                onChange={(e) => setSuggestedText(e.target.value)}
                rows={10}
                className="border-primary focus:ring-primary text-sm"
              />
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleApply}
            disabled={isLoading || !suggestedText}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" /> }
            Use Suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiEnhancementDialog;

