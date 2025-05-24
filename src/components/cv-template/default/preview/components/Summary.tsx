import React from 'react';

interface SummaryProps {
  summary: string;
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
  if (!summary) return null;
  
  return (
    <section className="mb-4">
      <div className="bg-[#B71C1C] text-white py-0.5 px-2 mb-2">
        <h2 className="text-[11pt] font-bold uppercase">Professional Summary</h2>
      </div>
      <p className="flex-1 text-[10pt] text-[#333333] leading-[1.4]">{summary}</p>
    </section>
  );
}; 