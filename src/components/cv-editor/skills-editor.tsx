// src/components/cv-editor/skills-editor.tsx
"use client";
import type React from 'react';
import { useState } from 'react';
import { type SetCvDataFn } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, PlusCircle, X } from 'lucide-react';

interface SkillsEditorProps {
  skills: string[];
  setCvData: SetCvDataFn;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, setCvData }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setCvData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Award className="text-primary" /> Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="flex gap-2 items-end">
          <div className="flex-grow">
            <Input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              className="bg-background border-input focus:ring-primary"
            />
          </div>
          <Button onClick={handleAddSkill} variant="outline" className="text-primary border-primary hover:bg-primary/10">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-sm py-1 px-3 rounded-full bg-secondary text-secondary-foreground">
                {skill}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 h-5 w-5 p-0 text-secondary-foreground hover:bg-destructive/20 hover:text-destructive rounded-full"
                  aria-label={`Remove skill ${skill}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        {skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet.</p>}
      </CardContent>
    </Card>
  );
};

export default SkillsEditor;
