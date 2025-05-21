
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
      <h3 className="cv-section-header font-sans">Work Experience</h3>
      {experience.map((item) => (
        <div key={item.id} className="mb-3 text-xs">
          <div className="flex">
            <div className="w-1/4 pr-2"> {/* Dates column */}
              <p className="cv-item-dates">{item.startDate} - {item.endDate}</p>
            </div>
            <div className="w-3/4"> {/* Main content column */}
              <h4 className="cv-item-title font-sans">{item.jobTitle || "Job Title"}</h4>
              <p className="cv-item-subtitle font-sans !mb-0.5">
                {item.company || "Company Name"}
                {item.location && `, ${item.location}`}
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

export default ExperiencePreview;
