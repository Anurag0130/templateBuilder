export function LineElement({ element, isSelected }) {
  const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

  return (
    <div
      style={{
        width: element.width || 200,        // ✅ CHANGED: Use actual width
        height: element.lineWidth || 1,     // ✅ CHANGED: Use lineWidth as height
        backgroundColor: element.color || "#000000"
      }}
      className={`cursor-move ${selectedClass}`}
    />
  );
}