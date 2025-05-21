
// src/components/cv-preview/skills-preview.tsx
import type React from 'react';

interface SkillsPreviewProps {
  skills: string[];
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({ skills }) => {
  if (skills.length === 0) return null;
  return (
    <section className="mb-4 cv-page-break-avoid"> 
      <h3 className="cv-section-header font-sans">Skills</h3>
      <p className="font-serif">
        {skills.join(', ')}
      </p>
    </section>
  );
};

export default SkillsPreview;
