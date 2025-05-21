// src/components/cv-preview/education-preview.tsx
import type React from 'react';
import { type EducationEntry } from '@/types/cv';

interface EducationPreviewProps {
  education: EducationEntry[];
}

const EducationPreview: React.FC<EducationPreviewProps> = ({ education }) => {
  if (education.length === 0) return null;
  return (
    <section className="mb-4">
      <h3 className="text-xl font-semibold font-sans text-primary border-b border-primary/50 pb-0.5 mb-3">Education</h3>
      {education.map((item) => (
        <div key={item.id} className="mb-3 last:mb-0">
          <h4 className="text-md font-semibold font-sans text-foreground">{item.degree || "Degree"}</h4>
          <p className="text-sm font-medium font-sans text-foreground/80">
            {item.institution || "Institution"} | {item.location || "Location"}
          </p>
          <p className="text-xs text-muted-foreground font-sans mb-1">{item.graduationDate || "Graduation Date"}</p>
          {item.description && (
            <p className="text-foreground/90 text-sm leading-normal font-serif whitespace-pre-line">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationPreview;
