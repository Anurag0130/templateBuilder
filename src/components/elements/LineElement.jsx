// LineElement.jsx
export function LineElement({ element, isSelected }) {
  const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";

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
}