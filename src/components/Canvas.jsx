import { CanvasElement } from "./CanvasElement.jsx";
import React, { useRef, useState, useEffect } from "react";
import { SaveTemplateModal } from "./SaveTemplateModal.jsx";
import { Save, FileDown, Undo, Redo, Sparkles } from "lucide-react";
import { downloadHTML, saveTemplate } from "../utils/canvasExport.js";
import { PageThumbnails } from "./PageThumbnails.jsx";
import { BottomPageNavigation } from "./BottomPageNavigation.jsx";

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
    canRedo = false,

    isEditMode = false,
    currentTemplateId = null,
    currentTemplateName = "",


    // for multi pages 
    pages,
    currentPageIndex,
    onPageChange,
    onAddPage,
    onDeletePage,
    onDuplicatePage,
    // elements,
    onUpdateElements,
}) {

    const pageRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [modalvisible, setModalVisivble] = useState(false);


    useEffect(() => {
        if (isEditMode && currentTemplateName) {
            setFileName(currentTemplateName);
        }
    }, [isEditMode, currentTemplateName]);


    //key board shortcut h bhai undo and redo k liye
    useEffect(() => {
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



    const handleSaveTemplate = (templateName) => {
        setModalVisivble(false);
        saveTemplate(templateName, elements, isEditMode ? currentTemplateId : null);

        if (isEditMode) {
            setFileName(templateName);
        } else {
            setFileName("");
        }
    };


    const handleModalClose = () => {
        setModalVisivble(false);
        if (isEditMode) {
            setFileName(currentTemplateName);
        } else {
            setFileName("");
        }
    };




    return (
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20 overflow-hidden">
            <div className="flex gap-2 p-2.5 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">

                <div className="flex gap-1.5 mr-2 pr-2 border-r border-gray-200">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all text-xs font-semibold ${canUndo
                            ? 'bg-indigo-50/50 hover:bg-indigo-100/70 border border-indigo-200/60 text-indigo-600 cursor-pointer hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                            }`}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={14} />
                        Undo
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all text-xs font-semibold ${canRedo
                            ? 'bg-indigo-50/50 hover:bg-indigo-100/70 border border-indigo-200/60 text-indigo-600 cursor-pointer hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                            }`}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo size={14} />
                        Redo
                    </button>
                </div>


                <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-all text-xs font-semibold text-white shadow-md shadow-indigo-200/50 hover:shadow-lg hover:-translate-y-0.5"
                    onClick={() => setModalVisivble(true)}
                >
                    <Save size={14} />
                    {isEditMode ? "Update Template" : "Save Template"}
                </button>

                <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-white hover:bg-indigo-50/30 border border-gray-300 hover:border-indigo-300 transition-all text-xs font-semibold text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    onClick={() => downloadHTML(elements, `template - ${Date.now()}.html`)}
                >
                    <FileDown size={14} />
                    Export PDF
                </button>
            </div>

            {/* Add Page Thumbnails Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                <PageThumbnails
                    pages={pages}
                    currentIndex={currentPageIndex}
                    onChange={onPageChange}
                    onAddPage={onAddPage}
                />

                <div className="flex-1 overflow-auto p-6">
                    <div className="relative">
                        <div className="absolute -top-3 -left-3 w-48 h-48 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-3 -right-3 w-48 h-48 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

                        <div
                            ref={pageRef}
                            className="bg-white mx-auto shadow-xl relative rounded-lg border border-gray-200 overflow-hidden"
                            style={{
                                width: '680px',
                                height: '954px',
                                backgroundSize: '17px 17px'
                            }}
                            onDragOver={allowDrop}
                            onDrop={handleDrop}
                            onClick={handleCanvasClick}
                        >
                            {elements?.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center shadow-md">
                                            <Sparkles className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <p className="text-base font-semibold text-gray-700 mb-1.5">
                                            {isEditMode ? "Edit Your Template" : "Start Building Your Template"}
                                        </p>
                                        <p className="text-xs text-gray-500 max-w-xs">
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


                {/* Bottom Navigation */}


            </div>

            <BottomPageNavigation
                pages={pages}
                currentIndex={currentPageIndex}
                onPageChange={onPageChange}
                onAddPage={onAddPage}
                onDeletePage={onDeletePage}
                onDuplicatePage={onDuplicatePage}
            />

            <SaveTemplateModal
                isOpen={modalvisible}
                onClose={handleModalClose}
                onSave={handleSaveTemplate}
                isEditMode={isEditMode}
                currentTemplateName={currentTemplateName}
                initialFileName={isEditMode ? currentTemplateName : ""}
            />

        </div>
    );
}