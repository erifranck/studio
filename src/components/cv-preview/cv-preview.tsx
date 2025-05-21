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
        {/* Apply base prose styling, but keep it minimal to allow more specific overrides */}
        <CardContent className="prose prose-sm max-w-none font-serif">
            {/* Global styles for PDF rendering and consistent preview */}
            <style jsx global>{`
              #cv-preview-content {
                /* Ensure consistent font rendering in PDF */
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
              }
              #cv-preview-content h1, 
              #cv-preview-content h2, 
              #cv-preview-content h3, 
              #cv-preview-content h4,
              #cv-preview-content .font-sans { /* Ensure elements intended to be sans-serif are */
                font-family: var(--font-montserrat), sans-serif !important;
              }
              #cv-preview-content p, 
              #cv-preview-content li, 
              #cv-preview-content span,
              #cv-preview-content div, /* Catch-all for other text elements */
              #cv-preview-content .font-serif { /* Ensure elements intended to be serif are */
                font-family: var(--font-merriweather), serif !important;
              }
              #cv-preview-content ul {
                padding-left: 1rem; /* Reduced padding */
                list-style-type: disc; /* Ensure bullets */
              }
              #cv-preview-content li {
                margin-bottom: 0.125rem; /* Smaller margin */
              }
              /* Remove default prose margins for headings as we'll control them */
              #cv-preview-content h1, 
              #cv-preview-content h2, 
              #cv-preview-content h3, 
              #cv-preview-content h4 {
                margin-bottom: 0.5rem; /* Consistent bottom margin for headers */
                margin-top: 0.75rem; /* Consistent top margin */
              }
              #cv-preview-content p {
                font-size: 0.875rem; /* text-sm */
                line-height: 1.4; /* Slightly tighter line height */
                margin-bottom: 0.5rem;
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
