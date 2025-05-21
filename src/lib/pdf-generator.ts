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
    // Temporarily increase scale for better resolution
    const canvas = await html2canvas(input, {
      scale: 2, // Increase scale for better quality
      useCORS: true, // If you have external images
      logging: false, // Disable logging to console for cleaner output
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in points (pt): 595.28pt x 841.89pt
    // 1 inch = 72 points
    // 1 inch = 25.4 mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    // Calculate aspect ratio to fit image within PDF page
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    const newImgWidth = imgWidth * ratio;
    const newImgHeight = imgHeight * ratio;

    // Center the image on the PDF page (optional)
    const xOffset = (pdfWidth - newImgWidth) / 2;
    const yOffset = (pdfHeight - newImgHeight) / 2 > 0 ? (pdfHeight - newImgHeight) / 2 : 0;


    // If content is taller than one page, split it
    const pageHeightPt = pdf.internal.pageSize.getHeight();
    let currentPosition = 0;
    const totalImageHeightInPdfUnits = imgHeight * (pdfWidth / imgWidth); // image height scaled to pdf width

    if (totalImageHeightInPdfUnits <= pageHeightPt) {
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, newImgWidth, newImgHeight);
    } else {
        let numPages = Math.ceil(totalImageHeightInPdfUnits / pageHeightPt);
        for (let i = 0; i < numPages; i++) {
            if (i > 0) pdf.addPage();
            // Calculate source y, height for the current page slice on the canvas
            const sourceY = (i * pageHeightPt) / (pdfWidth / imgWidth) / ratio; // map PDF page height back to canvas pixels
            const sourceHeight = pageHeightPt / (pdfWidth / imgWidth) / ratio;

            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = imgWidth;
            pageCanvas.height = sourceHeight;
            const pageCtx = pageCanvas.getContext('2d');
            
            if (pageCtx) {
                pageCtx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
                const pageImgData = pageCanvas.toDataURL('image/png');
                pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pageHeightPt); // Stretch to fit page width, maintain aspect for height
            }
        }
    }


    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please try again.");
  }
};
