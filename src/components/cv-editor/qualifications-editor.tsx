"use client";
import type React from 'react';
import { type QualificationEntry, type SetCvDataFn } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Award, PlusCircle, Trash2 } from 'lucide-react';

interface QualificationsEditorProps {
  qualifications: QualificationEntry[];
  setCvData: SetCvDataFn;
}

const QualificationsEditor: React.FC<QualificationsEditorProps> = ({ qualifications, setCvData }) => {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData(prev => {
      const newQualifications = [...prev.qualifications];
      newQualifications[index] = { ...newQualifications[index], [name]: value };
      return { ...prev, qualifications: newQualifications };
    });
  };

  const handleAddItem = () => {
    setCvData(prev => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        {
          id: `qual${Date.now()}`,
          date: '',
          name: '',
          issuer: '',
        },
      ],
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCvData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(item => item.id !== id),
    }));
  };
  
  const fields: Array<{ key: keyof QualificationEntry; label: string }> = [
    { key: 'date', label: 'Date' },
    { key: 'name', label: 'Qualification Name' },
    { key: 'issuer', label: 'Issuing Body (Optional)' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Qualifications</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleAddItem}>
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {qualifications.map((qual, index) => (
          <div key={qual.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                {fields.map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={`${qual.id}-${key}`}>{label}</Label>
                    <Input
                      id={`${qual.id}-${key}`}
                      name={key}
                      value={qual[key] || ''}
                      onChange={(e) => handleChange(index, e)}
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => handleRemoveItem(qual.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {qualifications.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            <Award className="h-8 w-8 mx-auto mb-2" />
            <p>No qualifications added yet</p>
            <p className="text-sm">Click the + button to add a qualification</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QualificationsEditor; 