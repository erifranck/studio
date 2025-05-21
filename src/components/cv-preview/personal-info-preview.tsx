
// src/components/cv-preview/personal-info-preview.tsx
import type React from 'react';
import { type PersonalInfo } from '@/types/cv';
import { Mail, Phone, Linkedin, MapPin, Globe } from 'lucide-react'; // Github not in wireframe top

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

const PersonalInfoPreview: React.FC<PersonalInfoPreviewProps> = ({ data }) => {
  return (
    <div className="mb-4 text-center">
      <h1 className="cv-name font-sans">{(data.name || "LEO O'REILLY").toUpperCase()}</h1>
      <div className="cv-title-banner">
        <span className="font-sans">{data.title || "CARE WORKER"}</span>
      </div>
      
      <div className="cv-contact-info flex flex-wrap justify-center items-center space-x-2 sm:space-x-4 text-xs">
        {data.linkedin && (
          <a href={`https://${data.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
            <Linkedin size={12} className="mr-1 text-primary" /> {data.linkedin.replace(/^https?:\/\//, '').replace(/^www\./,'')}
          </a>
        )}
        {data.phone && (
          <span className="flex items-center">
            <Phone size={12} className="mr-1 text-primary" /> {data.phone}
          </span>
        )}
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center hover:text-primary transition-colors">
            <Mail size={12} className="mr-1 text-primary" /> {data.email}
          </a>
        )}
         {data.address && ( // Location
          <span className="flex items-center">
            <MapPin size={12} className="mr-1 text-primary" /> {data.address}
          </span>
        )}
        {/* GitHub and general website not prominent in wireframe header */}
      </div>
    </div>
  );
};

export default PersonalInfoPreview;
