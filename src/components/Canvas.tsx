import React, { useRef } from "react";
import { Save, FileDown, Upload } from "lucide-react";
import { CanvasElement } from "./CanvasElement";

interface CanvasProps {
    elements: any[];
    onDropToPage: (coords: { x: number; y: number }) => void;
    onElementMove: (index: number, coords: { x: number; y: number }) => void;
    onSelectElement: (element: any, index: number | null) => void;
    selectedElement: any;
    onDeleteElement: (index: number) => void;
    onUpdateElement: (updatedElement: any, index: number) => void;
}

export function Canvas({
    elements,
    onDropToPage,
    onElementMove,
    onSelectElement,
    selectedElement,
    onDeleteElement,
    onUpdateElement
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

    return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
            <div className="flex gap-2 p-3 bg-white border-b border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Save size={16} />
                    Save Template
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <FileDown size={16} />
                    Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700">
                    <Upload size={16} />
                    Import Template
                </button>
            </div>

            <div className="flex-1 overflow-auto p-5">
                <div
                    ref={pageRef}
                    className="w-[794px] h-[1123px] bg-white mx-auto shadow-lg relative"
                    onDragOver={allowDrop}
                    onDrop={handleDrop}
                    onClick={handleCanvasClick}
                    style={{
                        backgroundImage: `
                            linear-gradient(90deg, #f8fafc 1px, transparent 1px),
                            linear-gradient(#f8fafc 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px"
                    }}
                >
                    {elements.map((element, index) => (
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
