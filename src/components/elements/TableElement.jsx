// TableElement.jsx
import { useState } from "react";
import { TableCell } from "./TableCell";
import { Merge, SplitSquareHorizontal } from "lucide-react";

export function TableElement({ element, isSelected, index, onCellSelect, onUpdateElement }) {
    const [selectedCells, setSelectedCells] = useState([]);
    const [editingCell, setEditingCell] = useState(null);

    const { width, height } = {
        width: element.width || 400,
        height: element.height || 150
    };

    const cellWidth = width / (element.cols || 2);
    const cellHeight = height / (element.rows || 2);

    const handleCellClick = (e, row, col) => {
        e.stopPropagation();
        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl) {
            const exists = selectedCells.some(c => c.row === row && c.col === col);
            const newSelectedCells = exists
                ? selectedCells.filter(c => !(c.row === row && c.col === col))
                : [...selectedCells, { row, col }];

            setSelectedCells(newSelectedCells);
            notifyCellSelect(newSelectedCells);
        } else {
            setSelectedCells([{ row, col }]);
            notifyCellSelect([{ row, col }]);
        }
    };

    const handleCellDoubleClick = (e, row, col) => {
        e.stopPropagation();
        setEditingCell({ row, col });
    };

    const handleCellEditChange = (e) => {
        if (!editingCell) return;
        const cellKey = `${editingCell.row}-${editingCell.col}`;
        const newCellData = { ...(element.cellData || {}) };
        newCellData[cellKey] = e.target.value;
        onUpdateElement({ ...element, cellData: newCellData });
    };

    const handleCellEditBlur = () => {
        setEditingCell(null);
    };

    const notifyCellSelect = (selectedCells) => {
        if (!onCellSelect || selectedCells.length === 0) return;

        const firstCell = selectedCells[0];
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
            selectedCells: selectedCells,
            isMultiSelect: selectedCells.length > 1
        });
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
                return { merged: true, isStart: row === startRow && col === startCol, merge, startKey: key };
            }
        }
        return { merged: false, isStart: false, merge: null, startKey: null };
    };

    // ✅ NEW: Merge selected cells
    const handleMergeCells = (e) => {
        e.stopPropagation();
        if (selectedCells.length < 2) return;

        // Find the bounding box of selected cells
        const rows = selectedCells.map(c => c.row);
        const cols = selectedCells.map(c => c.col);
        const minRow = Math.min(...rows);
        const maxRow = Math.max(...rows);
        const minCol = Math.min(...cols);
        const maxCol = Math.max(...cols);

        const rowSpan = maxRow - minRow + 1;
        const colSpan = maxCol - minCol + 1;

        // Check if selection forms a rectangle
        const expectedCells = rowSpan * colSpan;
        if (selectedCells.length !== expectedCells) {
            alert('Please select a rectangular area of cells to merge');
            return;
        }

        const mergeKey = `${minRow}-${minCol}`;
        const newMergedCells = { ...(element.mergedCells || {}) };
        
        newMergedCells[mergeKey] = { rowSpan, colSpan };

        onUpdateElement({ ...element, mergedCells: newMergedCells });
        setSelectedCells([]);
        if (onCellSelect) onCellSelect(null);
    };

    // ✅ NEW: Split merged cell
    const handleSplitCell = (e) => {
        e.stopPropagation();
        if (selectedCells.length !== 1) return;

        const { row, col } = selectedCells[0];
        const cellInfo = isCellMerged(row, col);

        if (!cellInfo.merged || !cellInfo.startKey) {
            alert('This cell is not merged');
            return;
        }

        const newMergedCells = { ...(element.mergedCells || {}) };
        delete newMergedCells[cellInfo.startKey];

        onUpdateElement({ ...element, mergedCells: newMergedCells });
        setSelectedCells([]);
        if (onCellSelect) onCellSelect(null);
    };

    const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

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
                                if (cellInfo.merged && !cellInfo.isStart) return null;

                                return (
                                    <TableCell
                                        key={colIdx}
                                        row={rowIdx}
                                        col={colIdx}
                                        element={element}
                                        cellInfo={cellInfo}
                                        cellWidth={cellWidth}
                                        cellHeight={cellHeight}
                                        isSelected={selectedCells.some(c => c.row === rowIdx && c.col === colIdx)}
                                        isEditing={editingCell?.row === rowIdx && editingCell?.col === colIdx}
                                        onCellClick={handleCellClick}
                                        onCellDoubleClick={handleCellDoubleClick}
                                        onCellEditChange={handleCellEditChange}
                                        onCellEditBlur={handleCellEditBlur}
                                        setEditingCell={setEditingCell}
                                    />
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ NEW: Merge/Split Controls */}
            {selectedCells.length > 0 && (
                <div className="mt-2 flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                    <div className="text-xs text-blue-600 flex-1">
                        {selectedCells.length} cell(s) selected
                    </div>
                    
                    {selectedCells.length > 1 && (
                        <button
                            onClick={handleMergeCells}
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                        >
                            <Merge size={12} />
                            Merge
                        </button>
                    )}
                    
                    {selectedCells.length === 1 && isCellMerged(selectedCells[0].row, selectedCells[0].col).merged && (
                        <button
                            onClick={handleSplitCell}
                            className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center gap-1"
                        >
                            <SplitSquareHorizontal size={12} />
                            Split
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}