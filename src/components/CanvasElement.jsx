import { Rnd } from "react-rnd";
import { Trash2 } from "lucide-react";
import { TextElement } from "./elements/TextElement";
import { TableElement } from "./elements/TableElement";
import { ImageElement } from "./elements/ImageElement";
import { LineElement } from "./elements/LineElement";
import { LinkElement } from "./elements/LinkElement";
import { useElementInteractions } from "../hooks/useElementInteractions";
import { useElementSize } from "../hooks/useElementSize";
import { BoxElement } from "./elements/BoxElement";

export function CanvasElement({ element, index, isSelected, onSelect, onDelete, onUpdateElement, onCellSelect }) {

    const { handleClick, handleDoubleClick, handleDelete, handleDragStop, handleResizeStop } =
        useElementInteractions({
            element,
            index,
            onSelect,
            onDelete,
            onUpdateElement
        });

    const { width, height } = useElementSize(element);

    const renderElementContent = () => {
        const commonProps = {
            element,
            isSelected,
            onDoubleClick: handleDoubleClick,
            onUpdateElement: (updates) => onUpdateElement(updates, index)
        };

        switch (element.type) {
            case "link":
                return <LinkElement {...commonProps} />;
            case "table":
                return (
                    <TableElement
                        {...commonProps}
                        index={index}
                        onCellSelect={onCellSelect}
                    />
                );
            case "image":
                return <ImageElement {...commonProps} />;
            case "line":
                return <LineElement {...commonProps} />;
            case "box":
                return <BoxElement {...commonProps} />;
            case "header":
            case "text":
            default:
                return <TextElement {...commonProps} />;
        }
    };

    return (
        <Rnd
            bounds="parent"
            onClick={handleClick}
            size={{ width, height }}
            style={{ cursor: 'move' }}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            disableDragging={element.isEditing}
            enableResizing={!element.isEditing}
            className={`${isSelected ? 'z-10' : 'z-0'}`}
            position={{ x: element.x || 0, y: element.y || 0 }}
            resizeHandleClasses={{ bottomRight: 'custom-resize-handle' }}
        >
            <div className="relative w-full h-full">
                {renderElementContent()}
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