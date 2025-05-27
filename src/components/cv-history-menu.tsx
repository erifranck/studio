import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type CVData } from '@/types/cv';

interface CVHistoryMenuProps {
  onLoadCV: (cvData: CVData) => void;
}

export function CVHistoryMenu({ onLoadCV }: CVHistoryMenuProps) {
  const [savedCVs, setSavedCVs] = React.useState<Array<{ id: string; name: string; date: string; data: CVData }>>([]);

  React.useEffect(() => {
    // Load saved CVs from localStorage
    const loadSavedCVs = () => {
      const savedCVsData = localStorage.getItem('cvForgeSavedCVs');
      if (savedCVsData) {
        setSavedCVs(JSON.parse(savedCVsData));
      }
    };

    loadSavedCVs();
    // Add event listener for storage changes
    window.addEventListener('storage', loadSavedCVs);
    return () => window.removeEventListener('storage', loadSavedCVs);
  }, []);

  const handleLoadCV = (cvData: CVData) => {
    onLoadCV(cvData);
  };

  const handleDeleteCV = (id: string) => {
    const updatedCVs = savedCVs.filter(cv => cv.id !== id);
    setSavedCVs(updatedCVs);
    localStorage.setItem('cvForgeSavedCVs', JSON.stringify(updatedCVs));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <History className="mr-2 h-4 w-4" /> Saved CVs
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Saved CVs</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {savedCVs.length === 0 ? (
              <p className="text-muted-foreground text-center">No saved CVs found</p>
            ) : (
              savedCVs.map((cv) => (
                <div key={cv.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{cv.name}</h3>
                      <p className="text-sm text-muted-foreground">{cv.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoadCV(cv.data)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCV(cv.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
} 