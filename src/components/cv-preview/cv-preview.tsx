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
      <Card id="cv-preview-content" className="p-8 shadow-2xl bg-card text-card-foreground rounded-lg min-h-full">
        <CardContent className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none font-serif">
            {/* Ensure prose styles don't override everything, or define custom styles */}
            <style jsx global>{`
              #cv-preview-content h1, #cv-preview-content h2, #cv-preview-content h3, #cv-preview-content h4 {
                font-family: var(--font-montserrat), sans-serif;
              }
              #cv-preview-content p, #cv-preview-content li, #cv-preview-content span {
                font-family: var(--font-merriweather), serif;
              }
              #cv-preview-content ul {
                padding-left: 1.25rem; /* 20px */
              }
              #cv-preview-content li {
                margin-bottom: 0.25rem; /* 4px */
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
