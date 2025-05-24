import React from 'react';
import { type QualificationEntry } from '@/types/cv';

interface QualificationsProps {
  qualifications: QualificationEntry[];
}

export const Qualifications: React.FC<QualificationsProps> = ({ qualifications }) => {
  if (!qualifications?.length) return null;

  return (
    <section className="mb-4">
      <div className="bg-[#B71C1C] text-white py-0.5 px-2 mb-2">
        <h2 className="text-[11pt] font-bold uppercase">Qualifications</h2>
      </div>
      {qualifications.map((qual) => (
        <div key={qual.id} className="mb-4">
          <h3 className="text-[11pt] font-bold text-[#B71C1C]">{qual.name}</h3>
          <p className="text-[9pt] text-[#4A4A4A] italic">{qual.date} {qual.issuer && `• ${qual.issuer}`}</p>
        </div>
      ))}
    </section>
  );
}; 