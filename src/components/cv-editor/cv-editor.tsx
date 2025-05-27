// src/components/cv-editor/cv-editor.tsx
"use client";
import type React from 'react';
import { type CVData, type SetCvDataFn, type OpenAiEnhanceDialogFn } from '@/types/cv';
import PersonalInfoEditor from './personal-info-editor';
import SummaryEditor from './summary-editor';
import ExperienceEditor from './experience-editor';
import EducationEditor from './education-editor';
import SkillsEditor from './skills-editor';
import QualificationsEditor from './qualifications-editor';
import { FormWizard } from '@/components/ui/form-wizard';
import { FormWizardStep } from '@/components/ui/form-wizard-step';

interface CvEditorProps {
  cvData: CVData;
  setCvData: SetCvDataFn;
  openAiEnhanceDialog: OpenAiEnhanceDialogFn;
}

const CvEditor: React.FC<CvEditorProps> = ({ cvData, setCvData, openAiEnhanceDialog }) => {
  return (
    <FormWizard className="h-[calc(100vh-120px)] w-full">
      <FormWizardStep title="Personal Information">
        <PersonalInfoEditor personalInfo={cvData.personalInfo} setCvData={setCvData} />
      </FormWizardStep>
      <FormWizardStep title="Professional Summary">
        <SummaryEditor summary={cvData.summary} setCvData={setCvData} openAiEnhanceDialog={openAiEnhanceDialog} />
      </FormWizardStep>
      <FormWizardStep title="Work Experience">
        <ExperienceEditor experience={cvData.experience} setCvData={setCvData} openAiEnhanceDialog={openAiEnhanceDialog} />
      </FormWizardStep>
      <FormWizardStep title="Education">
        <EducationEditor education={cvData.education} setCvData={setCvData} />
      </FormWizardStep>
      <FormWizardStep title="Skills">
        <SkillsEditor skills={cvData.skills} setCvData={setCvData} />
      </FormWizardStep>
      <FormWizardStep title="Qualifications">
        <QualificationsEditor qualifications={cvData.qualifications} setCvData={setCvData} />
      </FormWizardStep>
    </FormWizard>
  );
};

export default CvEditor;
