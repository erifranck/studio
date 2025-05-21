
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
        <CardContent className="max-w-none">
            <style jsx global>{`
              #cv-preview-content {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
                font-family: var(--font-merriweather), serif; /* Default to serif for body */
                font-size: 10pt; /* Base font size for body copy */
                line-height: 1.5; /* Slightly more generous line height */
                color: #333; /* Dark grey for text */
              }
              #cv-preview-content h1, 
              #cv-preview-content h2, 
              #cv-preview-content h3, 
              #cv-preview-content h4,
              #cv-preview-content .font-sans {
                font-family: var(--font-montserrat), sans-serif !important; /* Sans-serif for headings */
                color: #000; /* Black for headings */
              }
              #cv-preview-content p, 
              #cv-preview-content li, 
              #cv-preview-content span,
              #cv-preview-content div:not(h1):not(h2):not(h3):not(h4) { /* Target general text elements */
                font-family: var(--font-merriweather), serif !important;
                font-size: 10pt; 
                line-height: 1.5;
                color: #333;
              }
              #cv-preview-content ul {
                padding-left: 1.2rem; /* Indent for bullets */
                list-style-type: disc;
                margin-top: 0.2rem;
                margin-bottom: 0.5rem; 
              }
              #cv-preview-content li {
                margin-bottom: 0.2rem; 
                font-size: 10pt; 
                line-height: 1.5;
              }
              /* Name */
              #cv-preview-content h1.cv-name { 
                font-size: 22pt; /* Large name */
                font-weight: 700; /* Bold */
                margin-bottom: 0.05rem;
                margin-top: 0;
                line-height: 1.1;
                text-align: left;
              }
              /* Title below name */
              #cv-preview-content h2.cv-title { 
                font-size: 12pt;
                font-weight: 500; /* Medium weight */
                margin-bottom: 0.2rem; 
                margin-top: 0;
                line-height: 1.2;
                text-align: left;
                color: #333; /* Dark Grey */
              }
              /* Section headers (Summary, Experience, etc.) */
              #cv-preview-content h3.cv-section-header { 
                font-size: 14pt; 
                font-weight: 700; /* Bold */
                margin-bottom: 0.6rem; 
                margin-top: 1rem; 
                padding-bottom: 0.2rem;
                border-bottom: 0.75px solid #000; /* Thinner black border */
                line-height: 1.2;
              }
               /* Job Title / Degree */
              #cv-preview-content h4.cv-item-title { 
                font-size: 11pt;
                font-weight: 700; /* Bold */
                margin-bottom: 0.05rem;
                margin-top: 0.5rem; 
                line-height: 1.3;
              }
              #cv-preview-content p {
                font-size: 10pt; 
                line-height: 1.5; 
                margin-bottom: 0.5rem; 
              }
              #cv-preview-content .cv-contact-info,
              #cv-preview-content .cv-contact-info a,
              #cv-preview-content .cv-item-meta { /* For company/dates etc. */
                font-size: 9.5pt !important;
                line-height: 1.4 !important;
                color: #555; /* Slightly lighter grey */
              }
               #cv-preview-content .cv-contact-info svg {
                width: 10px !important; 
                height: 10px !important;
                margin-right: 4px;
                color: #555;
              }
              #cv-preview-content .cv-page-break-avoid {
                page-break-inside: avoid;
              }
              #cv-preview-content .cv-section-separator {
                border-bottom: 0.75px solid #000;
                margin-top: 0.5rem;
                margin-bottom: 1rem;
              }
            `}</style>
          <PersonalInfoPreview data={cvData.personalInfo} />
          <div className="cv-section-separator"></div>
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
