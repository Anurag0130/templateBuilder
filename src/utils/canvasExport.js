import { addTemplate, updateTemplate } from '../templates/templateStore';
import { successAlert } from './toasts.js';

// Helper function to calculate element height
const calculateElementHeight = (element) => {
  switch (element.type) {
    case "text":
    case "header":
      return (element.fontSize || 12) * 1.5 + 16;
    case "image":
      return element.height || 150;
    case "rectangle":
      return element.height || 100;
    case "line":
      return element.lineWidth || 1;
    case "box":
      return element.height || 400;
    case "table":
      // Base height calculation
      const rows = element.rows ?? 2;
      const fontSize = element.fontSize || 12;
      let baseHeight = rows * (fontSize + 20);
      
      // If table has repeat/array data, it will expand dynamically
      // So we don't use absolute positioning for it
      return baseHeight;
    default:
      return 50;
  }
};

// Group elements into horizontal rows
const groupElementsIntoRows = (elements) => {
  const sortedElements = [...elements].sort((a, b) => a.y - b.y);
  const rows = [];
  const Y_TOLERANCE = 20; // Elements within 20px vertically are considered same row
  
  sortedElements.forEach(element => {
    let addedToRow = false;
    
    for (let row of rows) {
      const rowY = row[0].y;
      if (Math.abs(element.y - rowY) < Y_TOLERANCE) {
        row.push(element);
        addedToRow = true;
        break;
      }
    }
    
    if (!addedToRow) {
      rows.push([element]);
    }
  });
  
  // Sort elements within each row by X position
  rows.forEach(row => row.sort((a, b) => a.x - b.x));
  
  return rows;
};

export const exportCanvasToHTML = (elements, page, pageSize = null) => {
  const rows = groupElementsIntoRows(elements);
  
  const elementsHTML = rows.map((rowElements, rowIndex) => {
    const hasTable = rowElements.some(el => el.type === 'table' && el.repeat);
    const hasMultipleElements = rowElements.length > 1;
    
    // If row contains a table with repeat data OR multiple elements, use flow layout
    if (hasTable || hasMultipleElements) {
      const rowY = rowElements[0].y;
      const prevRowY = rowIndex > 0 ? rows[rowIndex - 1][0].y : 0;
      const prevRowMaxHeight = rowIndex > 0 
        ? Math.max(...rows[rowIndex - 1].map(el => calculateElementHeight(el)))
        : 0;
      
      // First row: margin-top = 0 (uses container padding-top)
      // Other rows: margin-top = gap between rows
      const marginTop = rowIndex === 0 
        ? 0 
        : Math.max(20, rowY - prevRowY - prevRowMaxHeight);
      
      const rowContent = rowElements.map(element => {
        return generateElementHTML(element, true);
      }).join('\n');
      
      return `
        <div style="
          display: flex; 
          gap: 20px; 
          margin-top: ${marginTop}px; 
          margin-left: ${rowElements[0].x}px; 
          flex-wrap: wrap;
          align-items: flex-start;
        ">
          ${rowContent}
        </div>
      `;
    } else {
      // Single element - use absolute positioning
      const element = rowElements[0];
      return generateElementHTML(element, false);
    }
  }).join('\n');
  
  const containerWidth = pageSize?.width || "210mm";
  const containerMinHeight = pageSize?.height || "297mm";
  
  // Find the first element that uses flow layout
  let firstFlowLayoutY = 0;
  for (let i = 0; i < rows.length; i++) {
    const hasTable = rows[i].some(el => el.type === 'table' && el.repeat);
    const hasMultiple = rows[i].length > 1;
    if (hasTable || hasMultiple) {
      firstFlowLayoutY = rows[i][0].y;
      break;
    }
  }

  return `
    <div class="canvas-container" 
      style="
        width:${containerWidth};
        min-height:${containerMinHeight};
        background:white;
        margin:0 auto; 
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
        position:relative;
        box-sizing:border-box;
        padding-top:${firstFlowLayoutY}px;
      ">
      ${elementsHTML} 
    </div>
  `;
};

// Generate HTML for individual element
function generateElementHTML(element, isInFlexRow = false) {
  const baseStyle = isInFlexRow 
    ? 'flex-shrink: 0;' 
    : `position: absolute; left: ${element.x}px; top: ${element.y}px;`;

  switch (element.type) {
    case "text":
    case "header":
      return `
        <div style="
          ${baseStyle}
          font-size: ${element.fontSize || 12}px;
          font-weight: ${element.fontWeight || "normal"};
          font-family: ${element.fontFamily || "Arial"};
          color: ${element.color || "#000000"};
          background-color: ${element.backgroundColor || "transparent"};
          text-align: ${element.textAlign || "left"}; 
          ${element.width ? `width: ${element.width}px;` : ""}
          padding: 4px 8px;
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.5;
          ${element.type === "header" && element.underline ? "text-decoration: underline;" : ""}
        ">${element.value || element.field}</div>
      `;

    case "image":
      return `
        <img 
          src="${element.src}" 
          style="
            ${baseStyle}
            width: ${element.width || 200}px;
            height: ${element.height || 150}px;
            object-fit: cover;
            display: block;
          " 
        />
      `;

    case "rectangle":
      return `
        <div style="
          ${baseStyle}
          width: ${element.width || 200}px;
          height: ${element.height || 100}px;
          background-color: ${element.backgroundColor || "#ffffff"};
          border: ${element.borderWidth || 1}px solid ${element.borderColor || "#000000"};
        "></div>
      `;

    case "line":
      // Line thickness can come from either lineWidth property or height (when resized)
      const lineThickness = element.lineWidth || element.height || 1;
      return `
        <div style="
          ${baseStyle}
          width: ${element.width || 200}px;
          height: ${lineThickness}px;
          background-color: ${element.color || "#000000"};
        "></div>
      `;

    case "box": {
      let shadowStyle = "";
      switch (element.shadow) {
        case 'sm':
          shadowStyle = 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);';
          break;
        case 'md':
          shadowStyle = 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);';
          break;
        case 'lg':
          shadowStyle = 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);';
          break;
        case 'xl':
          shadowStyle = 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);';
          break;
        case '2xl':
          shadowStyle = 'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);';
          break;
        default:
          shadowStyle = '';
      }

      const borderStyle = element.borderStyle === 'none' ? '' : `
        border-width: ${element.borderWidth || 1}px;
        border-style: ${element.borderStyle || 'solid'};
        border-color: ${element.borderColor || '#d1d5db'};
      `;

      return `
        <div style="
          ${baseStyle}
          width: ${element.width || 500}px;
          height: ${element.height || 400}px;
          background-color: ${element.backgroundColor || '#ffffff'};
          ${borderStyle}
          border-radius: ${element.borderRadius || 0}px;
          padding: ${element.padding || 20}px;
          ${shadowStyle}
          opacity: ${element.opacity || 1};
          box-sizing: border-box;
          overflow: hidden;
        ">
          <div style="
            width: 100%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
          ">
            ${element.children && element.children.length > 0 ? 
              '<!-- Nested elements would go here -->' : 
              '<div style="color: #9ca3af; font-size: 14px; font-style: italic; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Container</div>'
            }
          </div>
        </div>
      `;
    }

    case "table": {
      const width = element.width || 400;
      const borderColor = element.borderColor || "#000000";
      const borderWidth = element.borderWidth ?? 1;

      let numCols;
      let colKeys = null;
      if (Array.isArray(element.cols)) {
        colKeys = element.cols;
        numCols = element.cols.length;
      } else if (typeof element.cols === "number") {
        numCols = element.cols;
      } else {
        numCols = 2;
      }

      const rows = element.rows ?? 2;
      const cellWidth = Math.round(width / numCols);

      let tableHTML = `<div style="${baseStyle}">
        <table style="border-collapse: collapse; width: ${width}px; border-color: ${borderColor};">
      `;
      tableHTML += "<tbody>";

      const repeat = element.repeat;
      const repeatStartIndex = repeat ? ((Number(repeat.startRow) || 1) - 1) : null;

      for (let r = 0; r < rows; r++) {
        if (repeat && r === repeatStartIndex) {
          tableHTML += `{{#each ${repeat.arrayPath}}}\n<tr>`;
          for (let c = 0; c < numCols; c++) {
            const colKey =
              Array.isArray(repeat.cols) && repeat.cols[c]
                ? repeat.cols[c]
                : Array.isArray(colKeys) && colKeys[c]
                  ? colKeys[c]
                  : `col${c + 1}`;

            const key = `${r}-${c}`;
            const cellStyles = element.cellStyles?.[key] || {};

            tableHTML += `
              <td style="
                width:${cellWidth}px; 
                border:${borderWidth}px solid ${borderColor}; 
                padding:4px;
                background:${cellStyles.backgroundColor || element.backgroundColor || "#ffffff"};
                font-size:${cellStyles.fontSize || element.fontSize || 12}px;
                font-weight:${cellStyles.fontWeight || "normal"};
                font-family:${cellStyles.fontFamily || "Tahoma"};
                text-decoration:${cellStyles.textDecoration || "none"};
                text-transform:${cellStyles.textTransform || "none"};
                font-style:${cellStyles.fontStyle || "normal"};
                color:${cellStyles.color || "#000000"};
                text-align:${cellStyles.textAlign || "left"};
              ">
                {{${colKey}}}
              </td>`;
          }
          tableHTML += `</tr>\n{{/each}}`;
          continue;
        }

        tableHTML += "<tr>";
        for (let c = 0; c < numCols; c++) {
          const key = `${r}-${c}`;
          const cellContent = element.cellData?.[key] ?? `Cell ${r + 1},${c + 1}`;
          const cellStyles = element.cellStyles?.[key] || {};

          tableHTML += `
            <td style="
              width:${cellWidth}px;
              border:${borderWidth}px solid ${borderColor};
              padding:4px;
              background:${cellStyles.backgroundColor || element.backgroundColor || "#ffffff"};
              font-size:${cellStyles.fontSize || element.fontSize || 12}px;
              font-weight:${cellStyles.fontWeight || "normal"};
              font-family:${cellStyles.fontFamily || "Tahoma"};
              text-decoration:${cellStyles.textDecoration || "none"};
              text-transform:${cellStyles.textTransform || "none"};
              font-style:${cellStyles.fontStyle || "normal"};
              color:${cellStyles.color || "#000000"};
              text-align:${cellStyles.textAlign || "left"};
            ">
              ${cellContent}
            </td>
          `;
        }
        tableHTML += "</tr>";
      }

      tableHTML += "</tbody></table></div>";
      return tableHTML;
    }

    default:
      return "";
  }
}


export const exportAllPagesToHTML = (pages, pageSize = null) => {
  const pageWidth = pageSize?.width || '210mm';
  const pageHeight = pageSize?.height || '297mm';

  const allPagesHTML = pages?.map((page) => {
    const pageContent = exportCanvasToHTML(page?.elements, page, pageSize);
    return pageContent;
  })?.join('\n<div style="page-break-after: always;"></div>\n');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { 
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body { 
      margin: 0; 
      padding: 20px; 
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }
    
    @page {
      size: ${pageWidth} ${pageHeight};
      margin: 0;
    }
    
    .canvas-container {
      margin-bottom: 20px;
    }
    
    @media print {
      body { 
        padding: 0;
        background: white;
      }
      
      .canvas-container { 
        page-break-after: always; 
        margin: 0 !important; 
        box-shadow: none !important;
        width: ${pageWidth} !important;
        min-height: ${pageHeight} !important;
      }
      
      .canvas-container:last-child {
        page-break-after: auto;
      }
    }
  </style>
</head>
<body>
  ${allPagesHTML}
</body>
</html>
  `;
};


export const downloadAllPagesHTML = (pages, filename = "template-multipage.html", pageSize = null) => {
  const finalHtml = exportAllPagesToHTML(pages, pageSize);

  const blob = new Blob([finalHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};


export const saveMultiPageTemplate = async (templateName, pages, existingTemplateId = null, pageSize = null) => {
  const htmlContent = exportAllPagesToHTML(pages, pageSize);
  const templateId = existingTemplateId || crypto.randomUUID();

  const templateData = {
    id: templateId,
    name: templateName,
    content: htmlContent,
    pages: pages,
    pageSize: pageSize
  };

  if (existingTemplateId) {
    updateTemplate(templateData);
    successAlert("Edited successfully!");
  } else {
    addTemplate(templateData);
  }

  successAlert("Saved successfully!");
  return templateId;
};