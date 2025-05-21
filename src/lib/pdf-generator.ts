
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
      scale: 2, // Increase scale for better quality
      useCORS: true,
      logging: false,
      windowWidth: input.scrollWidth, // Capture based on content width
      windowHeight: input.scrollHeight, // Capture full content height
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    
    // Get properties of the generated canvas image
    const canvasProps = pdf.getImageProperties(imgData);
    const canvasWidth = canvasProps.width;
    const canvasHeight = canvasProps.height;

    // Calculate how tall the canvas content would be in the PDF if scaled to fit the PDF width
    const scaleFactor = pdfPageWidth / canvasWidth;
    const totalPdfHeightOfContent = canvasHeight * scaleFactor;

    if (totalPdfHeightOfContent <= pdfPageHeight) {
      // Content fits on a single PDF page
      // Calculate ratio to fit the entire image (maintaining aspect ratio) within one PDF page
      const ratio = Math.min(pdfPageWidth / canvasWidth, pdfPageHeight / canvasHeight);
      const effectiveImgWidth = canvasWidth * ratio;
      const effectiveImgHeight = canvasHeight * ratio;
      
      // Center the image on the PDF page
      const xOffset = (pdfPageWidth - effectiveImgWidth) / 2;
      const yOffset = (pdfPageHeight - effectiveImgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, effectiveImgWidth, effectiveImgHeight);
    } else {
      // Content needs to be split across multiple pages
      const numPages = Math.ceil(totalPdfHeightOfContent / pdfPageHeight);
      let canvasCutY = 0; // The Y-coordinate in the source canvas from where to start slicing

      for (let i = 0; i < numPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        // Calculate the height of the slice to take from the source canvas for this PDF page
        // This is equivalent to one PDF page height, converted back to canvas pixel dimensions
        let sliceCanvasHeight = pdfPageHeight / scaleFactor; 
        
        // Adjust slice height for the last page if it's shorter than a full PDF page
        if (canvasCutY + sliceCanvasHeight > canvasHeight) {
          sliceCanvasHeight = canvasHeight - canvasCutY;
        }

        // If somehow slice height is zero or negative, stop
        if (sliceCanvasHeight <= 0) {
          break; 
        }

        // Create a temporary canvas for the current page's slice
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceCanvasHeight;
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          // Draw the appropriate slice from the large source canvas to the temporary pageCanvas
          pageCtx.drawImage(
            canvas,         // Source image (the full CV canvas)
            0,              // Source X
            canvasCutY,     // Source Y (where to start slicing from the large canvas)
            canvasWidth,    // Source Width (full width of the large canvas)
            sliceCanvasHeight, // Source Height (height of the slice)
            0,              // Destination X on pageCanvas
            0,              // Destination Y on pageCanvas
            canvasWidth,    // Destination Width on pageCanvas
            sliceCanvasHeight  // Destination Height on pageCanvas
          );
          const pageImgData = pageCanvas.toDataURL('image/png');
          
          // Add this slice (which is now one page of content) to the PDF
          // The width will be pdfPageWidth, and height will be sliceCanvasHeight scaled,
          // which should be pdfPageHeight (or less for the last page).
          const destHeightOnPdf = sliceCanvasHeight * scaleFactor;
          pdf.addImage(pageImgData, 'PNG', 0, 0, pdfPageWidth, destHeightOnPdf);
        }
        
        // Move the Y-coordinate for the next slice
        canvasCutY += sliceCanvasHeight;
      }
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please try again.");
  }
};
