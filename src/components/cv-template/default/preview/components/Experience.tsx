import React from 'react';
import { type ExperienceEntry } from '@/types/cv';

interface ExperienceProps {
  experiences: ExperienceEntry[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  if (!experiences?.length) return null;

  return (
    <section className="mb-4">
      <div className="bg-[#B71C1C] text-white py-0.5 px-2 mb-2">
        <h2 className="text-[11pt] font-bold uppercase">Work Experience</h2>
      </div>
      {experiences.map((exp) => (
        <div key={exp.id} className="mb-4">
          <h3 className="text-[11pt] font-bold text-[#B71C1C]">{exp.jobTitle}</h3>
          <p className="text-[10pt] text-[#333333] mb-0.5">{exp.company} • {exp.location}</p>
          <p className="text-[9pt] text-[#4A4A4A] italic">{exp.startDate} - {exp.endDate}</p>
          <div className="mt-2">
            {exp.description.split('\n').map((line, index) => (
              <div key={index} className="flex ml-4 mb-1">
                <span className="w-2">•</span>
                <span className="flex-1 text-[10pt] text-[#333333] leading-[1.4]">{line}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}; 