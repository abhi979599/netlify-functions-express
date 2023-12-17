const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const jpg = async (files) => {
  try {
    console.log("Merging PDFs...");
    console.log("File paths:", files);

    const timestamp = new Date().getTime();
    const filePath = path.join(__dirname, 'public', `${timestamp}.pdf`);

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(filePath));

    const width = 500;
    const height = 500;

    for (const [index, file] of files.entries()) {
      const imagePath = path.join(__dirname, file.path.replace(/\\/g, '/'));

      const left = 50;
      const top = 50;

      pdfDoc.image(imagePath, left, top, { width: width, height: height });

      if (index < files.length - 1) {
        pdfDoc.addPage();
      }
      
    }

    pdfDoc.end();

    console.log("PDFs merged successfully!");

    return filePath;
  } catch (error) {
    console.error(`PDF merging failed: ${error}`);
    throw new Error(`PDF merging failed: ${error.message}`);
  }
};


module.exports = { jpg };
