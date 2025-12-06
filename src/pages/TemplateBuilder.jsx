import { useLocation } from "react-router-dom";
import { Canvas } from "../components/Canvas.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { useState, useRef, useEffect } from "react";
import { templates as savedTemplates } from "../templates/templateStore";

export default function TemplateBuilder() {
    const fileInputRef = useRef(null);
    const location = useLocation();


    const incomingTemplateId = location?.state?.templateId || null;
    const isEditMode = location?.state?.mode === "edit" && incomingTemplateId;

    const [currentTemplateId, setCurrentTemplateId] = useState(null);
    const [currentTemplateName, setCurrentTemplateName] = useState("");
    const [savedPaPerSize, setSavedPaperSize] = useState("")
    // Element state
    const [draggingField, setDraggingField] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    // ✅ NEW: Cell selection state
    const [selectedCellInfo, setSelectedCellInfo] = useState(null);

    // Pages state
    const [pages, setPages] = useState([{
        id: 1,
        elements: [],
        history: [[]],
        historyIndex: 0
    }]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);


    const currentPage = pages[currentPageIndex];
    const canUndo = currentPage?.historyIndex > 0;
    const canRedo = currentPage?.historyIndex < currentPage?.history?.length - 1;


    const clearSelection = () => {
        setSelectedElement(null);
        setSelectedIndex(null);
         // ✅ NEW: Clear cell selection bhi
        setSelectedCellInfo(null);
    };

    const updatePage = (pageUpdates) => {
        const newPages = [...pages];
        newPages[currentPageIndex] = { ...currentPage, ...pageUpdates };
        setPages(newPages);
    };

    const updatePageElements = (newElements, addToHistory = true) => {
        const updates = { elements: newElements };

        if (addToHistory) {
            const newHistory = currentPage?.history?.slice(0, currentPage?.historyIndex + 1);
            newHistory?.push(newElements);

            if (newHistory.length > 50) {
                newHistory?.shift();
            } else {
                updates.historyIndex = currentPage.historyIndex + 1;
            }

            updates.history = newHistory;
        }

        updatePage(updates);
    };

    // ===== UNDO/REDO =====

    const undo = () => {
        if (!canUndo) return;
        updatePage({
            historyIndex: currentPage.historyIndex - 1,
            elements: currentPage.history[currentPage.historyIndex - 1]
        });
        clearSelection();
    };

    const redo = () => {
        if (!canRedo) return;
        updatePage({
            historyIndex: currentPage.historyIndex + 1,
            elements: currentPage.history[currentPage.historyIndex + 1]
        });
        clearSelection();
    };

    // ===== PAGE OPERATIONS =====

    const pageOperations = {
        add: () => {
            setPages([...pages, {
                id: Date.now(),
                elements: [],
                history: [[]],
                historyIndex: 0
            }]);
            setCurrentPageIndex(pages.length);
            clearSelection();
        },

        delete: () => {
            if (pages.length === 1) {
                alert("You must have at least one page!");
                return;
            }
            setPages(pages.filter((_, i) => i !== currentPageIndex));
            setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
            clearSelection();
        },

        duplicate: () => {
            const duplicateElements = (els) => els.map(el => ({
                ...el,
                id: Date.now() + Math.random()
            }));

            const duplicated = {
                id: Date.now(),
                elements: duplicateElements(currentPage.elements),
                history: [duplicateElements(currentPage.elements)],
                historyIndex: 0
            };

            const newPages = [...pages];
            newPages.splice(currentPageIndex + 1, 0, duplicated);
            setPages(newPages);
            setCurrentPageIndex(currentPageIndex + 1);
        },

        change: (newIndex) => {
            setCurrentPageIndex(newIndex);
            clearSelection();
        }
    };

    // ===== ELEMENT OPERATIONS =====

    const elementOperations = {
        add: (elementConfig) => {
            updatePageElements([...currentPage.elements, {
                id: Date.now(),
                x: 50,
                y: 50,
                ...elementConfig
            }]);
        },

        update: (updatedElement, index = selectedIndex) => {
            const copy = [...currentPage.elements];
            copy[index] = updatedElement;
            updatePageElements(copy);
            if (index === selectedIndex) setSelectedElement(updatedElement);

             // ✅ NEW: Agar cell selected hai toh uski info bhi update karo
            if (selectedCellInfo && selectedCellInfo.elementIndex === index) {
                const cellKey = selectedCellInfo.cellKey;
                const updatedStyles = updatedElement.cellStyles?.[cellKey] || {};
                const updatedData = updatedElement.cellData?.[cellKey] || "";
                
                setSelectedCellInfo({
                    ...selectedCellInfo,
                    element: updatedElement,
                    styles: updatedStyles,
                    cellData: updatedData
                });
            }
        },

        delete: (index) => {
            updatePageElements(currentPage.elements.filter((_, i) => i !== index));
            clearSelection();
        },

        select: (element, index) => {
            setSelectedElement(element);
            setSelectedIndex(index);
             // ✅ NEW: Element select hone pe cell selection clear karo
            setSelectedCellInfo(null);
        },

        move: (index, coords) => {
            const copy = [...currentPage.elements];
            copy[index] = { ...copy[index], x: coords.x, y: coords.y };
            updatePageElements(copy);
        },

        drop: (coords) => {
            if (!draggingField) return;

            updatePageElements([...currentPage.elements, {
                id: Date.now(),
                type: "text",
                field: draggingField,
                value: draggingField || "",
                x: coords.x - 8,
                y: coords.y - 8,
                fontSize: 12,
                fontWeight: "normal",
                color: "#000000",
                backgroundColor: "transparent",
                textAlign: "left",
                fontFamily: "Arial"
            }]);
            setDraggingField(null);
        }
    };

    // ✅ NEW: Cell selection handler
    const handleCellSelect = (cellInfo) => {
        console.log("Cell selected:", cellInfo); // Debug
        setSelectedCellInfo(cellInfo);
        // Cell select hone pe element selection clear karo
        setSelectedElement(null);
        setSelectedIndex(null);
    };

    // ✅ NEW: Cell style update handler
    const handleUpdateCellStyle = (newStyles) => {
        if (!selectedCellInfo) return;

        const element = currentPage.elements[selectedCellInfo.elementIndex];
        
        const updatedCellStyles = {
            ...(element.cellStyles || {}),
            [selectedCellInfo.cellKey]: {
                ...(element.cellStyles?.[selectedCellInfo.cellKey] || {}),
                ...newStyles
            }
        };

        const updatedElement = {
            ...element,
            cellStyles: updatedCellStyles
        };

        elementOperations.update(updatedElement, selectedCellInfo.elementIndex);
           // ✅ selectedCellInfo ko bhi update karo
        setSelectedCellInfo({
            ...selectedCellInfo,
            styles: {
                ...selectedCellInfo.styles,
                ...newStyles
            }
        });
    };

    // ✅ NEW: Clear cell selection handler
    const handleClearCellSelection = () => {
        setSelectedCellInfo(null);
    };


    const handleLoadTemplate = (templateElements) => {
        clearSelection();
        updatePageElements(
            templateElements.map(el => ({
                ...el,
                id: Date.now() + Math.random()
            }))
        );
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            elementOperations.add({
                type: "image",
                src: e.target?.result,
                width: 200,
                height: 150,
                alt: "Uploaded Image"
            });
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    };



    // Load template in edit mode
    useEffect(() => {
        if (!incomingTemplateId) return;
        const template = savedTemplates?.find(t => t?.id === incomingTemplateId);
        if (template?.pages) {
            setCurrentTemplateId(template.id || "--");
            setCurrentTemplateName(template.name || "--");
            setPages(template.pages);
            setCurrentPageIndex(0);
            setSavedPaperSize(template?.pageSize)
        }
    }, [incomingTemplateId]);


    // Keyboard shortcuts undo redo k liye
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                if (canUndo) undo();
            }
            if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
                ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
                e.preventDefault();
                if (canRedo) redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo, currentPageIndex, pages]);


    // ===== DRAG HANDLERS =====
    const handleDragStart = (e, field) => {
        setDraggingField(field);
        try {
            e.dataTransfer.setData("text/plain", field);
        } catch (err) { }
    };



    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
            <div className="flex h-screen font-sans">
                <Sidebar
                    onDragStart={handleDragStart}
                    selectedElement={selectedElement}
                    onUpdateElement={elementOperations.update}
                    onAddElement={elementOperations.add}
                    fileInputRef={fileInputRef}
                    onLoadTemplate={handleLoadTemplate}
                     // ✅ NEW PROPS for cell editing
                    selectedCellInfo={selectedCellInfo}
                    onUpdateCellStyle={handleUpdateCellStyle}
                    onClearCellSelection={handleClearCellSelection}
                />
                <Canvas
                    pages={pages}
                    savedPaPerSize={savedPaPerSize}
                    currentPageIndex={currentPageIndex}
                    onPageChange={pageOperations.change}
                    onAddPage={pageOperations.add}
                    onDeletePage={pageOperations.delete}
                    onDuplicatePage={pageOperations.duplicate}
                    elements={currentPage.elements}
                    onUpdateElements={updatePageElements}
                    onDropToPage={elementOperations.drop}
                    onElementMove={elementOperations.move}
                    onSelectElement={elementOperations.select}
                    selectedElement={selectedElement}
                    onDeleteElement={elementOperations.delete}
                    onUpdateElement={elementOperations.update}
                    onUndo={undo}
                    onRedo={redo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    isEditMode={isEditMode}
                    currentTemplateId={currentTemplateId}
                    currentTemplateName={currentTemplateName}
                     // ✅ NEW PROP for cell selection
                    onCellSelect={handleCellSelect}
                />
            </div>
        </>
    );
}