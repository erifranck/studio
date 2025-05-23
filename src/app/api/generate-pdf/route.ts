import { NextResponse } from 'next/server';
import { CVData } from '@/types/cv';
import { renderToStream } from '@react-pdf/renderer';
import React from 'react';
import { BaseTemplate } from '@/components/cv-template/default/template';

export const generatePDF = async (cvData: CVData): Promise<Uint8Array> => {
  const stream = await renderToStream(React.createElement(BaseTemplate, { cvData: cvData }));
  
  // Convert stream to Uint8Array
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    if (chunk instanceof Uint8Array) {
      chunks.push(chunk);
    }
  }
  
  // Concatenate all chunks into a single Uint8Array
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  
  return result;
};

export async function POST(request: Request) {
  try {
    const cvData: CVData = await request.json();
    
    // Generate PDF
    const pdfBuffer = await generatePDF(cvData);
    
    // Return PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cv.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 