// TextElement.jsx
import { useState } from "react";

export function TextElement({ 
  element, 
  isSelected, 
  onDoubleClick, 
  onUpdateElement,
  onClick,
  onDoubleClick: onElemDoubleClick 
}) {
  const [editValue, setEditValue] = useState(element?.value || "");

  const handleBlur = () => {
    if (element.isEditing) {
      onUpdateElement({ ...element, value: editValue, isEditing: false });
      setEditValue(element.value || "");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditValue(prev => prev + "\n");
      return;
    }

    if (e.key === "Escape") {
      onUpdateElement({ ...element, isEditing: false });
      setEditValue(element.value || "");
    }
  };

  const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

  if (element.isEditing) {
    return (
      <textarea
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
          overflow: "auto", // Changed from hidden to auto for scrolling
          lineHeight: "1.5",
          resize: "none", // Disable browser resize
          boxSizing: "border-box"
        }}
        className="w-full h-full"
        onClick={(e) => e.stopPropagation()} // Prevent triggering parent click
      />
    );
  }

  return (
    <div
      onClick={onClick}
      onDoubleClick={onElemDoubleClick}
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
        overflow: "hidden", // Hide overflow in non-editing mode
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