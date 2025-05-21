
// src/components/cv-preview/cv-preview.tsx
"use client"; 
import type React from 'react';
import { type CVData } from '@/types/cv';
import PersonalInfoPreview from './personal-info-preview';
import SummaryPreview from './summary-preview';
import ExperiencePreview from './experience-preview';
import EducationPreview from './education-preview';
import SkillsPreview from './skills-preview';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface CvPreviewProps {
  cvData: CVData;
}

const CvPreview: React.FC<CvPreviewProps> = ({ cvData }) => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] rounded-lg"> {/* Adjust height as needed */}
      <Card id="cv-preview-content" className="p-6 sm:p-8 shadow-2xl bg-card text-card-foreground rounded-lg min-h-full">
        <CardContent className="prose-none max-w-none font-serif">
            <style jsx global>{`
              #cv-preview-content {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
                font-size: 9pt; 
                line-height: 1.4; /* Increased base line-height */
              }
              #cv-preview-content h1, 
              #cv-preview-content h2, 
              #cv-preview-content h3, 
              #cv-preview-content h4,
              #cv-preview-content .font-sans {
                font-family: var(--font-montserrat), sans-serif !important;
              }
              #cv-preview-content p, 
              #cv-preview-content li, 
              #cv-preview-content span,
              #cv-preview-content div,
              #cv-preview-content .font-serif {
                font-family: var(--font-merriweather), serif !important;
                font-size: 9pt; 
                line-height: 1.4; /* Increased line-height for body */
              }
              #cv-preview-content ul {
                padding-left: 1rem; 
                list-style-type: disc;
                margin-bottom: 0.2rem; /* Add some space after lists */
              }
              #cv-preview-content li {
                margin-bottom: 0.15rem; /* Increased spacing for list items */
                font-size: 8.5pt; 
                line-height: 1.4; /* Increased line-height for list items */
              }
              #cv-preview-content h1 { /* Name */
                font-size: 18pt;
                margin-bottom: 0.1rem;
                margin-top: 0;
                line-height: 1.2;
              }
              #cv-preview-content h2 { /* Title below name */
                font-size: 11pt;
                margin-bottom: 0.3rem; /* Increased margin */
                margin-top: 0;
                line-height: 1.2;
              }
              #cv-preview-content h3 { /* Section headers */
                font-size: 13pt; 
                font-weight: 600; 
                margin-bottom: 0.35rem; /* Increased margin */
                margin-top: 0.6rem; /* Increased margin */
                padding-bottom: 0.1rem;
                border-bottom-width: 0.5px; 
                line-height: 1.2;
              }
               #cv-preview-content h4 { /* Job Title / Degree */
                font-size: 10pt;
                font-weight: 600; 
                margin-bottom: 0.1rem; /* Increased margin */
                margin-top: 0.2rem; /* Increased margin */
                line-height: 1.3; /* Increased line-height */
              }
              #cv-preview-content p {
                font-size: 9pt; 
                line-height: 1.4; /* Increased line-height */
                margin-bottom: 0.3rem; /* Increased margin */
              }
              #cv-preview-content .contact-info-item {
                font-size: 8.5pt !important;
                gap: 0.2rem !important; 
                line-height: 1.3 !important; /* Ensure consistent line height */
              }
               #cv-preview-content .contact-info-item svg {
                width: 9px !important; 
                height: 9px !important;
              }
              /* Add some bottom margin to general sections to help with page breaks */
              #cv-preview-content section {
                margin-bottom: 0.5rem; /* Was mb-2, which is 0.5rem. Keeping it but can adjust. */
              }
            `}</style>
          <PersonalInfoPreview data={cvData.personalInfo} />
          <SummaryPreview summary={cvData.summary} />
          <ExperiencePreview experience={cvData.experience} />
          <EducationPreview education={cvData.education} />
          <SkillsPreview skills={cvData.skills} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CvPreview;

