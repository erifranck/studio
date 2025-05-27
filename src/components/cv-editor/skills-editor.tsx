// src/components/cv-editor/skills-editor.tsx
"use client";
import type React from 'react';
import { useState } from 'react';
import { type SetCvDataFn } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, PlusCircle, X, Sparkles, Loader2 } from 'lucide-react';
import { suggestSkillsWithAI } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface SkillsEditorProps {
  skills: string[];
  setCvData: SetCvDataFn;
}

const commonRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Mobile Developer",
  "UI/UX Designer",
  "Product Manager",
  "Project Manager",
  "Software Architect",
  "QA Engineer",
  "Security Engineer",
  "Cloud Engineer",
  "Blockchain Developer"
];

const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, setCvData }) => {
  const [newSkill, setNewSkill] = useState('');
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const { toast } = useToast();

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

  const handleSuggestSkills = async () => {
    setIsSuggestingSkills(true);
    try {
      const result = await suggestSkillsWithAI({
        role: selectedRole,
        existingSkills: skills,
        prompt: customPrompt,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setSuggestedSkills(result.suggestedSkills);
        toast({
          title: "Skills Suggested",
          description: "Review the suggested skills below.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get skill suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  const handleAddSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setCvData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      setSuggestedSkills(prev => prev.filter(s => s !== skill));
    }
  };

  const handleApplySkills = () => {
    const newSkills = suggestedSkills.filter(skill => !skills.includes(skill));
    if (newSkills.length > 0) {
      setCvData(prev => ({ ...prev, skills: [...prev.skills, ...newSkills] }));
      setSuggestedSkills([]);
      toast({
        title: "Skills Added",
        description: `Added ${newSkills.length} new skills to your profile.`,
      });
    }
    setIsDialogOpen(false);
  };

  const handleReplaceSkills = () => {
    setCvData(prev => ({ ...prev, skills: suggestedSkills }));
    setSuggestedSkills([]);
    setIsDialogOpen(false);
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
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            variant="outline" 
            className="text-primary border-primary hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4" />
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" /> AI Skill Suggestions
            </DialogTitle>
            <DialogDescription>
              Get AI-powered skill suggestions based on your target role or existing skills.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role (Optional)</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {commonRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Prompt (Optional)</label>
              <Input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="E.g., Suggest skills for a senior developer role"
              />
            </div>

            <Button
              onClick={handleSuggestSkills}
              disabled={isSuggestingSkills}
              className="w-full"
            >
              {isSuggestingSkills ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Skill Suggestions
                </>
              )}
            </Button>

            {suggestedSkills.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map(skill => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => handleAddSuggestedSkill(skill)}
                    >
                      {skill}
                      <PlusCircle className="ml-2 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={handleApplySkills}>
              Apply Skills
            </Button>
            <Button variant="outline" onClick={handleReplaceSkills}> 
              Replace Skills
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SkillsEditor;
