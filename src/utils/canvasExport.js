import { successAlert } from './toasts.js';
import { addTemplate, updateTemplate } from '../templates/templateStore';


export const exportCanvasToHTML = (elements) => {
  const sortedElements = [...elements]?.sort((a, b) => a.y - b.y);

  let lastBottom = 0;

  const elementsHTML = sortedElements?.map((element, index) => {
    const marginTop = index === 0 ? element.y : Math.max(0, element.y - lastBottom);

    let estimatedHeight = 0;
    switch (element?.type) {
      case "text":
      case "header":
        estimatedHeight = (element?.fontSize || 12) + 16;
        break;
      case "image":
        estimatedHeight = element?.height || 150;
        break;
      case "rectangle":
        estimatedHeight = element?.height || 100;
        break;
      case "line":
        estimatedHeight = element?.lineWidth || 1;
        break;
      case "table":
        const rows = element.rows ?? 2;
        const fontSize = element.fontSize || 12;
        estimatedHeight = rows * (fontSize + 16); // +16 for padding and borders
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
            ${element.type === "header" && element.underline ? "text-decoration: underline;" : ""}
          ">
            ${element.value || element.field}
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
              tableHTML += `
          <td style="
            width:${cellWidth}px; 
            border:${borderWidth}px solid ${borderColor}; 
            padding:4px;
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
          background:${bg};
          font-size:${cellStyles.fontSize || element.fontSize || 12}px;
          font-weight:${cellStyles.fontWeight || "normal"};
          font-family:${cellStyles.fontfamily || "tahoma"};
          font-decoration:${cellStyles.textDecoration || "none"};
          font-transform:${cellStyles.textTransform || "none"};
          font-style:${cellStyles.fontStyle || "none"};
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

  return `
    <div class="canvas-container" 
      style="
        width:794px;
        min-height:1123px;
        background:white;
        margin:0 auto; 
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
        padding-bottom: 20px;
      ">
      ${elementsHTML}
    </div>
  `;
};

export const downloadHTML = (elements, filename = "template.html") => {
  const innerHtml = exportCanvasToHTML(elements);
  const finalHtml = `
  <!DOCTYPE html>
 <html>
  <head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  ${innerHtml}
</body>
</html>
  `;

  const blob = new Blob([finalHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export const saveTemplate = (templateName, elements, existingTemplateId = null) => {

  const htmlContent = exportCanvasToHTML(elements);
  const templateId = existingTemplateId || crypto.randomUUID();

  const templateData = {
    id: templateId,
    name: templateName,
    content: htmlContent,
    elements: elements
  };

  if (existingTemplateId) {
    updateTemplate(templateData);
    successAlert("Edited successfully!");
  } else {
    addTemplate(templateData);
    successAlert("Saved successfully!");
  }

  return templateId;
};