import { addTemplate, updateTemplate } from '../templates/templateStore';
import { successAlert } from './toasts.js';


// ---------- Constants & Helpers ----------
const DEFAULTS = {
  BOX_WIDTH: 500,
  BOX_HEIGHT: 400,
  IMAGE_WIDTH: 200,
  IMAGE_HEIGHT: 150,
  FONT_FAMILY: 'Arial',
  TABLE_FONT_FAMILY: 'Tahoma'
};

const SHADOW_STYLES = {
  sm: 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);',
  md: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);',
  lg: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);',
  xl: 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);',
  '2xl': 'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);'
};

const ensureId = (element, fallbackPrefix = 'el') => element?.id ?? `${fallbackPrefix}-${element?.type ?? 'unknown'}-${Math.random().toString(36).slice(2, 9)}`;

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildInlineStyle = (styleObj = {}) =>
  Object.entries(styleObj)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');

const px = (v) => (typeof v === 'number' ? `${v}px` : v || undefined);

const isElementInsideBoxRect = (elem, box) => {
  if (!box || box.type !== 'box') return false;
  const boxLeft = box.x;
  const boxRight = box.x + (box.width ?? DEFAULTS.BOX_WIDTH);
  const boxTop = box.y;
  const boxBottom = box.y + (box.height ?? DEFAULTS.BOX_HEIGHT);
  return elem.x >= boxLeft && elem.x <= boxRight && elem.y >= boxTop && elem.y <= boxBottom;
};

const estimateElementHeight = (element) => {
  switch (element.type) {
    case 'text':
    case 'header': {
      const fs = Number(element.fontSize ?? 12);
      return fs + 16;
    }
    case 'image':
      return Number(element.height ?? DEFAULTS.IMAGE_HEIGHT);
    case 'box':
      return Number(element.height ?? DEFAULTS.BOX_HEIGHT);
    case 'rectangle':
      return Number(element.height ?? 100);
    case 'line':
      return Number(element.lineWidth ?? 1);
    case 'table': {
      const rows = Number(element.rows ?? 2);
      const fontSize = Number(element.fontSize ?? 12);
      return rows * (fontSize + 16);
    }
    default:
      return 0;
  }
};

// ---------- Renderers (one per element type) ----------

const renderTextOrHeader = (element, baseStyle = '', isInsideBox = false) => {
  const styleObj = isInsideBox
    ? { position: 'absolute', left: px(element.x), top: px(element.y) }
    : { 'margin-top': px(element.marginTop), 'margin-left': px(element.x ? px(element.x) : undefined) };

  const commonStyle = {
    ...styleObj,
    'font-size': px(element.fontSize ?? 12),
    'font-weight': element.fontWeight ?? 'normal',
    'font-family': element.fontFamily ?? DEFAULTS.FONT_FAMILY,
    color: element.color ?? '#000000',
    'background-color': element.backgroundColor ?? 'transparent',
    'text-align': element.textAlign ?? 'left',
    padding: '4px 8px',
    'white-space': 'pre-wrap',
    'word-break': 'break-word',
    'line-height': 1.5,
    width: element.width ? px(element.width) : undefined
  };

  if (element.type === 'header' && element.underline) {
    commonStyle['text-decoration'] = 'underline';
  }

  return `<div style="${buildInlineStyle(commonStyle)}">${escapeHtml(element.value ?? element.field ?? '')}</div>`;
};

const renderImage = (element, baseStyle = '', isInsideBox = false) => {
  const styleObj = isInsideBox
    ? { position: 'absolute', left: px(element.x), top: px(element.y) }
    : { 'margin-top': px(element.marginTop), 'margin-left': px(element.x ? px(element.x) : undefined) };

  const imgStyle = {
    ...styleObj,
    width: px(element.width ?? DEFAULTS.IMAGE_WIDTH),
    height: px(element.height ?? DEFAULTS.IMAGE_HEIGHT),
    'object-fit': 'cover',
    display: 'block'
  };

  // NOTE: we escape src and alt for safety; consider stricter validation if user-provided
  const src = escapeHtml(element.src ?? '');
  const alt = escapeHtml(element.alt ?? 'image');

  return `<img src="${src}" alt="${alt}" style="${buildInlineStyle(imgStyle)}" />`;
};

const renderRectangle = (element, baseStyle = '', isInsideBox = false) => {
  const styleObj = isInsideBox
    ? { position: 'absolute', left: px(element.x), top: px(element.y) }
    : { 'margin-top': px(element.marginTop), 'margin-left': px(element.x ? px(element.x) : undefined) };

  const rectStyle = {
    ...styleObj,
    width: px(element.width ?? 200),
    height: px(element.height ?? 100),
    'background-color': element.backgroundColor ?? '#ffffff',
    border: `${element.borderWidth ?? 1}px solid ${element.borderColor ?? '#000000'}`
  };

  return `<div style="${buildInlineStyle(rectStyle)}"></div>`;
};

const renderLine = (element, baseStyle = '', isInsideBox = false) => {
  const styleObj = isInsideBox
    ? { position: 'absolute', left: px(element.x), top: px(element.y) }
    : { 'margin-top': px(element.marginTop), 'margin-left': px(element.x ? px(element.x) : undefined) };

  const lineStyle = {
    ...styleObj,
    width: px(element.width ?? 200),
    height: px(element.lineWidth ?? 1),
    'background-color': element.color ?? '#000000'
  };

  return `<div style="${buildInlineStyle(lineStyle)}"></div>`;
};

const renderLink = (element, baseStyle = '', isInsideBox = false) => {
  const styleObj = isInsideBox
    ? { position: 'absolute', left: px(element.x), top: px(element.y) }
    : { 'margin-top': px(element.marginTop), 'margin-left': px(element.x ? px(element.x) : undefined) };

  const linkStyle = {
    ...styleObj,
    'font-size': px(element.fontSize ?? 12),
    'font-weight': element.fontWeight ?? 'normal',
    'font-family': element.fontFamily ?? DEFAULTS.FONT_FAMILY,
    color: element.color ?? '#0000EE',
    'text-decoration': 'underline'
  };

  const url = escapeHtml(element.url ?? '#');
  const text = escapeHtml(element.value ?? element.text ?? 'Link');

  return `<a href="${url}" style="${buildInlineStyle(linkStyle)}">${text}</a>`;
};

const renderTable = (element, baseStyle = '') => {
  const width = element.width ?? 400;
  const borderColor = element.borderColor ?? '#000000';
  const borderWidth = element.borderWidth ?? 1;

  let numCols = 2;
  let colKeys = null;
  if (Array.isArray(element.cols)) {
    colKeys = element.cols;
    numCols = element.cols.length;
  } else if (typeof element.cols === 'number') {
    numCols = element.cols;
  }

  const rows = element.rows ?? 2;
  const cellWidth = Math.round(width / numCols);

  let html = `<div style="${buildInlineStyle({ 'margin-top': px(element.marginTop), 'margin-left': px(element.x) })}"><table style="border-collapse: collapse; width: ${px(width)}; border-color: ${borderColor};"><tbody>`;

  const repeat = element.repeat;
  const repeatStartIndex = repeat ? (Number(repeat.startRow || 1) - 1) : null;

  for (let r = 0; r < rows; r++) {
    if (repeat && r === repeatStartIndex) {
      html += `{{#each ${repeat.arrayPath}}}\n<tr>`;
      for (let c = 0; c < numCols; c++) {
        const colKey = (Array.isArray(repeat.cols) && repeat.cols[c])
          ? repeat.cols[c]
          : (Array.isArray(colKeys) && colKeys[c])
            ? colKeys[c]
            : `col${c + 1}`;

        const key = `${r}-${c}`;
        const cellStyles = element.cellStyles?.[key] || {};

        html += `<td style="width:${px(cellWidth)}; border:${borderWidth}px solid ${borderColor}; padding:4px; background:${cellStyles.backgroundColor || element.backgroundColor || '#ffffff'}; font-size:${px(cellStyles.fontSize || element.fontSize || 12)}; font-weight:${cellStyles.fontWeight || 'normal'}; font-family:${cellStyles.fontFamily || DEFAULTS.TABLE_FONT_FAMILY}; text-decoration:${cellStyles.textDecoration || 'none'}; text-transform:${cellStyles.textTransform || 'none'}; font-style:${cellStyles.fontStyle || 'normal'}; color:${cellStyles.color || '#000000'}; text-align:${cellStyles.textAlign || 'left'};">{{${colKey}}}</td>`;
      }
      html += `</tr>\n{{/each}}`;
      continue;
    }

    html += '<tr>';
    for (let c = 0; c < numCols; c++) {
      const key = `${r}-${c}`;
      const cellContent = element.cellData?.[key] ?? `Cell ${r + 1},${c + 1}`;
      const cellStyles = element.cellStyles?.[key] || {};

      html += `<td style="width:${px(cellWidth)}; border:${borderWidth}px solid ${borderColor}; padding:4px; background:${cellStyles.backgroundColor || element.backgroundColor || '#ffffff'}; font-size:${px(cellStyles.fontSize || element.fontSize || 12)}; font-weight:${cellStyles.fontWeight || 'normal'}; font-family:${cellStyles.fontFamily || DEFAULTS.TABLE_FONT_FAMILY}; text-decoration:${cellStyles.textDecoration || 'none'}; text-transform:${cellStyles.textTransform || 'none'}; font-style:${cellStyles.fontStyle || 'normal'}; color:${cellStyles.color || '#000000'}; text-align:${cellStyles.textAlign || 'left'};">${escapeHtml(cellContent)}</td>`;
    }
    html += '</tr>';
  }

  html += '</tbody></table></div>';
  return html;
};

const RENDERERS = {
  text: renderTextOrHeader,
  header: renderTextOrHeader,
  image: renderImage,
  rectangle: renderRectangle,
  line: renderLine,
  link: renderLink,
  table: renderTable
};

// ---------- Core export function ----------

export const exportCanvasToHTML = (elements = [], page = {}, pageSize = null) => {
  // Make a shallow copy and sort by y
  const sorted = [...(elements || [])].sort((a, b) => (a.y ?? 0) - (b.y ?? 0));

  // Use ids when tracking processed nested elements
  const processedIds = new Set();

  let lastBottom = 0;

  const parts = sorted.map((element, index) => {
    const id = ensureId(element);
    if (processedIds.has(id)) return '';

    const marginTop = index === 0 ? (element.y ?? 0) : Math.max(0, (element.y ?? 0) - lastBottom);

    const estimatedHeight = estimateElementHeight(element);
    lastBottom = (element.y ?? 0) + estimatedHeight;

    element.marginTop = marginTop;


    if (element.type === 'box') {

      const children = sorted.filter((c) => c !== element && c.type !== 'box' && isElementInsideBoxRect(c, element));

      children.forEach((c) => processedIds.add(ensureId(c)));

  
      const padding = Number(element.padding ?? 20);
      const childrenHtml = children
        .map((child) => {
          const relativeX = (child.x ?? 0) - (element.x ?? 0) - padding;
          const relativeY = (child.y ?? 0) - (element.y ?? 0) - padding;
          const childCopy = { ...child, x: relativeX, y: relativeY };

          const renderer = RENDERERS[childCopy.type] || ((el) => '');
          return renderer(childCopy, '', true);
        })
        .join('\n');

      const shadowStyle = SHADOW_STYLES[element.shadow] ?? '';
      const borderStyle = element.borderStyle === 'none' ? '' : `border-width: ${element.borderWidth ?? 1}px; border-style: ${element.borderStyle ?? 'solid'}; border-color: ${element.borderColor ?? '#d1d5db'};`;

      const styleObj = {
        'margin-top': px(marginTop),
        'margin-left': px(element.x ?? 0),
        width: px(element.width ?? DEFAULTS.BOX_WIDTH),
        height: px(element.height ?? DEFAULTS.BOX_HEIGHT),
        'background-color': element.backgroundColor ?? '#ffffff',
        ...({}),
        'border-radius': px(element.borderRadius ?? 0),
        padding: px(padding),
        opacity: element.opacity ?? 1,
        'box-sizing': 'border-box',
        overflow: 'hidden',
        position: 'relative'
      };

      const borderInline = borderStyle;

      return `\n<div style="${buildInlineStyle(styleObj)} ${borderInline} ${shadowStyle}">\n  <div style=\"width:100%;height:100%;position:relative;box-sizing:border-box;\">\n    ${childrenHtml || '<div style="color: #9ca3af; font-size: 14px; font-style: italic; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Container</div>'}\n  </div>\n</div>`;
    }

    // Non-box elements
    if (element.type === 'table') {
      return renderTable(element);
    }

    const renderer = RENDERERS[element.type] || ((el) => '');
    return renderer(element, '', false);
  })
    .filter(Boolean)
    .join('\n');

  const containerWidth = pageSize?.width ?? '210mm';
  const containerMinHeight = pageSize?.height ?? '297mm';

  return `\n<div class=\"canvas-container\" style=\"width:${containerWidth}; min-height:${containerMinHeight}; background:white; margin:0 auto; box-shadow:0 4px 8px rgba(0,0,0,0.1); position: relative; box-sizing:border-box;\">\n  ${parts} \n</div>\n`;
};

// ---------- Multi-page exports / helpers (kept simple) ----------
export const exportAllPagesToHTML = (pages = [], pageSize = null) => {
  const pageWidth = pageSize?.width ?? '210mm';
  const pageHeight = pageSize?.height ?? '297mm';

  const allPagesHTML = (pages || [])
    .map((page) => exportCanvasToHTML(page?.elements ?? [], page, pageSize))
    .join('\n<div style="page-break-after: always;"></div>\n');

  return `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; }\n    @page { size: ${pageWidth} ${pageHeight}; margin: 0; }\n    .canvas-container { margin-bottom: 20px; }\n    @media print { body { padding: 0; background: white; } .canvas-container { page-break-after: always; margin: 0 !important; box-shadow: none !important; width: ${pageWidth} !important; min-height: ${pageHeight} !important; } .canvas-container:last-child { page-break-after: auto; } }\n  </style>\n</head>\n<body>\n  ${allPagesHTML}\n</body>\n</html>`;
};

export const downloadAllPagesHTML = (pages, filename = 'template-multipage.html', pageSize = null) => {
  const finalHtml = exportAllPagesToHTML(pages, pageSize);
  const blob = new Blob([finalHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
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
    successAlert('Edited successfully!');
  } else {
    addTemplate(templateData);
    successAlert('Saved successfully!');
  }

  return templateId;
};
