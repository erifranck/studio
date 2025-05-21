// src/components/cv-editor/education-editor.tsx
"use client";
import type React from 'react';
import { type EducationEntry, type SetCvDataFn } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { GraduationCap, PlusCircle, Trash2 } from 'lucide-react';

interface EducationEditorProps {
  education: EducationEntry[];
  setCvData: SetCvDataFn;
}

const EducationEditor: React.FC<EducationEditorProps> = ({ education, setCvData }) => {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [name]: value };
      return { ...prev, education: newEducation };
    });
  };

  const handleAddItem = () => {
    setCvData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu${Date.now()}`,
          degree: '',
          institution: '',
          location: '',
          graduationDate: '',
          description: '',
        },
      ],
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id),
    }));
  };
  
  const fields: Array<{ key: keyof EducationEntry; label: string; type?: 'text' | 'textarea'}> = [
    { key: 'degree', label: 'Degree' },
    { key: 'institution', label: 'Institution' },
    { key: 'location', label: 'Location' },
    { key: 'graduationDate', label: 'Graduation Date' },
    { key: 'description', label: 'Description (Optional)', type: 'textarea' },
  ];


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <GraduationCap className="text-primary" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {education.map((item, index) => (
          <div key={item.id} className="space-y-4 p-4 border rounded-md shadow-sm bg-card/50 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 h-8 w-8"
              onClick={() => handleRemoveItem(item.id)}
              aria-label="Remove education entry"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {fields.map(field => (
              <div key={field.key} className="space-y-1">
                <Label htmlFor={`${item.id}-${field.key}`} className="font-medium text-foreground/80">
                  {field.label}
                </Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={`${item.id}-${field.key}`}
                    name={field.key}
                    value={item[field.key] || ''}
                    onChange={(e) => handleChange(index, e)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    rows={3}
                    className="bg-background border-input focus:ring-primary"
                  />
                ) : (
                  <Input
                    id={`${item.id}-${field.key}`}
                    name={field.key}
                    value={item[field.key] || ''}
                    onChange={(e) => handleChange(index, e)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="bg-background border-input focus:ring-primary"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddItem} variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EducationEditor;
