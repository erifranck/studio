
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
      <h3 className="cv-section-header font-sans">Education</h3>
      {education.map((item) => (
        <div key={item.id} className="mb-3 cv-page-break-avoid last:mb-0"> 
          <h4 className="cv-item-title font-sans">{item.degree || "Degree Name"}</h4>
          <p className="cv-item-meta font-sans !mb-0.5">  {/* Reduced margin, specific class for meta */}
            {item.institution || "Institution Name"}
            {item.location && ` | ${item.location}`}
          </p>
          <p className="cv-item-meta font-sans !text-[9pt] !mb-1">{item.graduationDate || "Graduation Date"}</p> {/* Smaller font for dates, reduced margin */}
          {item.description && (
            <p className="font-serif whitespace-pre-line !text-[9.5pt]"> {/* Slightly smaller for description */}
              {item.description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationPreview;
