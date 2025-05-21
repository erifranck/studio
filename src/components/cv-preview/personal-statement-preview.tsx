// src/components/cv-preview/personal-statement-preview.tsx
import type React from 'react';

interface PersonalStatementPreviewProps {
  summary: string; // Prop name kept as summary for data mapping
}

const PersonalStatementPreview: React.FC<PersonalStatementPreviewProps> = ({ summary }) => {
  if (!summary) return null;
  return (
    <section className="mb-4">
      <h3 className="cv-section-header font-sans">Personal Statement</h3>
      <p className="font-sans text-xs whitespace-pre-line leading-relaxed">
        {summary || "Your personal statement..."}
      </p>
    </section>
  );
};

export default PersonalStatementPreview;
