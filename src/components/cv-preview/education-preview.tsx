// src/components/cv-preview/education-preview.tsx
import type React from 'react';
import { type EducationEntry } from '@/types/cv';

interface EducationPreviewProps {
  education: EducationEntry[];
}

const EducationPreview: React.FC<EducationPreviewProps> = ({ education }) => {
  if (education.length === 0) return null;
  return (
    <section className="mb-6">
      <h3 className="text-2xl font-semibold font-sans text-primary border-b-2 border-primary/50 pb-1 mb-4">Education</h3>
      {education.map((item) => (
        <div key={item.id} className="mb-4 last:mb-0">
          <h4 className="text-lg font-semibold font-sans text-foreground">{item.degree || "Degree"}</h4>
          <p className="text-md font-medium font-sans text-foreground/80">
            {item.institution || "Institution"} | {item.location || "Location"}
          </p>
          <p className="text-sm text-muted-foreground font-sans mb-1">{item.graduationDate || "Graduation Date"}</p>
          {item.description && (
            <p className="text-foreground/90 text-base leading-relaxed font-serif whitespace-pre-line">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationPreview;
