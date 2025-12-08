// ImageElement.jsx
export function ImageElement({ element, isSelected, onClick, onDoubleClick }) {
  const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

  return (
    <div 
      className={`cursor-move ${selectedClass}`} 
      style={{ width: "100%", height: "100%" }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <img
        src={element.src}
        alt={element.alt || "Image"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        draggable="false" // Prevent image drag interference
      />
    </div>
  );
}