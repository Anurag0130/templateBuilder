// hooks/useElementInteractions.js
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
    onUpdateElement({
      ...element,
      x: position.x,
      y: position.y,
      width: ref.offsetWidth,
      height: ref.offsetHeight
    }, index);
  }, [element, index, onUpdateElement]);

  return {
    handleClick,
    handleDoubleClick,
    handleDelete,
    handleDragStop,
    handleResizeStop
  };
}