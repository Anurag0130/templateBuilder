import { useState } from "react";
import { Trash2 } from "lucide-react";

export function CanvasElement({
    element,
    index,
    isSelected,
    onSelect,
    onDragEnd,
    onDelete,
    onUpdateElement
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingCell, setEditingCell] = useState(null);
    const [selectedCells, setSelectedCells] = useState([]); // array of {row, col}
    const [editValue, setEditValue] = useState(element?.value || "");

    const handleClick = (e) => {
        e.stopPropagation();
        onSelect(element, index);
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        if (element.type === "text" || element.type === "header") {
            setIsEditing(true);
            setEditValue(element.value || "");
        }
    };

    const handleBlur = () => {
        if (isEditing) {
            onUpdateElement({ ...element, value: editValue }, index);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleBlur();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setEditValue(element.value || "");
        }
    };

    const handleDragEnd = (e) => {
        e.stopPropagation();
        onDragEnd(e, index);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(index);
    };


    // const handleCellClick = (e, row, col) => {
    //     e.stopPropagation();


    //     const alreadySelected =
    //         selectedCells.length === 1 &&
    //         selectedCells[0].row === row &&
    //         selectedCells[0].col === col;

    //     if (alreadySelected) {

    //         setSelectedCells([]);
    //     } else {
    //         setSelectedCells([{ row, col }]);
    //     }
    // };
    const handleCellClick = (e, row, col) => {
        e.stopPropagation();

        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl) {
            // toggle cell selection
            const exists = selectedCells.some(c => c.row === row && c.col === col);

            setSelectedCells(prev =>
                exists
                    ? prev.filter(c => !(c.row === row && c.col === col))
                    : [...prev, { row, col }]
            );
        } else {
            // normal selection (single)
            setSelectedCells([{ row, col }]);
        }
    };



    const handleCellDoubleClick = (e, row, col) => {
        e.stopPropagation();
        if (element.type === "table") {
            setEditingCell({ row, col });
        }
    };

    const handleCellEditChange = (e) => {
        if (!editingCell) return;
        const cellKey = `${editingCell.row}-${editingCell.col}`;
        const newCellData = { ...(element.cellData || {}) };
        newCellData[cellKey] = e.target.value;
        onUpdateElement({ ...element, cellData: newCellData }, index);
    };

    const handleCellEditBlur = () => {
        setEditingCell(null);
    };

    const isCellMerged = (row, col) => {
        for (const [key, merge] of Object.entries(element.mergedCells || {})) {
            const [startRow, startCol] = key.split("-").map(Number);
            if (
                row >= startRow &&
                row < startRow + merge.rowSpan &&
                col >= startCol &&
                col < startCol + merge.colSpan
            ) {
                return { merged: true, isStart: row === startRow && col === startCol, merge };
            }
        }
        return { merged: false, isStart: false, merge: null };
    };

    // ---- Cell style update helper ----
    const updateCellStyle = (newStyles) => {
        const updated = { ...(element.cellStyles || {}) };

        selectedCells.forEach(({ row, col }) => {
            const key = `${row}-${col}`;
            updated[key] = { ...(updated[key] || {}), ...newStyles };
        });

        onUpdateElement({ ...element, cellStyles: updated }, index);
    };


    // ---- Render ----
    const renderElement = () => {
        const baseStyle = {
            left: `${element.x}px`,
            top: `${element.y}px`
        };

        const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

        switch (element.type) {
            case "emailField":
                return (
                    <div style={baseStyle} className={`absolute cursor-move ${selectedClass}`}>
                        <div style={{ width: element.width ? `${element.width}px` : "auto" }}>
                            <label
                                style={{
                                    fontSize: `${element.fontSize || 14}px`,
                                    color: element.color || "#000000",
                                    display: "block",
                                    marginBottom: "4px",
                                    fontWeight: "500"
                                }}
                            >
                                {element.label || "Email:"}
                            </label>
                            <div
                                style={{
                                    border: "1px solid #d1d5db",
                                    padding: "8px 12px",
                                    borderRadius: "4px",
                                    backgroundColor: "#f9fafb",
                                    fontSize: `${element.fontSize || 14}px`,
                                    color: "#9ca3af"
                                }}
                            >
                                {element.placeholder || "email@example.com"}
                            </div>
                        </div>
                    </div>
                );

            case "list":
                const listStyleType = element.listStyle === "bullet" ? "disc" : element.listStyle === "number" ? "decimal" : "none";
                const ListTag = element.listStyle === "number" ? "ol" : "ul";

                return (
                    <div style={baseStyle} className={`absolute cursor-move ${selectedClass}`}>
                        <ListTag
                            style={{
                                width: element.width ? `${element.width}px` : "auto",
                                fontSize: `${element.fontSize || 14}px`,
                                fontWeight: element.fontWeight || "normal",
                                color: element.color || "#000000",
                                lineHeight: element.lineHeight || 1.8,
                                listStyleType: listStyleType,
                                paddingLeft: element.listStyle === "none" ? "0" : `${element.indentation || 20}px`,
                                margin: 0
                            }}
                        >
                            {(element.items || ["Item 1", "Item 2", "Item 3"]).map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ListTag>
                    </div>
                );

            case "link":
                return (
                    <div style={baseStyle} className={`absolute cursor-move ${selectedClass}`}>
                        <a
                            href={element.href || "#"}
                            style={{
                                fontSize: `${element.fontSize || 14}px`,
                                fontWeight: element.fontWeight || "normal",
                                color: element.color || "#2563eb",
                                textDecoration: element.underline ? "underline" : "none",
                                display: "inline-block",
                                width: element.width ? `${element.width}px` : "auto",
                                cursor: "pointer"
                            }}
                            onClick={(e) => e.preventDefault()}
                        >
                            {element.text || "Click Here"}
                        </a>
                    </div>
                );

            case "table": {
                const cellWidth = (element.width || 400) / (element.cols || 2);
                const cellHeight = (element.height || 100) / (element.rows || 2);

                return (
                    <div style={baseStyle} className={`absolute cursor-move ${selectedClass}`}>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: `${element.width || 400}px`,
                                borderColor: element.borderColor || "#000000",
                                backgroundColor: element.backgroundColor || "#fff",
                                height: "auto"
                            }}
                        >
                            <tbody>
                                {Array.from({ length: element.rows || 2 }).map((_, rowIdx) => (
                                    <tr key={rowIdx}>
                                        {Array.from({ length: element.cols || 2 }).map((_, colIdx) => {
                                            const cellInfo = isCellMerged(rowIdx, colIdx);
                                            if (cellInfo.merged && !cellInfo.isStart) {
                                                return null;
                                            }

                                            const cellKey = `${rowIdx}-${colIdx}`;
                                            const isSelectedCell = selectedCells.some(
                                                (c) => c.row === rowIdx && c.col === colIdx
                                            );
                                            const isEditingCell =
                                                editingCell?.row === rowIdx && editingCell?.col === colIdx;
                                            const cellContent = element.cellData?.[cellKey] || "";

                                            // apply per-cell styles if present
                                            const cellStyles = (element.cellStyles && element.cellStyles[cellKey]) || {};

                                            // const computedBackground =
                                            //     isSelectedCell ? "#DBEAFE" :
                                            //         rowIdx === 0 && element.headerRow ? "#f3f4f6" :
                                            //             cellStyles.backgroundColor || "transparent";

                                            // const computedBackground =
                                            //     cellStyles.backgroundColor ||
                                            //     (rowIdx === 0 && element.headerRow ? "#f3f4f6" : "transparent");


                                            const computedFontSize = cellStyles.fontSize ? `${cellStyles.fontSize}px` : undefined;
                                            const computedColor = cellStyles.color || undefined;
                                            const computedFontWeight = cellStyles.fontWeight || undefined;
                                            const computedTextAlign = cellStyles.textAlign || undefined;
                                            const computedBackground = cellStyles.backgroundColor || undefined;
                                            const computedFontStyle = cellStyles.fontStyle || undefined;
                                            const computedTextTransform = cellStyles.textTransform || undefined;
                                            const computedTextDecoration = cellStyles.textDecoration || undefined;
                                            const computedFontFamily = cellStyles.fontFamily || undefined;


                                            return (
                                                <td
                                                    key={colIdx}
                                                    className={`p-2 cursor-pointer hover:bg-blue-50 transition-colors ${isSelectedCell ? "bg-blue-100" : ""
                                                        }`}
                                                    style={{
                                                        width: `${cellWidth}px`,
                                                        height: `${cellHeight}px`,
                                                        border: `${element.borderWidth || 1}px solid ${element.borderColor || "#000000"
                                                            }`,
                                                        backgroundColor: computedBackground,
                                                        fontWeight: computedFontWeight,
                                                        padding: 0,
                                                        textAlign: computedTextAlign,
                                                        fontSize: computedFontSize,
                                                        color: computedColor,
                                                        fontStyle: computedFontStyle,
                                                        textTransform: computedTextTransform,
                                                        textDecoration: computedTextDecoration,
                                                        fontFamily: computedFontFamily,

                                                    }}
                                                    rowSpan={cellInfo.merge?.rowSpan || 1}
                                                    colSpan={cellInfo.merge?.colSpan || 1}
                                                    onClick={(e) => handleCellClick(e, rowIdx, colIdx)}
                                                    onDoubleClick={(e) => handleCellDoubleClick(e, rowIdx, colIdx)}
                                                >
                                                    {isEditingCell ? (
                                                        <input
                                                            type="text"
                                                            value={cellContent}
                                                            onChange={handleCellEditChange}
                                                            onBlur={handleCellEditBlur}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleCellEditBlur();
                                                                } else if (e.key === "Escape") {
                                                                    setEditingCell(null);
                                                                }
                                                            }}
                                                            autoFocus
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                border: "1px solid #3b82f6",
                                                                padding: "4px",
                                                                fontSize: "12px"
                                                            }}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    ) : (
                                                        <div style={{ padding: "6px", minHeight: "100%", boxSizing: "border-box" }}>
                                                            {cellContent || `Cell ${rowIdx + 1},${colIdx + 1}`}
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Cell-properties panel: shows when exactly 1 cell is selected */}
                        {selectedCells.length > 0 && (() => {
                            const { row, col } = selectedCells[0];
                            const selKey = `${row}-${col}`;
                            const selStyles = (element.cellStyles && element.cellStyles[selKey]) || {};
                            const selValue = element.cellData?.[selKey] || "";

                            return (
                                <div className="mt-2 p-2 rounded-md bg-white border shadow-sm w-full max-w-[420px]">
                                    <div className="text-xs text-gray-600 mb-2">
                                        Editing cell: <strong>Row {row + 1}, Col {col + 1}</strong>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs block mb-1">Font size (px)</label>
                                            <input
                                                type="number"
                                                value={selStyles.fontSize || element.fontSize || 12}
                                                onChange={(e) => updateCellStyle({ fontSize: Number(e.target.value) })}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs block mb-1">Font weight</label>
                                            <select
                                                value={selStyles.fontWeight || "normal"}
                                                onChange={(e) => updateCellStyle({ fontWeight: e.target.value })}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="bold">Bold</option>
                                                <option value="600">600</option>
                                                <option value="700">700</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-xs block mb-1">Font Family</label>
                                            <select
                                                value={selStyles.fontFamily || "Tahoma"}
                                                onChange={(e) => updateCellStyle({ fontFamily: e.target.value })}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="Tahoma">Tahoma</option>
                                                <option value="Arial">Arial</option>
                                                <option value="Helvetica">Helvetica</option>
                                                <option value="Times New Roman">Times New Roman</option>
                                                <option value="Courier New">Courier New</option>
                                                <option value="Verdana">Verdana</option>
                                                <option value="Georgia">Georgia</option>

                                                <option value="Trebuchet MS">Trebuchet MS</option>
                                            </select>
                                        </div>



                                        <div>
                                            <label className="text-xs block mb-1">Font Style</label>
                                            <select
                                                value={selStyles.fontStyle || "normal"}
                                                onChange={(e) =>
                                                    updateCellStyle({ fontStyle: e.target.value })
                                                }
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="italic">Italic</option>
                                                <option value="oblique">Oblique</option>

                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs block mb-1">Text Transform</label>
                                            <select
                                                value={selStyles.fontStyle || "normal"}
                                                onChange={(e) =>
                                                    updateCellStyle({ textTransform: e.target.value })
                                                }
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="none">None</option>
                                                <option value="uppercase">Uppercase</option>
                                                <option value="lowercase">Lowercase</option>
                                                <option value="capitalize">Capitalize</option>

                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-xs block mb-1">Text Decoration</label>
                                            <select
                                                value={selStyles.textDecoration || "none"}
                                                onChange={(e) =>
                                                    updateCellStyle({ textDecoration: e.target.value })
                                                }
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="none">None</option>
                                                <option value="underline">Underline</option>
                                                <option value="line-through">Line Through</option>
                                            </select>
                                        </div>



                                        <div>
                                            <label className="text-xs block mb-1">Text color</label>
                                            <input
                                                type="color"
                                                value={selStyles.color || "#000000"}
                                                onChange={(e) => updateCellStyle({ color: e.target.value })}
                                                className="w-full border rounded px-2 py-1 text-sm h-9"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs block mb-1">Background</label>
                                            <input
                                                type="color"
                                                value={selStyles.backgroundColor || "#ffffff"}
                                                onChange={(e) => updateCellStyle({ backgroundColor: e.target.value })}
                                                className="w-full border rounded px-2 py-1 text-sm h-9"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs block mb-1">Text align</label>
                                            <select
                                                value={selStyles.textAlign || "left"}
                                                onChange={(e) => updateCellStyle({ textAlign: e.target.value })}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="left">Left</option>
                                                <option value="center">Center</option>
                                                <option value="right">Right</option>
                                            </select>
                                        </div>


                                    </div>

                                    <div className="mt-3 flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedCells([])}
                                            className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                                        >
                                            Done
                                        </button>
                                        <button
                                            onClick={() => {
                                                // Reset the styles for this cell
                                                const key = `${row}-${col}`;
                                                const newCellStyles = { ...(element.cellStyles || {}) };
                                                delete newCellStyles[key];
                                                onUpdateElement({ ...element, cellStyles: newCellStyles }, index);
                                            }}
                                            className="px-3 py-1 text-sm rounded bg-red-50 text-red-600 hover:bg-red-100"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            );
                        })()}
                        {selectedCells.length > 0 && selectedCells.length !== 1 && (
                            <div className="mt-2 text-xs text-blue-600">
                                {selectedCells.length} cell(s) selected.
                            </div>
                        )}
                    </div>
                );
            }

            case "image":
                return (
                    <div style={baseStyle} className={`absolute cursor-move ${selectedClass}`}>
                        <img
                            src={element.src}
                            alt={element.alt || "Image"}
                            style={{
                                width: element.width || 200,
                                height: element.height || 150,
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>
                );

            case "line":
                return (
                    <div
                        style={{
                            ...baseStyle,
                            width: `${element.width || 200}px`,
                            height: `${element.lineWidth || 1}px`,
                            backgroundColor: element.color || "#000000"
                        }}
                        className={`absolute cursor-move ${selectedClass}`}
                    />
                );

            case "header":
            case "text":
            default:
                if (isEditing) {
                    return (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            style={{
                                ...baseStyle,
                                fontSize: `${element.fontSize || 12}px`,
                                fontWeight: element.fontWeight || "normal",
                                fontFamily: element.fontFamily || "Arial",
                                color: element.color || "#000000",
                                backgroundColor: element.backgroundColor || "transparent",
                                textAlign: (element.textAlign || "left"),
                                width: element.width ? `${element.width}px` : "auto",
                                border: "2px solid #3B82F6",
                                outline: "none",
                                padding: "4px 8px",
                                borderRadius: "4px"
                            }}
                            className="absolute"
                        />
                    );
                }

                return (
                    <div
                        style={{
                            ...baseStyle,
                            fontSize: `${element.fontSize || 12}px`,
                            fontWeight: element.fontWeight || "normal",
                            fontFamily: element.fontFamily || "Arial",
                            color: element.color || "#000000",
                            backgroundColor: element.backgroundColor || "transparent",
                            textAlign: (element.textAlign || "left"),
                            width: element.width ? `${element.width}px` : "auto",
                            textDecoration:
                                element.type === "header" && element.underline ? "underline" : "none",
                            padding: "4px 8px"
                        }}
                        className={`absolute cursor-move rounded transition-all whitespace-nowrap ${isSelected
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-transparent hover:border-blue-300 hover:bg-blue-50"
                            } ${selectedClass}`}
                        title={element.field}
                    >
                        {element.value || element.field}
                    </div>
                );
        }
    };

    return (
        <div
            draggable
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            className="relative"
        >
            {renderElement()}
            {isSelected && (
                <button
                    onClick={handleDelete}
                    className="absolute -top-0 -right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-20"
                >
                    <Trash2 size={12} />
                </button>
            )}
        </div>
    );
}
