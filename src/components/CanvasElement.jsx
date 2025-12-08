import { useState, useRef, useEffect, useMemo } from "react";
import { Rnd } from "react-rnd";
import { Trash2 } from "lucide-react";

export function CanvasElement({
    element,
    index,
    isSelected,
    onSelect,
    onDragEnd,
    onDelete,
    onUpdateElement,
    onCellSelect
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingCell, setEditingCell] = useState(null);
    const [selectedCells, setSelectedCells] = useState([]); // array of {row, col}
    const [editValue, setEditValue] = useState(element?.value || "");

    const textareaRef = useRef(null);

    // ✅ NEW: Auto-resize textarea when content changes
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const textarea = textareaRef.current;
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto';
            // Set height to scrollHeight to fit content
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [editValue, isEditing]);

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
        // ENTER always inserts newline
        if (e.key === "Enter") {
            e.preventDefault();
            setEditValue(prev => prev + "\n");
            return;
        }

        // ESCAPE cancels editing
        if (e.key === "Escape") {
            setIsEditing(false);
            setEditValue(element.value || "");
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(index);
    };

    // ✅ UPDATED: Cell click handler with multi-select support
    const handleCellClick = (e, row, col) => {
        e.stopPropagation();

        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl) {
            // toggle cell selection (multi-select)
            const exists = selectedCells.some(c => c.row === row && c.col === col);

            const newSelectedCells = exists
                ? selectedCells.filter(c => !(c.row === row && c.col === col))
                : [...selectedCells, { row, col }];

            setSelectedCells(newSelectedCells);

            // ✅ NEW: Parent ko multi-select info bhejo
            if (onCellSelect && element.type === "table" && newSelectedCells.length > 0) {
                const firstCell = newSelectedCells[0];
                const cellKey = `${firstCell.row}-${firstCell.col}`;
                const cellStyles = (element.cellStyles && element.cellStyles[cellKey]) || {};
                const cellData = element.cellData?.[cellKey] || "";

                onCellSelect({
                    elementIndex: index,
                    row: firstCell.row,
                    col: firstCell.col,
                    cellKey,
                    styles: cellStyles,
                    cellData: cellData,
                    element: element,
                    selectedCells: newSelectedCells, // ✅ Multiple cells info
                    isMultiSelect: newSelectedCells.length > 1
                });
            }
        } else {
            // normal selection (single cell)
            setSelectedCells([{ row, col }]);

            // ✅ Parent ko single cell info bhejo
            if (onCellSelect && element.type === "table") {
                const cellKey = `${row}-${col}`;
                const cellStyles = (element.cellStyles && element.cellStyles[cellKey]) || {};
                const cellData = element.cellData?.[cellKey] || "";

                onCellSelect({
                    elementIndex: index,
                    row,
                    col,
                    cellKey,
                    styles: cellStyles,
                    cellData: cellData,
                    element: element,
                    selectedCells: [{ row, col }], // ✅ Single cell as array
                    isMultiSelect: false
                });
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

    // ✅ NEW: Handle drag stop
    const handleDragStop = (e, d) => {
        onUpdateElement({
            ...element,
            x: d.x,
            y: d.y
        }, index);
    };

    // ✅ NEW: Handle resize stop
    const handleResizeStop = (e, direction, ref, delta, position) => {
        onUpdateElement({
            ...element,
            x: position.x,
            y: position.y,
            width: ref.offsetWidth,
            height: ref.offsetHeight
        }, index);
    };


    // ✅ NEW: Get default size based on element type
    const getDefaultSize = () => {
        const defaults = {
            text: { width: 200, height: 100 },
            header: { width: 300, height: 50 },
            table: { width: 400, height: 150 },
            image: { width: 200, height: 150 },
            line: { width: 200, height: 2 },
            list: { width: 200, height: 120 },
            link: { width: 150, height: 30 }
        };

        return {
            width: element.width || defaults[element.type]?.width || 200,
            height: element.height || defaults[element.type]?.height || 100
        };
    };

    // ✅ NEW: Render content without position styling (handled by Rnd)
    const renderContent = () => {
        const selectedClass = useMemo(() => (isSelected ? "ring-2 ring-blue-500 z-10" : ""), [isSelected]);

        switch (element.type) {
            case "list":
                const listStyleType = element.listStyle === "bullet" ? "disc" : element.listStyle === "number" ? "decimal" : "none";
                const ListTag = element.listStyle === "number" ? "ol" : "ul";

                return (
                    <div className={`cursor-move ${selectedClass}`}>
                        <ListTag
                            style={{
                                width: "100%",
                                height: "100%",
                                fontSize: `${element.fontSize || 14}px`,
                                fontWeight: element.fontWeight || "normal",
                                color: element.color || "#000000",
                                lineHeight: element.lineHeight || 1.8,
                                listStyleType: listStyleType,
                                paddingLeft: element.listStyle === "none" ? "0" : `${element.indentation || 20}px`,
                                margin: 0,
                                boxSizing: "border-box"
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
                    <div className={`cursor-move ${selectedClass}`}>
                        <a
                            href={element.href || "#"}
                            style={{
                                fontSize: `${element.fontSize || 14}px`,
                                fontWeight: element.fontWeight || "normal",
                                color: element.color || "#2563eb",
                                textDecoration: element.underline ? "underline" : "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: element.textAlign || "left",
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                                boxSizing: "border-box",
                                padding: "4px 8px"
                            }}
                            onClick={(e) => e.preventDefault()}
                        >
                            {element.text || "Click Here"}
                        </a>
                    </div>
                );

            case "table": {
                const { width, height } = getDefaultSize();
                const cellWidth = width / (element.cols || 2);
                const cellHeight = height / (element.rows || 2);

                return (
                    <div className={`cursor-move ${selectedClass}`} style={{ width: "100%", height: "100%" }}>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                height: "100%",
                                borderColor: element.borderColor || "#000000",
                                backgroundColor: element.backgroundColor || "#fff",
                                position: "relative",
                                tableLayout: "fixed"
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
                                                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${isSelectedCell ? "bg-blue-100" : ""
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
                                                        boxSizing: "border-box"
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
                                                                fontSize: "12px",
                                                                boxSizing: "border-box"
                                                            }}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    ) : (
                                                        <div style={{ padding: "6px", height: "100%", boxSizing: "border-box" }}>
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
                    <div className={`cursor-move ${selectedClass}`} style={{ width: "100%", height: "100%" }}>
                        <img
                            src={element.src}
                            alt={element.alt || "Image"}
                            style={{
                                width: "100%",
                                height: "100%",
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
                            width: "100%",
                            height: "100%",
                            backgroundColor: element.color || "#000000"
                        }}
                        className={`cursor-move ${selectedClass}`}
                    />
                );

            case "header":
            case "text":
            default:
                if (isEditing) {
                    return (
                        <textarea
                            ref={textareaRef}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            style={{
                                fontSize: `${element.fontSize || 12}px`,
                                fontWeight: element.fontWeight || "normal",
                                fontFamily: element.fontFamily || "Arial",
                                color: element.color || "#000000",
                                backgroundColor: element.backgroundColor || "transparent",
                                textAlign: element.textAlign || "left",
                                width: "100%",
                                height: "100%",
                                border: "2px solid #3B82F6",
                                outline: "none",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                overflow: "hidden",
                                minHeight: "30px",
                                lineHeight: "1.5",
                                resize: "none",
                                boxSizing: "border-box"
                            }}
                            className="w-full h-full"
                        />
                    );
                }
                return (
                    <div
                        style={{
                            padding: "4px 8px",
                            color: element?.color || "#000000",
                            fontSize: `${element.fontSize || 12}px`,
                            fontWeight: element.fontWeight || "normal",
                            fontFamily: element.fontFamily || "Arial",
                            textAlign: element.textAlign || "left",
                            width: "100%",
                            height: "100%",
                            backgroundColor: element.backgroundColor || "transparent",
                            textDecoration: element.type === "header" && element.underline ? "underline" : "none",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            boxSizing: "border-box"
                        }}
                        className={`cursor-move rounded transition-all 
                            ${isSelected ?
                                "border-blue-500 bg-blue-50 shadow-lg" :
                                "border-transparent hover:border-blue-300 hover:bg-blue-50"} ${selectedClass}`}
                        title={element.field}
                    >
                        {element.value || element.field}
                    </div>
                );
        }
    };

    const { width, height } = getDefaultSize();

    return (
        <Rnd
            enableRotation={true}
            onRotateStop={(angle) => {
                onUpdateElement({ ...element, rotation: angle }, index);
            }}

            size={{ width, height }}
            position={{ x: element.x || 0, y: element.y || 0 }}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            bounds="parent"
            disableDragging={isEditing || editingCell} // Disable drag when editing
            enableResizing={!isEditing && !editingCell} // Disable resize when editing

            style={{ cursor: 'move' }}
            resizeHandleClasses={{
                bottomRight: 'custom-resize-handle'
            }}
            className={`${isSelected ? 'z-10' : 'z-0'}`}
        >
            <div className="relative w-full h-full">
                {renderContent()}
                {isSelected && (
                    <button
                        onClick={handleDelete}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-20 shadow-md"
                        style={{ zIndex: 1000 }}
                    >
                        <Trash2 size={12} />
                    </button>
                )}
            </div>
        </Rnd>
    );
}