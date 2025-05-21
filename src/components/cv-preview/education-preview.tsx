
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
        <div key={item.id} className="mb-3 text-xs">
           <div className="flex">
            <div className="w-1/3 pr-2"> {/* Dates column */}
              <p className="cv-item-dates">{item.graduationDate || "Graduation Date"}</p>
            </div>
            <div className="w-2/3"> {/* Main content column */}
              <h4 className="cv-item-title font-sans">{item.institution || "Institution Name"}</h4>
              <p className="cv-item-subtitle font-sans !mb-0.5">
                {item.degree || "Degree Name"}
              </p>
              {item.description && (
                <ul className="font-sans list-disc pl-4 mt-1">
                  {item.description.split('\n').map((line, i) => line.trim() && <li key={i} className="text-xs leading-snug">{line.replace(/^- /, '')}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EducationPreview;
