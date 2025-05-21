// src/components/cv-preview/skills-preview.tsx
import type React from 'react';
import { Badge } from '@/components/ui/badge';

interface SkillsPreviewProps {
  skills: string[];
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({ skills }) => {
  if (skills.length === 0) return null;
  return (
    <section className="mb-6">
      <h3 className="text-2xl font-semibold font-sans text-primary border-b-2 border-primary/50 pb-1 mb-3">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="font-serif text-base bg-primary/10 text-primary py-1 px-3">
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default SkillsPreview;
