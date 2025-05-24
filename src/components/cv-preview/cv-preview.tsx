// src/components/cv-preview/cv-preview.tsx
"use client"; 
import React from 'react';
import { type CVData } from '@/types/cv';
import { PreviewTemplate } from '../cv-template/default/preview/template';

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  return (
    <div className="cv-preview-container w-full h-full overflow-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <PreviewTemplate data={cvData} />
    </div>
  );
};
