// LinkElement.jsx
export function LinkElement({ element, isSelected, onClick, onDoubleClick }) {
  const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

  return (
    <div 
      className={`cursor-move ${selectedClass}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        draggable="false"
      >
        {element.text || "Click Here"}
      </a>
    </div>
  );
}