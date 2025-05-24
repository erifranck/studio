import React from 'react';
import { type EducationEntry } from '@/types/cv';

interface EducationProps {
  education: EducationEntry[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  if (!education?.length) return null;

  return (
    <section className="mb-4">
      <div className="bg-[#B71C1C] text-white py-0.5 px-2 mb-2">
        <h2 className="text-[11pt] font-bold uppercase">Education</h2>
      </div>
      {education.map((edu) => (
        <div key={edu.id} className="mb-4">
          <h3 className="text-[11pt] font-bold text-[#B71C1C]">{edu.degree}</h3>
          <p className="text-[10pt] text-[#333333] mb-0.5">{edu.institution} • {edu.location}</p>
          <p className="text-[9pt] text-[#4A4A4A] italic">{edu.graduationDate}</p>
          {edu.description && (
            <div className="mt-2">
              {edu.description.split('\n').map((line, index) => (
                <div key={index} className="flex ml-4 mb-1">
                  <span className="w-2">•</span>
                  <span className="flex-1 text-[10pt] text-[#333333] leading-[1.4]">{line}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}; 