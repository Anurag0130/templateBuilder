import { useCallback } from "react";

export function useElementInteractions({
  element,
  index,
  onSelect,
  onDelete,
  onUpdateElement
}) {
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onSelect(element, index);
  }, [element, index, onSelect]);

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    if (element.type === "text" || element.type === "header") {
      onUpdateElement({ ...element, isEditing: true }, index);
    }
  }, [element, index, onUpdateElement]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    onDelete(index);
  }, [index, onDelete]);

  const handleDragStop = useCallback((e, d) => {
    onUpdateElement({
      ...element,
      x: d.x,
      y: d.y
    }, index);
  }, [element, index, onUpdateElement]);

  const handleResizeStop = useCallback((e, direction, ref, delta, position) => {
    // ✅ SPECIAL CASE: For line elements, map height to lineWidth
    if (element.type === 'line') {
      onUpdateElement({
        ...element,
        x: position.x,
        y: position.y,
        width: ref.offsetWidth,
        lineWidth: ref.offsetHeight  // ✅ Map height to lineWidth for lines
      }, index);
    } else {
      // For all other elements, use normal width and height
      onUpdateElement({
        ...element,
        x: position.x,
        y: position.y,
        width: ref.offsetWidth,
        height: ref.offsetHeight
      }, index);
    }
  }, [element, index, onUpdateElement]);

  return {
    handleClick,
    handleDoubleClick,
    handleDelete,
    handleDragStop,
    handleResizeStop
  };
}