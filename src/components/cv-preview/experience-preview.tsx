
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
      <h3 className="cv-section-header font-sans">Experience</h3>
      {experience.map((item) => (
        <div key={item.id} className="mb-3 cv-page-break-avoid last:mb-0"> 
          <h4 className="cv-item-title font-sans">{item.jobTitle || "Job Title"}</h4>
          <p className="cv-item-meta font-sans !mb-0.5"> {/* Reduced margin, specific class for meta */}
            {item.company || "Company Name"}
            {item.location && ` | ${item.location}`}
          </p>
          <p className="cv-item-meta font-sans !text-[9pt] !mb-1"> {/* Smaller font for dates, reduced margin */}
            {item.startDate || "Start Date"} - {item.endDate || "End Date"}
          </p>
          {item.description && (
            <ul className="font-serif"> 
              {item.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperiencePreview;
