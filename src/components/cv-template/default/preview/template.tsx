import React from 'react';
import { type CVData } from '@/types/cv';
import { Header, Summary, Experience, Education, Skills, Qualifications } from './components';

interface PreviewTemplateProps {
  data: CVData;
}

export const PreviewTemplate: React.FC<PreviewTemplateProps> = ({ data }) => {
  return (
    <div className="p-8">
      <Header personalInfo={data.personalInfo} />
      <div className="flex gap-4">
        <div className="flex-[2] pr-4">
          <Summary summary={data.summary} />
          <Experience experiences={data.experience} />
        </div>
        <div className="flex-1 pl-4 border-l border-[#E0E0E0]">
          <Education education={data.education} />
          <Skills skills={data.skills} />
          <Qualifications qualifications={data.qualifications} />
        </div>
      </div>
    </div>
  );
}; 