import React from 'react';

// Add this utility function to convert your canvas elements to HTML
export const exportCanvasToHTML = (elements: any[]) => {
  // Generate HTML for each element
  const elementsHTML = elements.map(element => {
    const style = `position: absolute; left: ${element.x}px; top: ${element.y}px;`;

    switch (element.type) {
      case 'text':
      case 'header':
        return `<div style="${style} font-size: ${element.fontSize || 12}px; font-weight: ${element.fontWeight || 'normal'}; font-family: ${element.fontFamily || 'Arial'}; color: ${element.color || '#000000'}; background-color: ${element.backgroundColor || 'transparent'}; text-align: ${element.textAlign || 'left'}; ${element.width ? `width: ${element.width}px;` : ''} padding: 4px 8px; ${element.type === 'header' && element.underline ? 'text-decoration: underline;' : ''}">${element.value || element.field}</div>`;

      case 'image':
        return `<img src="${element.src}" alt="${element.alt || 'Image'}" style="${style} width: ${element.width || 200}px; height: ${element.height || 150}px; object-fit: cover; display: block;" />`;

      case 'rectangle':
        return `<div style="${style} width: ${element.width || 200}px; height: ${element.height || 100}px; background-color: ${element.backgroundColor || '#ffffff'}; border: ${element.borderWidth || 1}px solid ${element.borderColor || '#d1d5db'};"></div>`;

      case 'line':
        return `<div style="${style} width: ${element.width || 200}px; height: ${element.lineWidth || 1}px; background-color: ${element.color || '#000000'};"></div>`;

      case 'table':
        const cellWidth = (element.width || 400) / (element.cols || 2);
        const cellHeight = (element.height || 100) / (element.rows || 2);

        let tableHTML = `<div style="${style}"><table style="border-collapse: collapse; width: ${element.width || 400}px; border-color: ${element.borderColor || '#000000'};">`;
        tableHTML += '<tbody>';

        for (let rowIdx = 0; rowIdx < (element.rows || 2); rowIdx++) {
          tableHTML += '<tr>';
          for (let colIdx = 0; colIdx < (element.cols || 2); colIdx++) {
            const cellKey = `${rowIdx}-${colIdx}`;
            const cellContent = element.cellData?.[cellKey] || `Cell ${rowIdx + 1},${colIdx + 1}`;
            const isHeader = rowIdx === 0 && element.headerRow;

            tableHTML += `<td style="width: ${cellWidth}px; height: ${cellHeight}px; border: ${element.borderWidth || 1}px solid ${element.borderColor || '#000000'}; background-color: ${isHeader ? '#f3f4f6' : 'transparent'}; font-weight: ${isHeader ? 'bold' : 'normal'}; padding: 4px;">${cellContent}</td>`;
          }
          tableHTML += '</tr>';
        }

        tableHTML += '</tbody></table></div>';
        return tableHTML;

      default:
        return '';
    }
  }).join('\n    ');

  // Create complete HTML document
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Export</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }
        .canvas-container {
            width: 794px;
            height: 1123px;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            position: relative;
        }
    </style>
</head>
<body>
    <div class="canvas-container">
    ${elementsHTML}
    </div>
</body>
</html>`;

  return htmlContent;
};

// Function to trigger download
export const downloadHTML = (elements: any[], filename: string = 'canvas-export.html') => {
  const htmlContent = exportCanvasToHTML(elements);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const saveTemplate = (templateName, templateHtml) => {
  if (!templateName.trim()) {
    alert("Template name is required");
    return;
  }

  let templates = JSON.parse(localStorage.getItem("customTemplates")) || [];
  const htmlContent = exportCanvasToHTML(templateHtml);

  templates.push({
    id: Date.now(),
    name: templateName,
    html: htmlContent
  });

  localStorage.setItem("customTemplates", JSON.stringify(templates));

  alert("Template saved successfully!");
};


