// src/components/cv-editor/experience-editor.tsx
"use client";
import type React from 'react';
import { type ExperienceEntry, type SetCvDataFn, type OpenAiEnhanceDialogFn } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Briefcase, PlusCircle, Sparkles, Trash2 } from 'lucide-react';

interface ExperienceEditorProps {
  experience: ExperienceEntry[];
  setCvData: SetCvDataFn;
  openAiEnhanceDialog: OpenAiEnhanceDialogFn;
}

const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ experience, setCvData, openAiEnhanceDialog }) => {
  
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [name]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const handleAddItem = () => {
    setCvData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp${Date.now()}`,
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id),
    }));
  };

  const handleEnhanceDescription = (index: number) => {
    const currentDescription = experience[index].description;
    openAiEnhanceDialog(currentDescription, (enhancedText) => {
      setCvData(prev => {
        const newExperience = [...prev.experience];
        newExperience[index] = { ...newExperience[index], description: enhancedText };
        return { ...prev, experience: newExperience };
      });
    });
  };
  
  const fields: Array<{ key: keyof ExperienceEntry; label: string; type?: 'text' | 'textarea' }> = [
      { key: 'jobTitle', label: 'Job Title' },
      { key: 'company', label: 'Company' },
      { key: 'location', label: 'Location' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'endDate', label: 'End Date' },
      { key: 'description', label: 'Description (use new lines for bullet points)', type: 'textarea' },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Briefcase className="text-primary" /> Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {experience.map((item, index) => (
          <div key={item.id} className="space-y-4 p-4 border rounded-md shadow-sm bg-card/50 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 h-8 w-8"
              onClick={() => handleRemoveItem(item.id)}
              aria-label="Remove experience"
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
                     value={item[field.key] as string}
                     onChange={(e) => handleChange(index, e)}
                     placeholder={`Enter ${field.label.toLowerCase()}`}
                     rows={4}
                     className="bg-background border-input focus:ring-primary"
                   />
                 ) : (
                   <Input
                     id={`${item.id}-${field.key}`}
                     name={field.key}
                     value={item[field.key] as string}
                     onChange={(e) => handleChange(index, e)}
                     placeholder={`Enter ${field.label.toLowerCase()}`}
                     className="bg-background border-input focus:ring-primary"
                   />
                 )}
                 {field.key === 'description' && (
                    <Button 
                        onClick={() => handleEnhanceDescription(index)} 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-primary border-primary hover:bg-primary/10"
                    >
                        <Sparkles className="mr-2 h-4 w-4" /> Enhance Description
                    </Button>
                 )}
               </div>
            ))}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddItem} variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExperienceEditor;
