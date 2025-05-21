// src/components/cv-editor/summary-editor.tsx
"use client";
import type React from 'react';
import { type SetCvDataFn, type OpenAiEnhanceDialogFn } from '@/types/cv';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles } from 'lucide-react';

interface SummaryEditorProps {
  summary: string;
  setCvData: SetCvDataFn;
  openAiEnhanceDialog: OpenAiEnhanceDialogFn;
}

const SummaryEditor: React.FC<SummaryEditorProps> = ({ summary, setCvData, openAiEnhanceDialog }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleEnhance = () => {
    openAiEnhanceDialog(summary, (enhancedText) => {
      setCvData(prev => ({ ...prev, summary: enhancedText }));
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <FileText className="text-primary" /> Professional Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div>
          <Label htmlFor="summary" className="font-medium text-foreground/80">
            Craft your compelling summary:
          </Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={handleChange}
            placeholder="A brief summary about your skills and career objectives..."
            rows={5}
            className="mt-2 bg-background border-input focus:ring-primary"
          />
        </div>
        <Button onClick={handleEnhance} variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
          <Sparkles className="mr-2 h-4 w-4" /> Enhance with AI
        </Button>
      </CardContent>
    </Card>
  );
};

export default SummaryEditor;
