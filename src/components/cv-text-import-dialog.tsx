'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { extractCvFromFile } from '@/ai/flows/extract-cv-from-file';
import { type CVData } from '@/types/cv';
import { useToast } from '@/hooks/use-toast';

interface CVTextImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCvExtracted: (cvData: CVData) => void;
}

export function CVTextImportDialog({
  isOpen,
  onOpenChange,
  onCvExtracted,
}: CVTextImportDialogProps) {
  const [cvText, setCvText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!cvText.trim() || cvText.length < 50) {
      toast({
        title: 'Texto insuficiente',
        description: 'Por favor, pega el contenido completo de tu CV.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const result = await extractCvFromFile({
        fileContent: cvText,
        fileName: 'CV-Text-Import',
      });

      onCvExtracted(result.cvData);
      onOpenChange(false);
      setCvText('');

      toast({
        title: 'CV importado exitosamente',
        description: 'Tu CV ha sido procesado y cargado en el editor.',
      });
    } catch (error) {
      console.error('Error processing CV text:', error);
      toast({
        title: 'Error al procesar el CV',
        description: 'Hubo un error al procesar tu CV. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar CV desde texto</DialogTitle>
          <DialogDescription>
            Copia y pega el contenido de tu CV aquí. La IA extraerá la información y la organizará automáticamente.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <Textarea
            placeholder="Pega aquí el contenido de tu CV..."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleProcess} 
            disabled={isProcessing || !cvText.trim()}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Procesar CV'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 