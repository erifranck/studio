// src/components/cv-preview/summary-preview.tsx
import type React from 'react';

interface SummaryPreviewProps {
  summary: string;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ summary }) => {
  if (!summary) return null;
  return (
    <section className="mb-2.5">
      <h3 className="text-lg font-semibold font-sans text-primary border-b border-primary/50 pb-0.5 mb-1.5">Summary</h3>
      <p className="text-foreground/90 text-[10pt] leading-snug font-serif whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
};

export default SummaryPreview;
