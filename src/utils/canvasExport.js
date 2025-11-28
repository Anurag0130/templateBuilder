import { addTemplate } from '../templates/templateStore';



export const exportCanvasToHTML = (elements) => {
  const elementsHTML = elements.map(element => {
    const style = `position: absolute; left: ${element.x}px; top: ${element.y}px;`;

    switch (element.type) {
      case "text":
      case "header":
        return `
          <div style="
            ${style}
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
              ${style}
              width: ${element.width || 200}px;
              height: ${element.height || 150}px;
              object-fit: cover;
            " 
          />
        `;

      case "rectangle":
        return `
          <div style="
            ${style}
            width: ${element.width || 200}px;
            height: ${element.height || 100}px;
            background-color: ${element.backgroundColor || "#ffffff"};
            border: ${element.borderWidth || 1}px solid ${element.borderColor || "#000000"};
          "></div>
        `;

      case "line":
        return `
          <div style="
            ${style}
            width: ${element.width || 200}px;
            height: ${element.lineWidth || 1}px;
            background-color: ${element.color || "#000000"};
          "></div>
        `;


      // inside exportCanvasToHTML -> in switch(element.type) case 'table':
      case "table": {
        const width = element.width || 400;
        const borderColor = element.borderColor || "#000000";
        const borderWidth = element.borderWidth ?? 1;
        const cols = element.cols || 2;
        const rows = element.rows || 2;
        const cellWidth = Math.round(width / cols);

        let tableHTML = `<div style="${style}"><table style="border-collapse: collapse; width: ${width}px; border-color: ${borderColor};">`;
        tableHTML += "<tbody>";

        const repeat = element.repeat; // { arrayPath, startRow, cols: ["school","year","grade"] }

        for (let r = 0; r < rows; r++) {
          // If this is the configured repeat row, emit a Handlebars each block
          if (repeat && r === (repeat.startRow ?? 1)) {
            tableHTML += `{{#each ${repeat.arrayPath}}}\n  <tr>`;
            for (let c = 0; c < cols; c++) {
              const colKey = repeat.cols && repeat.cols[c] ? repeat.cols[c] : `col${c}`;
              tableHTML += `<td style="width:${cellWidth}px; border:${borderWidth}px solid ${borderColor}; padding:4px;">{{${colKey}}}</td>`;
            }
            tableHTML += `</tr>\n{{/each}}`;
            continue;
          }

          tableHTML += "<tr>";
          for (let c = 0; c < cols; c++) {
            const key = `${r}-${c}`;
            // NOTE: cellContent may contain Handlebars tokens (e.g., "{{school}}") — preserve as-is
            const cellContent = element.cellData?.[key] ?? `Cell ${r + 1},${c + 1}`;
            tableHTML += `<td style="width:${cellWidth}px; border:${borderWidth}px solid ${borderColor}; padding:4px;">${cellContent}</td>`;
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

  // return elementsHTML; 
  return `
    <div class="canvas-container" 
      style="
        width:794px;
        height:1123px;
        background:white;
        position:relative;
        margin:0 auto; 
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
      ">
      ${elementsHTML}
    </div>
  `;
};

export const downloadHTML = (elements, filename = "template.html") => {
  const innerHtml = exportCanvasToHTML(elements);
  const finalHtml = `
    <div class="canvas-container">
        ${innerHtml}
    </div>
  `;

  const blob = new Blob([finalHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};


export const saveTemplate = (templateName, elements) => {
  const htmlContent = exportCanvasToHTML(elements);
  const newTemplate = {
    id: crypto.randomUUID(),
    name: templateName,
    content: htmlContent
  };
  console.log('newTemplate', htmlContent)
  addTemplate(newTemplate);

  alert("Template saved successfully!");
};


