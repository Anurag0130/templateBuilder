import React, { useState, useRef } from "react";
import { studentData, elementTypes } from "./constants";
import { Sidebar } from "./Sidebar";
import { Canvas } from "./Canvas";

export default function MainTemplateBuilder() {
    const [elements, setElements] = useState([]);
    const [draggingField, setDraggingField] = useState<string | null>(null);
    const [selectedElement, setSelectedElement] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragStart = (e: React.DragEvent, field: string) => {
        setDraggingField(field);
        try {
            e.dataTransfer.setData("text/plain", field);
        } catch (err) {}
    };

    const handleDropToPage = (coords: { x: number; y: number }) => {
        if (!draggingField) return;

        const newElement = {
            id: Date.now(),
            field: draggingField,
            value: studentData[draggingField as keyof typeof studentData] || "",
            x: coords.x - 8,
            y: coords.y - 8,
            fontSize: 12,
            fontWeight: "normal",
            color: "#000000",
            backgroundColor: "transparent",
            textAlign: "left",
            fontFamily: "Arial"
        };

        setElements((prev) => [...prev, newElement]);
        setDraggingField(null);
    };

    const handleAddElement = (elementConfig: any) => {
        const newElement = {
            id: Date.now(),
            x: 50,
            y: 50,
            ...elementConfig
        };
        setElements((prev) => [...prev, newElement]);
    };

    const handleLoadTemplate = (templateElements: any[]) => {
        setElements(
            templateElements.map((el) => ({
                ...el,
                id: Date.now() + Math.random()
            }))
        );
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleElementMove = (index: number, coords: { x: number; y: number }) => {
        setElements((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], x: coords.x, y: coords.y };
            return copy;
        });
    };

    const handleSelectElement = (element: any, index: number | null) => {
        setSelectedElement(element);
        setSelectedIndex(index);
    };

    const handleUpdateElement = (updatedElement: any, index: number = selectedIndex!) => {
        setElements((prev) => {
            const copy = [...prev];
            copy[index] = updatedElement;
            return copy;
        });
        if (index === selectedIndex) {
            setSelectedElement(updatedElement);
        }
    };

    const handleDeleteElement = (index: number) => {
        setElements((prev) => prev.filter((_, i) => i !== index));
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
                />
            </div>
        </>
    );
}
