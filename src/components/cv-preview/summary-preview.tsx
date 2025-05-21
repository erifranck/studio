
// src/components/cv-preview/summary-preview.tsx
import type React from 'react';

interface SummaryPreviewProps {
  summary: string;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ summary }) => {
  if (!summary) return null;
  return (
    <section className="mb-4 cv-page-break-avoid"> 
      <h3 className="cv-section-header font-sans">Summary</h3>
      <p className="font-serif whitespace-pre-line">
        {summary || "Your professional summary..."}
      </p>
    </section>
  );
};

export default SummaryPreview;
