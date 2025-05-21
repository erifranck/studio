// src/components/cv-editor/personal-info-editor.tsx
"use client";
import type React from 'react';
import { type PersonalInfo, type SetCvDataFn } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
  setCvData: SetCvDataFn;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ personalInfo, setCvData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const fields: Array<{ key: keyof PersonalInfo; label: string; type?: string }> = [
    { key: 'name', label: 'Full Name' },
    { key: 'title', label: 'Job Title / Headline' },
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'phone', label: 'Phone Number', type: 'tel' },
    { key: 'address', label: 'Location (e.g., City, State)' },
    { key: 'linkedin', label: 'LinkedIn Profile URL' },
    { key: 'github', label: 'GitHub Profile URL' },
    { key: 'website', label: 'Portfolio/Website URL (Optional)' },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <User className="text-primary" /> Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {fields.map(field => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key} className="font-medium text-foreground/80">
              {field.label}
            </Label>
            <Input
              id={field.key}
              name={field.key}
              type={field.type || 'text'}
              value={personalInfo[field.key] || ''}
              onChange={handleChange}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="bg-background border-input focus:ring-primary"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoEditor;
