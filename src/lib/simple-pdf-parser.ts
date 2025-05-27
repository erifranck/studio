/**
 * Simple PDF text extraction for browser
 * This is a basic implementation that extracts readable text from PDFs
 */

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  
  // Convert bytes to string
  let pdfContent = '';
  const decoder = new TextDecoder('utf-8', { fatal: false });
  
  // Try to decode chunks of the PDF
  const chunkSize = 1024 * 1024; // 1MB chunks
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, Math.min(i + chunkSize, bytes.length));
    pdfContent += decoder.decode(chunk, { stream: i + chunkSize < bytes.length });
  }
  
  // Extract text patterns from PDF content
  const textPatterns = [
    /\(([\s\S]*?)\)/g, // Text in parentheses (common in PDFs)
    /BT\s*([\s\S]*?)\s*ET/g, // Text between BT and ET markers
  ];
  
  let extractedText = '';
  
  // Extract text using patterns
  textPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(pdfContent)) !== null) {
      if (match[1]) {
        // Clean up the text
        let text = match[1]
          .replace(/\\([0-9]{3})/g, (m, oct) => String.fromCharCode(parseInt(oct, 8))) // Octal codes
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\\(/g, '(')
          .replace(/\\\)/g, ')')
          .replace(/\\\\/g, '\\')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (text && !text.match(/^[\x00-\x1F]+$/)) { // Filter out control characters
          extractedText += text + ' ';
        }
      }
    }
  });
  
  // If no text was extracted using patterns, try a simpler approach
  if (!extractedText.trim()) {
    // Look for readable ASCII/UTF-8 sequences
    const readableChunks = pdfContent.match(/[\x20-\x7E\u00A0-\uFFFF]{4,}/g) || [];
    extractedText = readableChunks
      .filter(chunk => !chunk.match(/^[0-9\s]+$/) && chunk.length > 10)
      .join(' ');
  }
  
  // Clean up and format the extracted text
  extractedText = extractedText
    .replace(/\s+/g, ' ')
    .replace(/(\w)([A-Z])/g, '$1 $2') // Add space between camelCase words
    .trim();
  
  // Check if the extracted text looks like garbage (too many special characters)
  const specialCharCount = (extractedText.match(/[^\x20-\x7E\u00A0-\uFFFF]/g) || []).length;
  const totalCharCount = extractedText.length;
  const specialCharRatio = totalCharCount > 0 ? specialCharCount / totalCharCount : 1;
  
  if (specialCharRatio > 0.3 || extractedText.length < 50) {
    return 'No se pudo extraer texto del PDF. El archivo parece estar codificado o comprimido. Por favor, intenta con un archivo de texto (.txt) o copia y pega el contenido de tu CV directamente en el editor.';
  }
  
  return extractedText;
} 