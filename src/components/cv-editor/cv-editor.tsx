// src/components/cv-editor/cv-editor.tsx
"use client";
import type React from 'react';
import { type CVData, type SetCvDataFn, type OpenAiEnhanceDialogFn } from '@/types/cv';
import PersonalInfoEditor from './personal-info-editor';
import SummaryEditor from './summary-editor';
import ExperienceEditor from './experience-editor';
import EducationEditor from './education-editor';
import SkillsEditor from './skills-editor';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CvEditorProps {
  cvData: CVData;
  setCvData: SetCvDataFn;
  openAiEnhanceDialog: OpenAiEnhanceDialogFn;
}

const CvEditor: React.FC<CvEditorProps> = ({ cvData, setCvData, openAiEnhanceDialog }) => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] pr-6 rounded-lg"> {/* Adjust height as needed */}
      <div className="space-y-8">
        <PersonalInfoEditor personalInfo={cvData.personalInfo} setCvData={setCvData} />
        <SummaryEditor summary={cvData.summary} setCvData={setCvData} openAiEnhanceDialog={openAiEnhanceDialog} />
        <ExperienceEditor experience={cvData.experience} setCvData={setCvData} openAiEnhanceDialog={openAiEnhanceDialog} />
        <EducationEditor education={cvData.education} setCvData={setCvData} />
        <SkillsEditor skills={cvData.skills} setCvData={setCvData} />
      </div>
    </ScrollArea>
  );
};

export default CvEditor;
