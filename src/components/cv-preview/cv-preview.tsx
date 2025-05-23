// src/components/cv-preview/cv-preview.tsx
"use client"; 
import React from 'react';
import { type CVData } from '@/types/cv';
import { TemplateHTML } from '../cv-template/default/template-html';

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  return (
    <div className="w-full h-full overflow-auto bg-white">
      <TemplateHTML cvData={cvData} />
    </div>
  );
};
