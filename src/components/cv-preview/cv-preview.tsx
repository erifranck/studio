// src/components/cv-preview/cv-preview.tsx
"use client"; 
import type React from 'react';
import { type CVData, type QualificationEntry } from '@/types/cv';
import PersonalInfoPreview from './personal-info-preview';
import PersonalStatementPreview from './personal-statement-preview'; // Renamed
import ExperiencePreview from './experience-preview';
import EducationPreview from './education-preview';
import SkillsPreview from './skills-preview'; // Will be used for Key Skills
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

// Added new placeholder preview components
const AdditionalSkillsPreview: React.FC<{ skills: string[] }> = ({ skills }) => {
  if (skills.length === 0 && !true) return null; // keep section for placeholder
  return (
    <section className="mb-4">
      <h3 className="cv-section-header font-sans bg-primary text-primary-foreground p-2 my-2 text-sm uppercase">Additional Skills</h3>
      <ul className="font-serif list-disc pl-5 text-xs">
        {skills.map((skill, i) => <li key={i}>{skill}</li>)}
        {skills.length === 0 && <>
            <li>Time management skills</li>
            <li>Empathy</li>
            <li>Communication skills</li>
        </>}
      </ul>
    </section>
  );
};

const QualificationsPreview: React.FC<{ qualifications: QualificationEntry[] }> = ({ qualifications }) => {
  if (qualifications.length === 0) return null;
  return (
    <section className="mb-4">
      <h3 className="cv-section-header font-sans bg-primary text-primary-foreground p-2 my-2 text-sm uppercase">Qualifications</h3>
      {qualifications.map((qual) => (
        <div key={qual.id} className="font-serif text-xs mb-3">
          <p className="text-muted-foreground text-xs italic">{qual.date}</p>
          <p className="font-bold text-primary">{qual.name}</p>
          {qual.issuer && <p className="text-xs">{qual.issuer}</p>}
        </div>
      ))}
    </section>
  );
};


interface CvPreviewProps {
  cvData: CVData;
}

const CvPreview: React.FC<CvPreviewProps> = ({ cvData }) => {
  const halfSkillsIndex = Math.ceil(cvData.skills.length / 2);
  const keySkills = cvData.skills.slice(0, halfSkillsIndex);
  const additionalSkillsData = cvData.skills.slice(halfSkillsIndex);


  return (
    <ScrollArea className="h-[calc(100vh-120px)] rounded-lg">
      <Card id="cv-preview-content" className="p-4 shadow-lg bg-card text-card-foreground rounded-lg min-h-full">
        <CardContent className="max-w-none">
            {/* Simplified global styles for HTML preview, focusing on structure matching */}
            <style jsx global>{`
              #cv-preview-content {
                font-family: var(--font-montserrat), sans-serif;
                font-size: 10pt;
                line-height: 1.5;
                color: #333;
              }
              #cv-preview-content h1.cv-name {
                font-size: 24pt;
                font-weight: 700;
                text-align: center;
                margin-bottom: 0.1rem;
                color: hsl(var(--foreground));
              }
              #cv-preview-content .cv-title-banner {
                background-color: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                text-align: center;
                padding: 0.25rem 0;
                margin-bottom: 0.5rem;
                font-size: 12pt;
                font-weight: bold;
                text-transform: uppercase;
              }
              #cv-preview-content .cv-contact-info {
                text-align: center;
                font-size: 8pt;
                color: #555;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid hsl(var(--border));
              }
              #cv-preview-content .cv-contact-info span {
                margin: 0 0.5rem;
              }
              #cv-preview-content .cv-section-header {
                font-size: 11pt;
                font-weight: 700;
                color: hsl(var(--primary-foreground));
                background-color: hsl(var(--primary));
                padding: 0.2rem 0.5rem;
                margin-top: 1rem;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
              }
              #cv-preview-content .cv-grid-container {
                display: grid;
                grid-template-columns: 2fr 1fr; /* 2/3 and 1/3 layout */
                gap: 1rem;
              }
              #cv-preview-content .cv-left-column {}
              #cv-preview-content .cv-right-column {
                border-left: 1px solid hsl(var(--border));
                padding-left: 1rem;
              }
              #cv-preview-content .cv-item-title {
                font-size: 10pt;
                font-weight: bold;
                color: hsl(var(--primary));
              }
              #cv-preview-content .cv-item-subtitle {
                font-size: 9pt;
                color: #333;
              }
              #cv-preview-content .cv-item-dates {
                font-size: 8pt;
                color: #777;
                font-style: italic;
              }
              #cv-preview-content ul {
                list-style-type: disc;
                padding-left: 1.2rem;
                font-size: 9pt;
                margin-top: 0.2rem;
              }
              #cv-preview-content li {
                margin-bottom: 0.2rem;
              }
            `}</style>
          
          <PersonalInfoPreview data={cvData.personalInfo} />
          
          <div className="cv-grid-container">
            <div className="cv-left-column">
              <PersonalStatementPreview summary={cvData.summary} />
              <ExperiencePreview experience={cvData.experience} />
            </div>
            <div className="cv-right-column">
              <EducationPreview education={cvData.education} />
              <SkillsPreview skills={keySkills} title="Key Skills" />
              <AdditionalSkillsPreview skills={additionalSkillsData} />
              <QualificationsPreview qualifications={cvData.qualifications} />
            </div>
          </div>

        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CvPreview;
