import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CvDocument } from '@/lib/pdf-generator';
import { pdf } from '@react-pdf/renderer';
import { type CVData } from '@/types/cv';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cvData: CVData;
}

export function PDFPreviewModal({ isOpen, onOpenChange, cvData }: PDFPreviewModalProps) {
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      pdf(<CvDocument cvData={cvData} />)
        .toBlob()
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          return url;
        });
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isOpen, cvData]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <div className="w-full h-full">
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="PDF Preview"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 