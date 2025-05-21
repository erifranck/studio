// src/components/cv-preview/summary-preview.tsx
import type React from 'react';

interface SummaryPreviewProps {
  summary: string;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ summary }) => {
  if (!summary) return null;
  return (
    <section className="mb-6">
      <h3 className="text-2xl font-semibold font-sans text-primary border-b-2 border-primary/50 pb-1 mb-3">Summary</h3>
      <p className="text-foreground/90 text-base leading-relaxed font-serif whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
};

export default SummaryPreview;
