
// src/components/cv-preview/skills-preview.tsx
import type React from 'react';
import { Badge } from '@/components/ui/badge';

interface SkillsPreviewProps {
  skills: string[];
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({ skills }) => {
  if (skills.length === 0) return null;
  return (
    <section className="mb-2">
      <h3 className="font-sans text-primary border-b border-primary/50 pb-0.5 mb-1">Skills</h3>
      <div className="flex flex-wrap gap-1">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="font-serif text-[8.5pt] bg-primary/10 text-primary py-0 px-1 leading-tight">
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default SkillsPreview;
