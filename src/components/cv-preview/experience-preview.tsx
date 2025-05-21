// src/components/cv-preview/experience-preview.tsx
import type React from 'react';
import { type ExperienceEntry } from '@/types/cv';

interface ExperiencePreviewProps {
  experience: ExperienceEntry[];
}

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ experience }) => {
  if (experience.length === 0) return null;
  return (
    <section className="mb-6">
      <h3 className="text-2xl font-semibold font-sans text-primary border-b-2 border-primary/50 pb-1 mb-4">Experience</h3>
      {experience.map((item) => (
        <div key={item.id} className="mb-5 last:mb-0">
          <h4 className="text-lg font-semibold font-sans text-foreground">{item.jobTitle || "Job Title"}</h4>
          <p className="text-md font-medium font-sans text-foreground/80">
            {item.company || "Company Name"} | {item.location || "Location"}
          </p>
          <p className="text-sm text-muted-foreground font-sans mb-1">
            {item.startDate || "Start Date"} - {item.endDate || "End Date"}
          </p>
          {item.description && (
            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-foreground/90 text-base leading-relaxed font-serif">
              {item.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperiencePreview;
