import React, { useState } from "react";
import { Trash2 } from "lucide-react";

// interface CanvasElementProps {
//     element: any;
//     index: number;
//     isSelected: boolean;
//     onSelect: (element: any, index: number) => void;
//     onDragEnd: (e: any, index: number) => void;
//     onDelete: (index: number) => void;
//     onUpdateElement: (updatedElement: any, index: number) => void;
// }

export function CanvasElement({
    element,
    index,
    isSelected,
    onSelect,
    onDragEnd,
    onDelete,
    onUpdateElement
}
    // : CanvasElementProps
) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(element.value || "");
    const [selectedCells, setSelectedCells] = useState([]);
    const [editingCell, setEditingCell] = useState(null);

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

    const handleCellClick = (e, row, col) => {
        e.stopPropagation();
        if (element.type === "table") {
            const newSelectedCells = [...selectedCells];
            const existingIndex = newSelectedCells.findIndex((c) => c.row === row && c.col === col);

            if (existingIndex > -1) {
                newSelectedCells.splice(existingIndex, 1);
            } else {
                newSelectedCells.push({ row, col });
            }

            setSelectedCells(newSelectedCells);

            if (newSelectedCells.length >= 2) {
                const rows = newSelectedCells.map((c) => c.row);
                const cols = newSelectedCells.map((c) => c.col);
                const minRow = Math.min(...rows);
                const maxRow = Math.max(...rows);
                const minCol = Math.min(...cols);
                const maxCol = Math.max(...cols);

                const mergeKey = `${minRow}-${minCol}`;
                const newMergedCells = { ...element.mergedCells };

                newMergedCells[mergeKey] = {
                    rowSpan: maxRow - minRow + 1,
                    colSpan: maxCol - minCol + 1
                };

                onUpdateElement({ ...element, mergedCells: newMergedCells }, index);
                setSelectedCells([]);
            }
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
        const newCellData = { ...element.cellData };
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

    const renderElement = () => {
        const baseStyle = {
            left: `${element.x}px`,
            top: `${element.y}px`
        };

        const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";



        switch (element.type) {
            case "table":
                const cellWidth = (element.width || 400) / (element.cols || 2);
                const cellHeight = (element.height || 100) / (element.rows || 2);

                return (
                    <div style={baseStyle} className={`absolute cursor-move ${selectedClass}`}>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: `${element.width || 400}px`,
                                borderColor: element.borderColor || "#000000",
                                backgroundColor: element.backgroundColor || "#fff"
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

                                            const isSelectedCell = selectedCells.some(
                                                (c) => c.row === rowIdx && c.col === colIdx
                                            );
                                            const isEditingCell =
                                                editingCell?.row === rowIdx && editingCell?.col === colIdx;
                                            const cellKey = `${rowIdx}-${colIdx}`;
                                            const cellContent = element.cellData?.[cellKey] || "";

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
                                                        backgroundColor: isSelectedCell
                                                            ? "#DBEAFE"
                                                            : rowIdx === 0 && element.headerRow
                                                                ? "#f3f4f6"
                                                                : "transparent",
                                                        fontWeight:
                                                            rowIdx === 0 && element.headerRow
                                                                ? "bold"
                                                                : "normal",
                                                        padding: 0
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
                                                        <div style={{ padding: "4px", minHeight: "100%" }}>
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
                        {selectedCells.length > 0 && (
                            <div className="mt-2 text-xs text-blue-600">
                                {selectedCells.length} cell(s) selected. Select more to merge.
                            </div>
                        )}
                    </div>
                );

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

            case "rectangle":
                return (
                    <div
                        style={{
                            ...baseStyle,
                            width: `${element.width || 200}px`,
                            height: `${element.height || 100}px`,
                            backgroundColor: element.backgroundColor || "#ffffff",
                            border: `${element.borderWidth || 1}px solid ${element.borderColor || "#d1d5db"}`
                        }}
                        className={`absolute cursor-move ${selectedClass}`}
                    />
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
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-20"
                >
                    <Trash2 size={12} />
                </button>
            )}
        </div>
    );
}
