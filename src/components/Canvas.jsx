import React, { useRef } from "react";
import { CanvasElement } from "./CanvasElement.jsx";
import { Save, FileDown, Undo, Redo, Sparkles } from "lucide-react";
import { downloadHTML, saveTemplate } from "../utils/canvasExport.js";

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
}) {
    const pageRef = useRef(null);

    const allowDrop = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);

        onDropToPage({ x, y });
    };

    const handleElementDragEnd = (e, index) => {
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
        const handleKeyDown = (e) => {
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
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20 overflow-hidden">
            {/* Toolbar - Modern gradient design */}
            <div className="flex gap-3 p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                {/* Undo/Redo Group */}
                <div className="flex gap-2 mr-3 pr-3 border-r border-gray-200">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-semibold ${
                            canUndo
                                ? 'bg-indigo-50/50 hover:bg-indigo-100/70 border border-indigo-200/60 text-indigo-600 cursor-pointer hover:shadow-md hover:-translate-y-0.5'
                                : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                        }`}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={16} />
                        Undo
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-semibold ${
                            canRedo
                                ? 'bg-indigo-50/50 hover:bg-indigo-100/70 border border-indigo-200/60 text-indigo-600 cursor-pointer hover:shadow-md hover:-translate-y-0.5'
                                : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                        }`}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo size={16} />
                        Redo
                    </button>
                </div>

                {/* Action Buttons */}
                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all text-sm font-semibold text-white shadow-md shadow-indigo-200/50 hover:shadow-lg hover:-translate-y-0.5"
                    onClick={() => saveTemplate(`template-${Date.now()}.html`, elements)}
                >
                    <Save size={16} />
                    Save Template
                </button>

                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-indigo-50/30 border border-gray-300 hover:border-indigo-300 transition-all text-sm font-semibold text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    onClick={() => downloadHTML(elements, `template-${Date.now()}.html`)}
                >
                    <FileDown size={16} />
                    Export PDF
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto p-8">
                <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Page */}
                    <div
                        ref={pageRef}
                        className="w-[794px] h-[1123px] bg-white mx-auto shadow-xl relative rounded-lg border border-gray-200 overflow-hidden"
                        onDragOver={allowDrop}
                        onDrop={handleDrop}
                        onClick={handleCanvasClick}
                        style={{
                            backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    >
                        {elements?.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center shadow-md">
                                        <Sparkles className="w-10 h-10 text-indigo-500" />
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700 mb-2">Start Building Your Template</p>
                                    <p className="text-sm text-gray-500 max-w-xs">
                                        Drag fields and elements from the sidebar to create your perfect template
                                    </p>
                                </div>
                            </div>
                        )}

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
        </div>
    );
}