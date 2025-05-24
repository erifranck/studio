import React from 'react';

interface SkillsProps {
  skills: string[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills?.length) return null;

  return (
    <section className="mb-4">
      <div className="bg-[#B71C1C] text-white py-0.5 px-2 mb-2">
        <h2 className="text-[11pt] font-bold uppercase">Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-[#ECEFF1] text-[#4A4A4A] px-3 py-1 rounded-full text-[10pt]">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}; 