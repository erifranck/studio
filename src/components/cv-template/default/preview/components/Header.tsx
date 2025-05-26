import React from 'react';
import { type PersonalInfo } from '@/types/cv';

interface HeaderProps {
  personalInfo: PersonalInfo;
}

export const Header: React.FC<HeaderProps> = ({ personalInfo }) => {
  return (
    <header className="text-center mb-5">
      <h1 className="text-[28pt] font-bold text-[#333333] mb-0.5">{personalInfo.name.toUpperCase()}</h1>
      <div className="bg-[#B71C1C] text-white py-1 px-5 mb-2">
        <p className="text-[13pt] font-bold uppercase">{personalInfo.title.toUpperCase()}</p>
      </div>
      <div className="flex flex-wrap justify-center items-center mb-4 py-2 border-t border-b border-[#E0E0E0] text-[9pt] text-[#4A4A4A]">
        {personalInfo.linkedin && (
          <span className="mx-2 my-0.5">
            <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            {personalInfo.linkedin}
          </span>
        )}
        {personalInfo.phone && (
          <span className="mx-2 my-0.5">
            <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-8.9-9-8.9v2c3.9 0 7 3.1 7 6.9z" />
            </svg>
            {personalInfo.phone}
          </span>
        )}
        {personalInfo.email && (
          <span className="mx-2 my-0.5">
            <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {personalInfo.email}
          </span>
        )}
        {personalInfo.address && (
          <span className="mx-2 my-0.5">
            <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {personalInfo.address}
          </span>
        )}
        {personalInfo.website && (
          <span className="mx-2 my-0.5">
            <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            {personalInfo.website}
          </span>
        )}
      </div>
    </header>
  );
}; 