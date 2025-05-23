import React from 'react';
import { type CVData } from '@/types/cv';
import { htmlStyles } from './template';

export const TemplateHTML: React.FC<{ cvData: CVData }> = ({ cvData }) => {
  const halfSkillsIndex = Math.ceil(cvData.skills.length / 2);
  const keySkills = cvData.skills.slice(0, halfSkillsIndex);
  const additionalSkills = cvData.skills.slice(halfSkillsIndex);

  return (
    <div className={htmlStyles.page}>
      {/* Header */}
      <div className={htmlStyles.headerContainer}>
        <h1 className={htmlStyles.name}>{(cvData.personalInfo.name || "LEO O'REILLY").toUpperCase()}</h1>
        <div className={htmlStyles.titleBanner}>
          <span>{cvData.personalInfo.title || "CARE WORKER"}</span>
        </div>
        <div className={htmlStyles.contactInfo}>
          {cvData.personalInfo.linkedin && (
            <span className={htmlStyles.contactItem}>LinkedIn: {cvData.personalInfo.linkedin}</span>
          )}
          {cvData.personalInfo.phone && (
            <span className={htmlStyles.contactItem}>Phone: {cvData.personalInfo.phone}</span>
          )}
          {cvData.personalInfo.email && (
            <span className={htmlStyles.contactItem}>Email: {cvData.personalInfo.email}</span>
          )}
          {cvData.personalInfo.address && (
            <span className={htmlStyles.contactItem}>Location: {cvData.personalInfo.address}</span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={htmlStyles.mainContent}>
        <div className={htmlStyles.leftColumn}>
          {/* Personal Statement */}
          {cvData.summary && (
            <div className={htmlStyles.section}>
              <div className={htmlStyles.sectionHeader}>
                <span>Personal Statement</span>
              </div>
              <p className={htmlStyles.listItemText}>{cvData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {cvData.experience.length > 0 && (
            <div className={htmlStyles.section}>
              <div className={htmlStyles.sectionHeader}>
                <span>Work Experience</span>
              </div>
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="mb-2.5">
                  <div className="flex">
                    <span className={`${htmlStyles.itemDates} flex-1 text-left`}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <div className="flex-[3] pl-1">
                      <h3 className={htmlStyles.itemTitle}>{exp.jobTitle}</h3>
                      <p className={htmlStyles.itemSubtitle}>
                        {exp.company}{exp.location ? `, ${exp.location}` : ''}
                      </p>
                    </div>
                  </div>
                  {exp.description.split('\n').map((line, i) => line.trim() && (
                    <div key={i} className={`${htmlStyles.listItem} ml-2.5`}>
                      <span className={htmlStyles.bullet}>• </span>
                      <span className={htmlStyles.listItemText}>{line.replace(/^- /, '')}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={htmlStyles.rightColumn}>
          {/* Education */}
          {cvData.education.length > 0 && (
            <div className={htmlStyles.section}>
              <div className={htmlStyles.sectionHeader}>
                <span>Education</span>
              </div>
              {cvData.education.map((edu) => (
                <div key={edu.id} className="mb-2.5">
                  <div className="flex">
                    <span className={`${htmlStyles.itemDates} flex-1 text-left`}>
                      {edu.graduationDate}
                    </span>
                    <div className="flex-[3] pl-1">
                      <h3 className={htmlStyles.itemTitle}>{edu.institution}</h3>
                      <p className={htmlStyles.itemSubtitle}>{edu.degree}</p>
                    </div>
                  </div>
                  {edu.description && edu.description.split('\n').map((line, i) => line.trim() && (
                    <div key={i} className={`${htmlStyles.listItem} ml-2.5`}>
                      <span className={htmlStyles.bullet}>• </span>
                      <span className={htmlStyles.listItemText}>{line.replace(/^- /, '')}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <>
              <div className={htmlStyles.section}>
                <div className={htmlStyles.sectionHeader}>
                  <span>Key Skills</span>
                </div>
                {keySkills.map((skill, i) => (
                  <div key={i} className={htmlStyles.listItem}>
                    <span className={htmlStyles.bullet}>• </span>
                    <span className={htmlStyles.listItemText}>{skill}</span>
                  </div>
                ))}
              </div>

              <div className={htmlStyles.section}>
                <div className={htmlStyles.sectionHeader}>
                  <span>Additional Skills</span>
                </div>
                {additionalSkills.map((skill, i) => (
                  <div key={i} className={htmlStyles.listItem}>
                    <span className={htmlStyles.bullet}>• </span>
                    <span className={htmlStyles.listItemText}>{skill}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Qualifications */}
          {cvData.qualifications.length > 0 && (
            <div className={htmlStyles.section}>
              <div className={htmlStyles.sectionHeader}>
                <span>Qualifications</span>
              </div>
              {cvData.qualifications.map((qual) => (
                <div key={qual.id} className="mb-2.5">
                  <span className={htmlStyles.itemDates}>{qual.date}</span>
                  <h3 className={htmlStyles.itemTitle}>{qual.name}</h3>
                  {qual.issuer && <p className={htmlStyles.itemSubtitle}>{qual.issuer}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 