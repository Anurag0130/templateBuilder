import { addTemplate, updateTemplate } from '../templates/templateStore';
import { successAlert } from './toasts.js';


export const exportCanvasToHTML = (elements, page, pageSize = null) => {
  const sortedElements = [...elements].sort((a, b) => a.y - b.y);

  let lastBottom = 0;

  const elementsHTML = sortedElements.map((element, index) => {
    const marginTop = index === 0 ? element.y : Math.max(0, element.y - lastBottom);

    let estimatedHeight = 0;
    switch (element.type) {
      case "text":
      case "header":
        estimatedHeight = (element.fontSize || 12) + 16;
        break;
      case "image":
        estimatedHeight = element.height || 150;
        break;
      case "rectangle":
        estimatedHeight = element.height || 100;
        break;
      case "line":
        estimatedHeight = element.lineWidth || 1;
        break;
      case "table":
        const rows = element.rows ?? 2;
        const fontSize = element.fontSize || 12;
        estimatedHeight = rows * (fontSize + 16);
        break;
      default:
        estimatedHeight = 0;
    }

    lastBottom = element.y + estimatedHeight;

    const baseStyle = `
      margin-top: ${marginTop}px;
      margin-left: ${element.x}px;
    `;

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
                   ">${element.value || element.field}
                  </div>
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
        return `
          <div style="
            ${baseStyle}
            width: ${element.width || 200}px;
            height: ${element.lineWidth || 1}px;
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
              <!-- Box content area -->
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

              // Get cell styles for the repeat row
              const key = `${r}-${c}`;
              const cellStyles = element.cellStyles?.[key] || {};

              const bg =
                cellStyles.backgroundColor ||
                (r === 0 && element.headerRow ? "#f3f4f6" : "transparent");

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

            const bg =
              cellStyles.backgroundColor ||
              (r === 0 && element.headerRow ? "#f3f4f6" : "transparent");

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
  })?.join("\n");

  // Use pageSize if provided, otherwise default to A4 portrait
  const containerWidth = pageSize?.width || "210mm";
  const containerMinHeight = pageSize?.height || "297mm";

  return `
    <div class="canvas-container" 
      style="
        width:${containerWidth};
        min-height:${containerMinHeight};
        background:white;
        margin:0 auto; 
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
        
        box-sizing:border-box;
      ">
      ${elementsHTML} 
    </div>
  `;
};


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
    // await updateTemplateAPI(templateData);
    successAlert("Edited successfully!");
  }

  else {
    addTemplate(templateData);

    // const response = await saveTemplateAPI(templateData);
    // console.log("Saving Payload:", templateData);

    // if (response.status === 200) {
    //   successAlert("Saved successfully!");
    // } else {
    //   throw new Error("Error saving the template");
    // }
  }


  successAlert("Saved successfully!");
  return templateId;
};