// src/components/cv-preview/cv-preview.tsx
"use client"; // Needs to be client for html2canvas to pick it up if it's dynamic
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
        <CardContent className="prose-none max-w-none font-serif"> {/* Changed from prose-sm to prose-none to have more control */}
            {/* Global styles for PDF rendering and consistent preview */}
            <style jsx global>{`
              #cv-preview-content {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
                font-size: 10pt; /* Base font size for PDF like appearance */
                line-height: 1.3; 
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
                font-size: 10pt; /* Ensure body text is small */
                line-height: 1.3;
              }
              #cv-preview-content ul {
                padding-left: 1rem; 
                list-style-type: disc; 
              }
              #cv-preview-content li {
                margin-bottom: 0.1rem; /* Tighter spacing for list items */
                font-size: 9.5pt; /* Slightly smaller for bullets */
                line-height: 1.25;
              }
              #cv-preview-content h1 { /* Name */
                font-size: 20pt;
                margin-bottom: 0.15rem;
                margin-top: 0;
              }
              #cv-preview-content h2 { /* Title below name */
                font-size: 12pt;
                margin-bottom: 0.25rem;
                margin-top: 0;
              }
              #cv-preview-content h3 { /* Section headers */
                font-size: 14pt; 
                margin-bottom: 0.3rem; 
                margin-top: 0.6rem;
                padding-bottom: 0.1rem;
                border-bottom-width: 1px; 
              }
               #cv-preview-content h4 { /* Job Title / Degree */
                font-size: 11pt;
                margin-bottom: 0.1rem;
                margin-top: 0.2rem;
              }
              #cv-preview-content p {
                font-size: 10pt; 
                line-height: 1.3; 
                margin-bottom: 0.25rem;
              }
              /* Specific adjustments for contact info if needed */
              #cv-preview-content .contact-info-item {
                font-size: 9pt !important;
                gap: 0.2rem !important; /* Reduce gap for icons */
              }
               #cv-preview-content .contact-info-item svg {
                width: 10px !important; /* Smaller icons */
                height: 10px !important;
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

