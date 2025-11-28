import { Canvas } from "../components/Canvas.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { useHistory } from "../hooks/useHistory.ts";
import { studentData } from "../templates/constants.js";
import React, { useState, useRef } from "react";

export default function TemplateBuilder() {
    // Use history hook for undo/redo functionality
    const {
        state: elements,
        setState: setElements,
        undo,
        redo,
        canUndo,
        canRedo
    } = useHistory([]);

    const fileInputRef = useRef(null);
    const [draggingField, setDraggingField] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const handleDragStart = (e, field) => {
        setDraggingField(field);
        try {
            e.dataTransfer.setData("text/plain", field);
        } catch (err) { }
    };

    const handleDropToPage = (coords) => {
        if (!draggingField) return;
        const newElement = {
            id: Date.now(),
            field: draggingField,
            value: draggingField || "",
            // value: studentData[draggingField] || "",
            x: coords.x - 8,
            y: coords.y - 8,
            fontSize: 12,
            fontWeight: "normal",
            color: "#000000",
            backgroundColor: "transparent",
            textAlign: "left",
            fontFamily: "Arial"
        };
        setElements([...elements, newElement]);
        setDraggingField(null);
    };

    const handleAddElement = (elementConfig) => {
        const newElement = {
            id: Date.now(),
            x: 50,
            y: 50,
            ...elementConfig
        };
        setElements([...elements, newElement]);
    };

    const handleLoadTemplate = (templateElements) => {
        // Clear selection when loading template
        setSelectedElement(null);
        setSelectedIndex(null);

        setElements(
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
        setElements(copy);
    };

    const handleSelectElement = (element, index) => {
        setSelectedElement(element);
        setSelectedIndex(index);
    };

    const handleUpdateElement = (updatedElement, index = selectedIndex) => {
        console.log('updatedElement', updatedElement)
        const copy = [...elements];
        copy[index] = updatedElement;
        setElements(copy);

        if (index === selectedIndex) {
            setSelectedElement(updatedElement);
        }
    };

    const handleDeleteElement = (index) => {
        setElements(elements.filter((_, i) => i !== index));
        setSelectedElement(null);
        setSelectedIndex(null);
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
                    elements={elements}
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
                />
            </div>
        </>
    );
}