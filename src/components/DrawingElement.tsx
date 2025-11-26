import React, { useRef, useEffect, useState } from "react";

interface DrawingElementProps {
    element: any;
    isSelected: boolean;
    onUpdate: (element: any) => void;
}

export function DrawingElement({ element, isSelected, onUpdate }: DrawingElementProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = element.width || 300;
        canvas.height = element.height || 200;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = element.color || "#000000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (element.strokes && Array.isArray(element.strokes)) {
            element.strokes.forEach((stroke: any) => {
                ctx.beginPath();
                ctx.strokeStyle = stroke.color || "#000000";
                ctx.lineWidth = stroke.width || 2;
                stroke.points.forEach((point: any, index: number) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke();
            });
        }

        if (isSelected) {
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.setLineDash([]);
        }
    }, [element, isSelected]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isSelected) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDrawing(true);
        const newStrokes = [...(element.strokes || [])];
        newStrokes.push({
            color: element.color || "#000000",
            width: 2,
            points: [{ x, y }]
        });

        onUpdate({ ...element, strokes: newStrokes });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !isSelected) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newStrokes = [...(element.strokes || [])];
        const lastStroke = newStrokes[newStrokes.length - 1];
        if (lastStroke) {
            lastStroke.points.push({ x, y });
        }

        onUpdate({ ...element, strokes: newStrokes });
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <div
            style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                position: "absolute",
                cursor: isSelected ? "crosshair" : "move",
                border: isSelected ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                borderRadius: "4px",
                overflow: "hidden"
            }}
        >
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    display: "block",
                    backgroundColor: "#ffffff",
                    cursor: isSelected ? "crosshair" : "default"
                }}
            />
        </div>
    );
}
