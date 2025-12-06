import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { CanvasElement } from "./CanvasElement.jsx";
import { PageThumbnails } from "./PageThumbnails.jsx";
import PageSizeSelector from "./PageSizeSelector.jsx";
import { getButtonClass } from "../utils/styleHelpers.js";
import DummyJsonDataPanel from "./BackendJsonDataPanel.jsx";
import { MultiPageToolbar } from "./MultiPageToolbar.jsx";
import { SaveTemplateModal } from "./SaveTemplateModal.jsx";
import { Save, FileDown, Undo, Redo, Sparkles } from "lucide-react";
import { downloadAllPagesHTML, saveMultiPageTemplate } from "../utils/canvasExport.js";
import BackendJsonDataPanel from "./BackendJsonDataPanel.jsx";

const DRAG_OFFSET_X = 40;
const DRAG_OFFSET_Y = 10;

export function Canvas({
    elements = [],
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
    pages = [],
    currentPageIndex = 0,
    onPageChange,
    onAddPage,
    onDeletePage,
    onDuplicatePage,
    // ✅ NEW PROP for cell selection
    onCellSelect,
    savedPaPerSize = null
}) {

    const pageRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [paperSize, setPaperSize] = useState(() => ({
        name: "A4",
        width: "210mm",
        height: "297mm",
        orientation: "portrait",
    }));


    useEffect(() => {
        if (isEditMode && currentTemplateName) {
            setFileName(currentTemplateName);
            if (savedPaPerSize) {
                setPaperSize(savedPaPerSize);
            }
        } else if (!isEditMode) {
            setFileName("");
        }
    }, [isEditMode, currentTemplateName, savedPaPerSize]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            const isUndo = (e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey;
            const isRedo = ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") ||
                ((e.ctrlKey || e.metaKey) && e.key === "y");

            if (isUndo && canUndo && onUndo) {
                e.preventDefault();
                onUndo();
            } else if (isRedo && canRedo && onRedo) {
                e.preventDefault();
                onRedo();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [canUndo, canRedo, onUndo, onRedo]);



    const allowDrop = useCallback((e) => {
        e.preventDefault();
    }, []);


    const handleDrop = useCallback((e) => {
        e.preventDefault();
        if (!pageRef.current || !onDropToPage) return;

        const rect = pageRef.current.getBoundingClientRect();
        onDropToPage({
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        });
    }, [onDropToPage]);

    const handleElementDragEnd = useCallback((e, index) => {
        if (!pageRef.current || !onElementMove) return;

        const rect = pageRef.current.getBoundingClientRect();
        onElementMove(index, {
            x: Math.round(e.clientX - rect.left - DRAG_OFFSET_X),
            y: Math.round(e.clientY - rect.top - DRAG_OFFSET_Y)
        });
    }, [onElementMove]);




    const handleSaveTemplate = useCallback((templateName) => {
        setModalVisible(false);
        saveMultiPageTemplate(templateName, pages, isEditMode ? currentTemplateId : null, paperSize);
        setFileName(isEditMode ? templateName : "");
    }, [pages, isEditMode, currentTemplateId, paperSize]);


    const handleModalClose = useCallback(() => {
        setModalVisible(false);
        setFileName(isEditMode ? currentTemplateName : "");
    }, [isEditMode, currentTemplateName]);


    const handleExportPDF = useCallback(() => {
        downloadAllPagesHTML(pages, `template-${pages.length}-pages.html`, paperSize);
    }, [pages, paperSize]);


    const handlePageSizeChange = useCallback((size) => {
        setPaperSize(size);
    }, []);



    const elementsList = useMemo(() => elements || [], [elements]);


    const Toolbar = useMemo(() => {
        return function ToolbarInner() {
            return (
                <div className="flex gap-2 p-2.5 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm justify-between pr-4 z-50">
                    <div className="flex gap-1.5 mr-2 pr-2">
                        <button onClick={onUndo} disabled={!canUndo} className={getButtonClass(canUndo)} title="Undo (Ctrl+Z)">
                            <Undo size={14} /> Undo
                        </button>
                        <button onClick={onRedo} disabled={!canRedo} className={getButtonClass(canRedo)} title="Redo (Ctrl+Shift+Z)">
                            <Redo size={14} /> Redo
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <PageSizeSelector onChangePageSize={handlePageSizeChange} initialState={paperSize} />

                        <button className={getButtonClass(true, "primary")} onClick={() => setModalVisible(true)}>
                            <Save size={14} />
                            {isEditMode ? "Update Template" : "Save Template"}
                        </button>

                        <button className={getButtonClass(true, "secondary")} onClick={handleExportPDF}>
                            <FileDown size={14} />
                            Export PDF
                        </button>
                    </div>
                </div>
            );
        };
    }, [onUndo, onRedo, canUndo, canRedo, handlePageSizeChange, paperSize, isEditMode, handleExportPDF]);



    return (
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20 overflow-hidden">

            <Toolbar />

            <MultiPageToolbar
                pages={pages}
                currentIndex={currentPageIndex}
                onPageChange={onPageChange}
                onAddPage={onAddPage}
                onDeletePage={onDeletePage}
                onDuplicatePage={onDuplicatePage}
            />


            <div className="flex flex-1 overflow-hidden">
                <PageThumbnails
                    pages={pages}
                    currentIndex={currentPageIndex}
                    onChange={onPageChange}
                    onAddPage={onAddPage}
                />


                <div className="flex-1 overflow-auto p-6">
                    <div className="relative">
                        <div className="absolute -top-3 -left-3 w-48 h-48 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-3 -right-3 w-48 h-48 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

                        <div
                            ref={pageRef}
                            className="bg-white mx-auto shadow-xl relative rounded-lg border border-gray-200 overflow-hidden"
                            style={{
                                width: paperSize.width,
                                height: paperSize.height,
                                backgroundSize: "17px 17px"
                            }}
                            onDragOver={allowDrop}
                            onDrop={handleDrop}
                            onClick={() => onSelectElement?.(null, null)}
                        >
                            {elementsList.length === 0 && (
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

                            {elementsList?.map((element, index) => (
                                <CanvasElement
                                    key={element.id}
                                    element={element}
                                    index={index}
                                    isSelected={selectedElement?.id === element.id}
                                    onSelect={onSelectElement}
                                    onDragEnd={handleElementDragEnd}
                                    onDelete={onDeleteElement}
                                    onUpdateElement={onUpdateElement}
                                    // ✅ NEW PROP for cell selection
                                    onCellSelect={onCellSelect}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <BackendJsonDataPanel onDataChange={(data) => console.log("Template data updated:", data)} />
            </div>

            <SaveTemplateModal
                isOpen={modalVisible}
                onClose={handleModalClose}
                onSave={handleSaveTemplate}
                isEditMode={isEditMode}
                currentTemplateName={currentTemplateName}
                initialFileName={isEditMode ? currentTemplateName : ""}
            />
        </div>
    );
}
