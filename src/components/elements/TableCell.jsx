// TableCell.jsx
export function TableCell({
  row,
  col,
  element,
  cellInfo,
  cellWidth,
  cellHeight,
  isSelected,
  isEditing,
  onCellClick,
  onCellDoubleClick,
  onCellEditChange,
  onCellEditBlur,
  setEditingCell
}) {
  const cellKey = `${row}-${col}`;
  const cellContent = element.cellData?.[cellKey] || "";
  const cellStyles = (element.cellStyles && element.cellStyles[cellKey]) || {};

  const computedStyle = {
    width: `${cellWidth}px`,
    height: `${cellHeight}px`,
    border: `${element.borderWidth || 1}px solid ${element.borderColor || "#000000"}`,
    backgroundColor: cellStyles.backgroundColor,
    fontWeight: cellStyles.fontWeight,
    padding: 0,
    textAlign: cellStyles.textAlign,
    fontSize: cellStyles.fontSize ? `${cellStyles.fontSize}px` : undefined,
    color: cellStyles.color,
    fontStyle: cellStyles.fontStyle,
    textTransform: cellStyles.textTransform,
    textDecoration: cellStyles.textDecoration,
    fontFamily: cellStyles.fontFamily,
    boxSizing: "border-box"
  };

  return (
    <td
      className={`cursor-pointer hover:bg-blue-50 transition-colors ${isSelected ? "bg-blue-100" : ""}`}
      style={computedStyle}
      rowSpan={cellInfo.merge?.rowSpan || 1}
      colSpan={cellInfo.merge?.colSpan || 1}
      onClick={(e) => onCellClick(e, row, col)}
      onDoubleClick={(e) => onCellDoubleClick(e, row, col)}
    >
      {isEditing ? (
        <input
          type="text"
          value={cellContent}
          onChange={onCellEditChange}
          onBlur={onCellEditBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCellEditBlur();
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
          {cellContent || `Cell ${row + 1},${col + 1}`}
        </div>
      )}
    </td>
  );
}