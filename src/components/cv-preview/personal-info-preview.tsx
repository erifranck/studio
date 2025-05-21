
// src/components/cv-preview/personal-info-preview.tsx
import type React from 'react';
import { type PersonalInfo } from '@/types/cv';
import { Mail, Phone, Linkedin, Github, MapPin, Globe } from 'lucide-react';

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

const PersonalInfoPreview: React.FC<PersonalInfoPreviewProps> = ({ data }) => {
  return (
    <div className="text-center mb-2 border-b pb-2 border-gray-300">
      <h1 className="font-bold font-sans text-primary leading-tight">{data.name || "Your Name"}</h1>
      <h2 className="font-sans text-foreground/80 mb-1 leading-tight">{data.title || "Your Title"}</h2>
      <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 text-foreground/70 font-serif">
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-primary transition-colors contact-info-item">
            <Mail /> {data.email}
          </a>
        )}
        {data.phone && (
          <span className="flex items-center gap-1 contact-info-item">
            <Phone /> {data.phone}
          </span>
        )}
        {data.address && (
          <span className="flex items-center gap-1 contact-info-item">
            <MapPin /> {data.address}
          </span>
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0 mt-0.5 text-foreground/70 font-serif">
         {data.linkedin && (
          <a href={`https://${data.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors contact-info-item">
            <Linkedin /> {data.linkedin.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
        {data.github && (
          <a href={`https://${data.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors contact-info-item">
            <Github /> {data.github.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
        {data.website && (
          <a href={`https://${data.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors contact-info-item">
            <Globe /> {data.website.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPreview;
