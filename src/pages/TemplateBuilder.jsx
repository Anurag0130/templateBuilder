import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "../components/Canvas.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { useHistory } from "../hooks/useHistory.ts";
import { DummyJsonDataPanel } from "../components/DummyJsonDataPanel.jsx";
import { useLocation } from "react-router-dom";
import { templates as savedTemplates } from "../templates/templateStore";
export default function TemplateBuilder() {
    // Use history hook for undo/redo functionality
    const {
        state: elements,
        setState: setElements,
        undo,
        redo,
        canUndo,
        canRedo
    } =
        useHistory([]);
        // useHistory(currentPage?.elements);


    const fileInputRef = useRef(null);
    const [draggingField, setDraggingField] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);


    const location = useLocation();
    const incomingTemplateId = location?.state?.templateId || null;
    const isEditMode = location?.state?.mode === "edit" && incomingTemplateId;

    const [currentTemplateId, setCurrentTemplateId] = useState(null);
    const [currentTemplateName, setCurrentTemplateName] = useState("");

    useEffect(() => {
        if (!incomingTemplateId) return;
        // maan lo in future hm api hit krenge with tempalte id and database s mujhe template mil jayega
        const template = savedTemplates?.find(t => t?.id === incomingTemplateId);
        if (template && template?.elements) {
            setCurrentTemplateId(template?.id || "--");
            setCurrentTemplateName(template?.name || "--");

            setElements(
                template?.elements?.map(el => ({
                    ...el,
                    id: Date.now() + Math.random()
                }))
            );
        }
    }, [incomingTemplateId]);


    // Change from single elements array to pages array
    const [pages, setPages] = useState([
        { id: 1, elements: [] }
    ]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    // Get current page
    const currentPage = pages[currentPageIndex];

    // Update current page elements
    const updatePageElements = (newElements) => {
        const newPages = [...pages];
        newPages[currentPageIndex] = {
            ...currentPage,
            elements: newElements
        };
        setPages(newPages);
        setElements(newElements);

    };

    // Add new page
    const addPage = () => {
        const newPage = { id: Date.now(), elements: [] };
        setPages([...pages, newPage]);
        setCurrentPageIndex(pages.length);
        setSelectedElement(null);
        setSelectedIndex(null);
    };

    // Delete page
    const deletePage = () => {
        if (pages.length === 1) return;
        const newPages = pages.filter((_, i) => i !== currentPageIndex);
        setPages(newPages);
        setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
        setSelectedElement(null);
        setSelectedIndex(null);
    };

    // Duplicate page
    const duplicatePage = () => {
        const duplicated = {
            id: Date.now(),
            elements: currentPage.elements.map(el => ({
                ...el,
                id: Date.now() + Math.random()
            }))
        };
        const newPages = [...pages];
        newPages.splice(currentPageIndex + 1, 0, duplicated);
        setPages(newPages);
        setCurrentPageIndex(currentPageIndex + 1);
    };

    const handlePageChange = (newIndex) => {
        setCurrentPageIndex(newIndex);
        setSelectedElement(null);
        setSelectedIndex(null);
        setElements(pages[newIndex].elements);
    };

    // Update your handleDropToPage to use updatePageElements
    const handleDropToPage = (coords) => {
        if (!draggingField) return;
        const newElement = {
            id: Date.now(),
            field: draggingField,
            value: draggingField,
            x: coords.x - 8,
            y: coords.y - 8,
            // ... rest of your element config
        };
        updatePageElements([...currentPage.elements, newElement]);
        setDraggingField(null);
    };

    const handleDragStart = (e, field) => {
        setDraggingField(field);
        try {
            e.dataTransfer.setData("text/plain", field);
        } catch (err) { }
    };

    // const handleDropToPage = (coords) => {
    //     if (!draggingField) return;
    //     const newElement = {
    //         id: Date.now(),
    //         field: draggingField,
    //         value: draggingField || "",
    //         x: coords.x - 8,
    //         y: coords.y - 8,
    //         fontSize: 12,
    //         fontWeight: "normal",
    //         color: "#000000",
    //         backgroundColor: "transparent",
    //         textAlign: "left",
    //         fontFamily: "Arial"
    //     };
    //     setElements([...elements, newElement]);
    //     setDraggingField(null);
    // };

    const handleAddElement = (elementConfig) => {
        const newElement = {
            id: Date.now(),
            x: 50,
            y: 50,
            ...elementConfig
        };
        // setElements([...elements, newElement]);
        // ✅ Update current page elements (not global elements)
        updatePageElements([...currentPage.elements, newElement]);
    };

    const handleLoadTemplate = (templateElements) => {
        setSelectedElement(null);
        setSelectedIndex(null);

        // setElements(
        //     templateElements.map((el) => ({
        //         ...el,
        //         id: Date.now() + Math.random()
        //     }))
        // );
        // ✅ Load template into current page
        updatePageElements(
            templateElements.map((el) => ({
                ...el,
                id: Date.now() + Math.random()
            }))
        );
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleAddElement({
                    type: "image",
                    src: e.target?.result,
                    width: 200,
                    height: 150,
                    alt: "Uploaded Image"
                });
            };
            reader.readAsDataURL(file);
        }
        event.target.value = "";
    };

    const handleElementMove = (index, coords) => {
        const copy = [...elements];
        copy[index] = { ...copy[index], x: coords.x, y: coords.y };
        // setElements(copy);
        updatePageElements(copy);

    };

    const handleSelectElement = (element, index) => {
        setSelectedElement(element);
        setSelectedIndex(index);
    };

    const handleUpdateElement = (updatedElement, index = selectedIndex) => {
        console.log('updatedElement', updatedElement)
        const copy = [...elements];
        copy[index] = updatedElement;
        // setElements(copy);
        updatePageElements(copy);


        if (index === selectedIndex) {
            setSelectedElement(updatedElement);
        }
    };

    const handleDeleteElement = (index) => {
        // setElements(elements.filter((_, i) => i !== index));
        updatePageElements(currentPage.elements.filter((_, i) => i !== index));
        setSelectedElement(null);
        setSelectedIndex(null);
    };

    const handleDataChange = (newData) => {
        setTemplateData(newData);
        console.log('Template data updated:', newData);
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
                    onUpdateElement={handleUpdateElement}
                    onAddElement={handleAddElement}
                    fileInputRef={fileInputRef}
                    onLoadTemplate={handleLoadTemplate}
                />
                <Canvas
                    pages={pages}
                    currentPageIndex={currentPageIndex}
                    onPageChange={handlePageChange}
                    onAddPage={addPage}
                    onDeletePage={deletePage}
                    onDuplicatePage={duplicatePage}
                    elements={currentPage.elements}
                    onUpdateElements={updatePageElements}

                    // elements={elements}
                    onDropToPage={handleDropToPage}
                    onElementMove={handleElementMove}
                    onSelectElement={handleSelectElement}
                    selectedElement={selectedElement}
                    onDeleteElement={handleDeleteElement}
                    onUpdateElement={handleUpdateElement}
                    onUndo={undo}
                    onRedo={redo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    isEditMode={isEditMode}
                    currentTemplateId={currentTemplateId}
                    currentTemplateName={currentTemplateName}
                />
                <DummyJsonDataPanel onDataChange={handleDataChange} />
            </div>


        </>
    );
}