// src/components/cv-preview/experience-preview.tsx
import type React from 'react';
import { type ExperienceEntry } from '@/types/cv';

interface ExperiencePreviewProps {
  experience: ExperienceEntry[];
}

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ experience }) => {
  if (experience.length === 0) return null;
  return (
    <section className="mb-2.5">
      <h3 className="text-lg font-semibold font-sans text-primary border-b border-primary/50 pb-0.5 mb-1.5">Experience</h3>
      {experience.map((item) => (
        <div key={item.id} className="mb-2 last:mb-0">
          <h4 className="text-sm font-semibold font-sans text-foreground leading-tight">{item.jobTitle || "Job Title"}</h4>
          <p className="text-[10pt] font-medium font-sans text-foreground/80 leading-tight">
            {item.company || "Company Name"} | {item.location || "Location"}
          </p>
          <p className="text-[9pt] text-muted-foreground font-sans mb-0.5 leading-tight">
            {item.startDate || "Start Date"} - {item.endDate || "End Date"}
          </p>
          {item.description && (
            <ul className="list-disc list-outside ml-3.5 mt-0.5 space-y-0 text-foreground/90 text-[9.5pt] leading-snug font-serif">
              {item.description.split('\n').map((line, i) => line.trim() && <li key={i} className="mb-0">{line.replace(/^- /, '')}</li>)}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperiencePreview;
