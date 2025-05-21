
// src/components/cv-preview/summary-preview.tsx
import type React from 'react';

interface SummaryPreviewProps {
  summary: string;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ summary }) => {
  if (!summary) return null;
  return (
    <section className="mb-3"> {/* Increased mb */}
      <h3 className="font-sans text-primary border-b border-primary/50 pb-0.5 mb-1.5">Summary</h3> {/* Increased mb */}
      <p className="text-foreground/90 font-serif whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
};

export default SummaryPreview;

