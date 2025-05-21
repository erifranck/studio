// src/components/cv-preview/personal-info-preview.tsx
import type React from 'react';
import { type PersonalInfo } from '@/types/cv';
import { Mail, Phone, Linkedin, Github, MapPin, Globe } from 'lucide-react';

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

const PersonalInfoPreview: React.FC<PersonalInfoPreviewProps> = ({ data }) => {
  return (
    <div className="text-center mb-6 border-b pb-6 border-gray-300">
      <h1 className="text-4xl font-bold font-sans text-primary mb-1">{data.name || "Your Name"}</h1>
      <h2 className="text-xl font-sans text-foreground/80 mb-4">{data.title || "Your Title"}</h2>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-foreground/70 font-serif">
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
            <Mail size={14} /> {data.email}
          </a>
        )}
        {data.phone && (
          <span className="flex items-center gap-1">
            <Phone size={14} /> {data.phone}
          </span>
        )}
        {data.address && (
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {data.address}
          </span>
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-2 text-sm text-foreground/70 font-serif">
         {data.linkedin && (
          <a href={`https://${data.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Linkedin size={14} /> {data.linkedin.replace(/^https?:\/\//, '')}
          </a>
        )}
        {data.github && (
          <a href={`https://${data.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Github size={14} /> {data.github.replace(/^https?:\/\//, '')}
          </a>
        )}
        {data.website && (
          <a href={`https://${data.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Globe size={14} /> {data.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPreview;
