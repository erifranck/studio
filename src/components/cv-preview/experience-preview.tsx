// src/components/cv-preview/experience-preview.tsx
import type React from 'react';
import { type ExperienceEntry } from '@/types/cv';

interface ExperiencePreviewProps {
  experience: ExperienceEntry[];
}

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ experience }) => {
  if (experience.length === 0) return null;
  return (
    <section className="mb-4">
      <h3 className="text-xl font-semibold font-sans text-primary border-b border-primary/50 pb-0.5 mb-3">Experience</h3>
      {experience.map((item) => (
        <div key={item.id} className="mb-3 last:mb-0">
          <h4 className="text-md font-semibold font-sans text-foreground">{item.jobTitle || "Job Title"}</h4>
          <p className="text-sm font-medium font-sans text-foreground/80">
            {item.company || "Company Name"} | {item.location || "Location"}
          </p>
          <p className="text-xs text-muted-foreground font-sans mb-1">
            {item.startDate || "Start Date"} - {item.endDate || "End Date"}
          </p>
          {item.description && (
            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-foreground/90 text-sm leading-normal font-serif">
              {item.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperiencePreview;
