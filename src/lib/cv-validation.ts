import { type CVData } from '@/types/cv';

/**
 * Validates and preserves factual data from the original CV
 * This ensures AI enhancements don't modify critical factual information
 * @param original - Original CV data
 * @param enhanced - Enhanced CV data from AI
 * @param userPrompt - User's enhancement prompt to check for job title change requests
 */
export function preserveFactualData(
  original: CVData, 
  enhanced: CVData, 
  userPrompt?: string
): CVData {
  // Deep clone the enhanced data to avoid mutations
  const validated: CVData = JSON.parse(JSON.stringify(enhanced));
  
  // Check if user requested job title changes
  const jobTitleChangeRequested = userPrompt ? 
    /(?:change|modify|update|adapt|adjust|transform).*(?:job title|position|role)|(?:job title|position|role).*(?:change|modify|update|adapt|adjust|transform)/i.test(userPrompt) :
    false;

  // Preserve all personal information
  validated.personalInfo = {
    ...validated.personalInfo,
    name: original.personalInfo.name,
    email: original.personalInfo.email,
    phone: original.personalInfo.phone,
    linkedin: original.personalInfo.linkedin,
    github: original.personalInfo.github,
    address: original.personalInfo.address,
    website: original.personalInfo.website,
    // Only allow title change if explicitly different (for career change requests)
    title: enhanced.personalInfo.title !== original.personalInfo.title 
      ? enhanced.personalInfo.title 
      : original.personalInfo.title,
  };

  // Preserve experience factual data
  validated.experience = enhanced.experience.map((enhancedExp, index) => {
    const originalExp = original.experience[index];
    if (!originalExp) return enhancedExp; // New entry (shouldn't happen)

    return {
      ...enhancedExp,
      id: originalExp.id,
      // Allow job title change only if explicitly requested by user
      jobTitle: jobTitleChangeRequested ? enhancedExp.jobTitle : originalExp.jobTitle,
      company: originalExp.company,
      location: originalExp.location,
      startDate: originalExp.startDate,
      endDate: originalExp.endDate,
      // Only allow description to be enhanced
      description: enhancedExp.description || originalExp.description,
    };
  });

  // Preserve education factual data
  validated.education = enhanced.education.map((enhancedEdu, index) => {
    const originalEdu = original.education[index];
    if (!originalEdu) return enhancedEdu; // New entry (shouldn't happen)

    return {
      ...enhancedEdu,
      id: originalEdu.id,
      degree: originalEdu.degree,
      institution: originalEdu.institution,
      location: originalEdu.location,
      graduationDate: originalEdu.graduationDate,
      // Only allow description to be enhanced
      description: enhancedEdu.description || originalEdu.description,
    };
  });

  // Preserve qualifications factual data
  validated.qualifications = enhanced.qualifications.map((enhancedQual, index) => {
    const originalQual = original.qualifications[index];
    if (!originalQual) return enhancedQual; // New entry (shouldn't happen)

    return {
      ...enhancedQual,
      id: originalQual.id,
      date: originalQual.date,
      name: originalQual.name, // Keep exact name
      issuer: originalQual.issuer,
    };
  });

  // Skills and summary can be fully enhanced
  validated.skills = enhanced.skills;
  validated.summary = enhanced.summary;

  return validated;
}

/**
 * Compares two CV data objects and returns a list of fields that were modified
 * Useful for logging or debugging what the AI tried to change
 * @param original - Original CV data
 * @param enhanced - Enhanced CV data
 * @param userPrompt - User's enhancement prompt to check for allowed changes
 */
export function detectModifiedFields(
  original: CVData, 
  enhanced: CVData, 
  userPrompt?: string
): string[] {
  const modifiedFields: string[] = [];
  
  // Check if user requested job title changes
  const jobTitleChangeRequested = userPrompt ? 
    /(?:change|modify|update|adapt|adjust|transform).*(?:job title|position|role)|(?:job title|position|role).*(?:change|modify|update|adapt|adjust|transform)/i.test(userPrompt) :
    false;

  // Check personal info
  Object.keys(original.personalInfo).forEach(key => {
    if (original.personalInfo[key as keyof typeof original.personalInfo] !== 
        enhanced.personalInfo[key as keyof typeof enhanced.personalInfo]) {
      modifiedFields.push(`personalInfo.${key}`);
    }
  });

  // Check experience
  original.experience.forEach((origExp, index) => {
    const enhExp = enhanced.experience[index];
    if (!enhExp) return;

    Object.keys(origExp).forEach(key => {
      // Skip description (always allowed) and jobTitle (if change was requested)
      if (key === 'description') return;
      if (key === 'jobTitle' && jobTitleChangeRequested) return;
      
      if (origExp[key as keyof typeof origExp] !== enhExp[key as keyof typeof enhExp]) {
        modifiedFields.push(`experience[${index}].${key}`);
      }
    });
  });

  // Check education
  original.education.forEach((origEdu, index) => {
    const enhEdu = enhanced.education[index];
    if (!enhEdu) return;

    Object.keys(origEdu).forEach(key => {
      if (key !== 'description' && origEdu[key as keyof typeof origEdu] !== enhEdu[key as keyof typeof enhEdu]) {
        modifiedFields.push(`education[${index}].${key}`);
      }
    });
  });

  // Check qualifications
  original.qualifications.forEach((origQual, index) => {
    const enhQual = enhanced.qualifications[index];
    if (!enhQual) return;

    Object.keys(origQual).forEach(key => {
      if (origQual[key as keyof typeof origQual] !== enhQual[key as keyof typeof enhQual]) {
        modifiedFields.push(`qualifications[${index}].${key}`);
      }
    });
  });

  return modifiedFields;
} 