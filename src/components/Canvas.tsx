import React, { useRef } from "react";
import { Save, FileDown, Upload, Undo, Redo } from "lucide-react";
import { CanvasElement } from "./CanvasElement";
import { downloadHTML } from "./canvasExport";

interface CanvasProps {
    elements: any[];
    onDropToPage: (coords: { x: number; y: number }) => void;
    onElementMove: (index: number, coords: { x: number; y: number }) => void;
    onSelectElement: (element: any, index: number | null) => void;
    selectedElement: any;
    onDeleteElement: (index: number) => void;
    onUpdateElement: (updatedElement: any, index: number) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
}

export function Canvas({
    elements,
    onDropToPage,
    onElementMove,
    onSelectElement,
    selectedElement,
    onDeleteElement,
    onUpdateElement,
    onUndo,
    onRedo,
    canUndo = false,
    canRedo = false
}: CanvasProps) {
    const pageRef = useRef<HTMLDivElement>(null);

    const allowDrop = (e: React.DragEvent) => e.preventDefault();

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);

        onDropToPage({ x, y });
    };

    const handleElementDragEnd = (e: React.DragEvent, index: number) => {
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left - 40);
        const y = Math.round(e.clientY - rect.top - 10);

        onElementMove(index, { x, y });
    };

    const handleCanvasClick = () => {
        onSelectElement(null, null);
    };

    // Keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+Z or Cmd+Z for Undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                if (canUndo && onUndo) {
                    onUndo();
                }
            }
            // Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y for Redo
            if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
                ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
                e.preventDefault();
                if (canRedo && onRedo) {
                    onRedo();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo, onUndo, onRedo]);

    return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
            <div className="flex gap-2 p-3 bg-white border-b border-gray-200">
                {/* Undo/Redo Group */}
                <div className="flex gap-1 mr-2 pr-2 border-r border-gray-300">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={`flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md transition-colors text-sm font-medium ${canUndo
                            ? 'bg-white hover:bg-gray-50 hover:border-blue-500 text-gray-700 cursor-pointer'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={16} />
                        Undo
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className={`flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md transition-colors text-sm font-medium ${canRedo
                            ? 'bg-white hover:bg-gray-50 hover:border-blue-500 text-gray-700 cursor-pointer'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo size={16} />
                        Redo
                    </button>
                </div>

                {/* Other Actions */}
                <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700"
                // onClick={() => downloadHTML(elements, 'my-canvas.html')}
                >
                    <Save size={16} />
                    Save Template
                </button>

                <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700"
                    onClick={() => downloadHTML(elements, `template-${Date.now()}.html`)}

                >
                    <FileDown size={16} />
                    Export PDF
                </button>

                {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Upload size={16} />
                    Import Template
                </button> */}
            </div>

            <div className="flex-1 overflow-auto p-5">
                <div
                    ref={pageRef}
                    className="w-[794px] h-[1123px] bg-white mx-auto shadow-lg relative"
                    onDragOver={allowDrop}
                    onDrop={handleDrop}
                    onClick={handleCanvasClick}
                    style={{
                        backgroundSize: "20px 20px"
                    }}
                >
                    {elements?.map((element, index) => (
                        <CanvasElement
                            key={element.id}
                            element={element}
                            index={index}
                            isSelected={selectedElement?.id === element.id}
                            onSelect={onSelectElement}
                            onDragEnd={handleElementDragEnd}
                            onDelete={onDeleteElement}
                            onUpdateElement={onUpdateElement}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}