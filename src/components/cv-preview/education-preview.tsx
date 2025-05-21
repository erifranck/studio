// src/components/cv-preview/education-preview.tsx
import type React from 'react';
import { type EducationEntry } from '@/types/cv';

interface EducationPreviewProps {
  education: EducationEntry[];
}

const EducationPreview: React.FC<EducationPreviewProps> = ({ education }) => {
  if (education.length === 0) return null;
  return (
    <section className="mb-2.5">
      <h3 className="text-lg font-semibold font-sans text-primary border-b border-primary/50 pb-0.5 mb-1.5">Education</h3>
      {education.map((item) => (
        <div key={item.id} className="mb-2 last:mb-0">
          <h4 className="text-sm font-semibold font-sans text-foreground leading-tight">{item.degree || "Degree"}</h4>
          <p className="text-[10pt] font-medium font-sans text-foreground/80 leading-tight">
            {item.institution || "Institution"} | {item.location || "Location"}
          </p>
          <p className="text-[9pt] text-muted-foreground font-sans mb-0.5 leading-tight">{item.graduationDate || "Graduation Date"}</p>
          {item.description && (
            <p className="text-foreground/90 text-[9.5pt] leading-snug font-serif whitespace-pre-line">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationPreview;
