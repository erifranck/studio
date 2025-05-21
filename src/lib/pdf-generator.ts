
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
    const contentAreaWidth = pdfPageWidth - (2 * margin); // Renamed for clarity
    const contentAreaHeight = pdfPageHeight - (2 * margin); // Renamed for clarity
    
    const canvasProps = pdf.getImageProperties(imgData);
    const canvasWidth = canvasProps.width;
    const canvasHeight = canvasProps.height;

    const scaleFactor = contentAreaWidth / canvasWidth;
    const totalPdfHeightOfContent = canvasHeight * scaleFactor;

    if (totalPdfHeightOfContent <= contentAreaHeight) {
      // Content fits on a single PDF page (within margins)
      const effectiveImgHeight = totalPdfHeightOfContent;
      const effectiveImgWidth = contentAreaWidth;
      
      const xOffset = margin;
      const yOffset = margin + (contentAreaHeight - effectiveImgHeight) / 2; // Center vertically if space allows
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, effectiveImgWidth, effectiveImgHeight);
    } else {
      // Content needs to be split across multiple pages
      const pageSliceBuffer = 10; // 10pt buffer at the bottom of the printable area to avoid cutting lines
      const effectiveContentHeightForSlicing = contentAreaHeight - pageSliceBuffer;

      // The height of the canvas slice that corresponds to one PDF page's effective content area
      const sourcePageHeightInCanvasPixels = effectiveContentHeightForSlicing / scaleFactor;
      let canvasCutY = 0; 

      let pageNumber = 0;
      while (canvasCutY < canvasHeight) {
        if (pageNumber > 0) {
          pdf.addPage();
        }
        pageNumber++;

        let sliceCanvasHeight = sourcePageHeightInCanvasPixels;
        
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
            canvas,             
            0,                  
            canvasCutY,         
            canvasWidth,        
            sliceCanvasHeight,  
            0,                  
            0,                  
            canvasWidth,        
            sliceCanvasHeight   
          );
          const pageImgData = pageCanvas.toDataURL('image/png');
          
          const destHeightOnPdf = sliceCanvasHeight * scaleFactor;
          pdf.addImage(pageImgData, 'PNG', margin, margin, contentAreaWidth, destHeightOnPdf);
        }
        
        canvasCutY += sliceCanvasHeight;
         if (pageNumber > 20) { 
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

