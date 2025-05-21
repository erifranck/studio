
// src/components/cv-preview/personal-info-preview.tsx
import type React from 'react';
import { type PersonalInfo } from '@/types/cv';
import { Mail, Phone, Linkedin, Github, MapPin, Globe } from 'lucide-react';

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

const PersonalInfoPreview: React.FC<PersonalInfoPreviewProps> = ({ data }) => {
  return (
    <div className="mb-2 text-left"> {/* Changed to text-left, reduced mb */}
      <h1 className="cv-name font-sans">{data.name || "Your Name"}</h1>
      <h2 className="cv-title font-sans mb-2">{data.title || "Aspiring Professional"}</h2>
      
      <div className="cv-contact-info space-y-0.5">
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center hover:text-primary transition-colors">
            <Mail /> {data.email}
          </a>
        )}
        {data.phone && (
          <div className="flex items-center">
            <Phone /> {data.phone}
          </div>
        )}
         {data.address && (
          <div className="flex items-center">
            <MapPin /> {data.address}
          </div>
        )}
        {data.linkedin && (
          <a href={`https://${data.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
            <Linkedin /> {data.linkedin.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
        {data.github && (
          <a href={`https://${data.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
            <Github /> {data.github.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
        {data.website && (
          <a href={`https://${data.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
            <Globe /> {data.website.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPreview;
