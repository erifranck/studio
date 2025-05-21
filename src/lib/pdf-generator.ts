
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPdf = async (elementId: string, fileName: string = 'cv.pdf'): Promise<void> => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id "${elementId}" not found.`);
    alert(`Error: Could not find element to print. Please ensure the CV preview is visible.`);
    return;
  }

  try {
    const canvas = await html2canvas(input, {
      scale: 2.5, // Increased scale for better clarity
      useCORS: true,
      logging: false,
      // Ensure canvas captures based on actual content size rather than just viewport-constrained size
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    
    const margin = 30; // Define page margin (in points)
    const contentWidth = pdfPageWidth - (2 * margin);
    const contentHeight = pdfPageHeight - (2 * margin);
    
    const canvasProps = pdf.getImageProperties(imgData);
    const canvasWidth = canvasProps.width;
    const canvasHeight = canvasProps.height;

    // Calculate scaling factor to fit content within margins
    const scaleFactor = contentWidth / canvasWidth;
    const totalPdfHeightOfContent = canvasHeight * scaleFactor;

    if (totalPdfHeightOfContent <= contentHeight) {
      // Content fits on a single PDF page (within margins)
      const effectiveImgHeight = totalPdfHeightOfContent; // canvasHeight * scaleFactor
      const effectiveImgWidth = contentWidth; // canvasWidth * scaleFactor;
      
      // Center the image within the content area (margins accounted for)
      const xOffset = margin + (contentWidth - effectiveImgWidth) / 2; // Should be just margin if effectiveImgWidth is contentWidth
      const yOffset = margin + (contentHeight - effectiveImgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, effectiveImgWidth, effectiveImgHeight);
    } else {
      // Content needs to be split across multiple pages
      // The height of the canvas slice that corresponds to one PDF page's content area
      const sourcePageHeightInCanvasPixels = contentHeight / scaleFactor;
      let canvasCutY = 0; // The Y-coordinate in the source canvas from where to start slicing

      let pageNumber = 0;
      while (canvasCutY < canvasHeight) {
        if (pageNumber > 0) {
          pdf.addPage();
        }
        pageNumber++;

        let sliceCanvasHeight = sourcePageHeightInCanvasPixels;
        
        // Adjust slice height for the last part of the canvas
        if (canvasCutY + sliceCanvasHeight > canvasHeight) {
          sliceCanvasHeight = canvasHeight - canvasCutY;
        }

        if (sliceCanvasHeight <= 0) break;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceCanvasHeight;
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCtx.drawImage(
            canvas,              // Source image (the full CV canvas)
            0,                   // Source X
            canvasCutY,          // Source Y (where to start slicing from the large canvas)
            canvasWidth,         // Source Width (full width of the large canvas)
            sliceCanvasHeight,   // Source Height (height of the slice)
            0,                   // Destination X on pageCanvas
            0,                   // Destination Y on pageCanvas
            canvasWidth,         // Destination Width on pageCanvas
            sliceCanvasHeight    // Destination Height on pageCanvas
          );
          const pageImgData = pageCanvas.toDataURL('image/png');
          
          // Add this slice to the PDF, fitting it to contentWidth and scaled height
          const destHeightOnPdf = sliceCanvasHeight * scaleFactor;
          pdf.addImage(pageImgData, 'PNG', margin, margin, contentWidth, destHeightOnPdf);
        }
        
        canvasCutY += sliceCanvasHeight;
         if (pageNumber > 20) { // Safety break for very long content
            console.warn("PDF generation stopped after 20 pages to prevent infinite loop.");
            break;
        }
      }
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please try again.");
  }
};
