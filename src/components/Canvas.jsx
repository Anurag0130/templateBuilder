import { CanvasElement } from "./CanvasElement.jsx";
import { useRef, useState, useEffect } from "react";
import { PageThumbnails } from "./PageThumbnails.jsx";
import { getButtonClass } from "../utils/styleHelpers.js";
import { SaveTemplateModal } from "./SaveTemplateModal.jsx";
import { BottomPageNavigation } from "./BottomPageNavigation.jsx";
import { Save, FileDown, Undo, Redo, Sparkles } from "lucide-react";
import { downloadAllPagesHTML, saveMultiPageTemplate } from "../utils/canvasExport.js";
import PageSizeSelector from "./PageSizeSelector.jsx";
import DummyJsonDataPanel from "./DummyJsonDataPanel.jsx";



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
    pages,
    currentPageIndex,
    onPageChange,
    onAddPage,
    onDeletePage,
    onDuplicatePage,
}) {
    const pageRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        if (isEditMode && currentTemplateName) {
            setFileName(currentTemplateName);
        }
    }, [isEditMode, currentTemplateName]);


    // keyboard shortcut h undo redo k liye
    useEffect(() => {
        const handleKeyDown = (e) => {
            const isUndo = (e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey;
            const isRedo = ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
                ((e.ctrlKey || e.metaKey) && e.key === 'y');

            if (isUndo && canUndo && onUndo) {
                e.preventDefault();
                onUndo();
            } else if (isRedo && canRedo && onRedo) {
                e.preventDefault();
                onRedo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo, onUndo, onRedo]);

    // ===== DRAG & DROP HANDLERS =====

    const allowDrop = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        onDropToPage({
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        });
    };

    const handleElementDragEnd = (e, index) => {
        if (!pageRef.current) return;

        const rect = pageRef.current.getBoundingClientRect();
        onElementMove(index, {
            x: Math.round(e.clientX - rect.left - 40),
            y: Math.round(e.clientY - rect.top - 10)
        });
    };



    const handleSaveTemplate = (templateName) => {
        setModalVisible(false);
        saveMultiPageTemplate(templateName, pages, isEditMode ? currentTemplateId : null, paperSize);
        setFileName(isEditMode ? templateName : "");
    };



    const handleModalClose = () => {
        setModalVisible(false);
        if (isEditMode) {
            setFileName(currentTemplateName);
        } else {
            setFileName("");
        }
    };

    const handleExportPDF = () => {
        downloadAllPagesHTML(pages, `template-${pages.length}-pages.html`, paperSize);
    };

    const [paperSize, setPaperSize] = useState({
        name: "A4",
        width: "680px",
        height: "954px",
        orientation: "portrait"
    });


    const handlePageSizeChange = (size) => {
        setPaperSize(size);
    };


    // ===== RENDER =====

    return (
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20 overflow-hidden">
            {/* Toolbar */}
            <div className="flex gap-2 p-2.5 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm justify-between pr-4 z-50">
                {/* Undo/Redo Group */}
                <div className="flex gap-1.5 mr-2 pr-">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={getButtonClass(canUndo)}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={14} />
                        Undo
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className={getButtonClass(canRedo)}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo size={14} />
                        Redo
                    </button>
                </div>


                <div className="flex gap-4">
                    <PageSizeSelector onChangePageSize={handlePageSizeChange} />

                    <button
                        className={getButtonClass(true, 'primary')}
                        onClick={() => setModalVisible(true)}
                    >
                        <Save size={14} />
                        {isEditMode ? "Update Template" : "Save Template"}
                    </button>

                    <button
                        className={getButtonClass(true, 'secondary')}
                        onClick={handleExportPDF}
                    >
                        <FileDown size={14} />
                        Export PDF
                    </button>

                    {/* <PageSizeSelector onChangePageSize={handlePageSizeChange} /> */}

                </div>
            </div>

            <BottomPageNavigation
                pages={pages}
                currentIndex={currentPageIndex}
                onPageChange={onPageChange}
                onAddPage={onAddPage}
                onDeletePage={onDeletePage}
                onDuplicatePage={onDuplicatePage}
            />

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                <PageThumbnails
                    pages={pages}
                    currentIndex={currentPageIndex}
                    onChange={onPageChange}
                    onAddPage={onAddPage}
                />

                {/* Canvas Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="relative">
                        <div className="absolute -top-3 -left-3 w-48 h-48 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-3 -right-3 w-48 h-48 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

                        <div
                            ref={pageRef}
                            className="bg-white mx-auto shadow-xl relative rounded-lg border border-gray-200 overflow-hidden"
                            // style={{ width: '680px', height: '954px', backgroundSize: '17px 17px' }}
                            // style={{
                            //     width: paperSize === "A4" ? "680px" : "559px",
                            //     height: paperSize === "A4" ? "954px" : "794px",

                            //     minWidth: paperSize === "A4" ? "680px" : "559px",
                            //     minHeight: paperSize === "A4" ? "954px" : "794px",
                            //     backgroundSize: "17px 17px",
                            // }}
                            style={{
                                width: paperSize.width,
                                height: paperSize.height,
                                // minWidth: paperSize.width,
                                // minHeight: paperSize.height,

                                backgroundSize: "17px 17px",
                            }}


                            onDragOver={allowDrop}
                            onDrop={handleDrop}
                            onClick={() => onSelectElement(null, null)}
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
                <DummyJsonDataPanel onDataChange={(data) => console.log('Template data updated:', data)} />
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