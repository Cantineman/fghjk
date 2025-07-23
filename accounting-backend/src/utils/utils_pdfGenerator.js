const pdf = require('html-pdf');

function generatePdf(htmlContent, callback) {
  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) return callback(err);
    callback(null, buffer);
  });
}

// Example usage: generatePdf('<h1>Invoice</h1>', (err, buffer) => { ... });

module.exports = generatePdf;