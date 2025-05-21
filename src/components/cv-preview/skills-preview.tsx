
// src/components/cv-preview/skills-preview.tsx
import type React from 'react';

interface SkillsPreviewProps {
  skills: string[];
  title?: string; // Optional title for the section
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({ skills, title = "Key Skills" }) => {
  if (skills.length === 0) return null;
  return (
    <section className="mb-4"> 
      <h3 className="cv-section-header font-sans">{title}</h3>
      <ul className="font-sans list-disc pl-5 text-xs">
        {skills.map((skill, index) => (
          <li key={index} className="leading-snug">{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default SkillsPreview;
