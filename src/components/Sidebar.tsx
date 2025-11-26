import React, { useState } from "react";
import { Search } from "lucide-react";
import { groupedFields, elementTypes, templatePresets, studentData } from "./constants";
import { ElementProperties } from "./ElementProperties";

interface SidebarProps {
    onDragStart: (e: any, field: string) => void;
    selectedElement: any;
    onUpdateElement: (element: any) => void;
    onAddElement: (config: any) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onLoadTemplate: (elements: any[]) => void;
}

export function Sidebar({
    onDragStart,
    selectedElement,
    onUpdateElement,
    onAddElement,
    fileInputRef,
    onLoadTemplate
}: SidebarProps) {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("fields");

    const filterFields = (fields: string[]) =>
        fields.filter((f) => f.toLowerCase().includes(query.toLowerCase()));

    const handleAddElement = (type: string) => {
        const elementConfig = elementTypes[type as keyof typeof elementTypes];
        if (elementConfig) {
            if (type === "image") {
                fileInputRef.current?.click();
            } else {
                onAddElement(elementConfig.defaultProps);
            }
        }
    };

    return (
        <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold text-gray-800">Template Builder</h2>
            </div>

            <div className="flex bg-white border-b border-gray-200">
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        activeTab === "fields" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("fields")}
                >
                    Fields
                </button>
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        activeTab === "elements" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("elements")}
                >
                    Elements
                </button>
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        activeTab === "templates" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("templates")}
                >
                    Templates
                </button>
                <button
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        activeTab === "properties" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("properties")}
                >
                    Properties
                </button>
            </div>

            {activeTab === "fields" && (
                <>
                    <div className="relative p-4 bg-white border-b border-gray-200">
                        <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Search fields..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {Object.entries(groupedFields).map(([group, fields]) => {
                            const filtered = filterFields(fields);
                            if (!filtered.length) return null;

                            return (
                                <div key={group} className="mb-6">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                        {group}
                                    </h3>
                                    {filtered.map((field) => (
                                        <div
                                            key={field}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, field)}
                                            className="bg-white p-3 mb-2 border border-gray-200 rounded-md cursor-grab hover:border-blue-500 hover:shadow-sm transition-all active:cursor-grabbing"
                                        >
                                            <span className="block text-xs font-medium text-gray-800 mb-1">
                                                {field}
                                            </span>
                                            <span className="block text-xs text-gray-500 truncate">
                                                {String(studentData[field as keyof typeof studentData] || "").substring(0, 25)}
                                                {String(studentData[field as keyof typeof studentData] || "").length > 25 ? "..." : ""}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {activeTab === "elements" && (
                <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Layout Elements
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(elementTypes).map(([type, config]) => (
                            <button
                                key={type}
                                onClick={() => handleAddElement(type)}
                                className="flex flex-col items-center gap-2 bg-white p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow-sm transition-all"
                            >
                                <config.icon size={18} className="text-gray-600" />
                                <span className="text-xs font-medium text-center">{config.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "templates" && (
                <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Quick Templates
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(templatePresets).map(([key, template]) => (
                            <button
                                key={key}
                                onClick={() => onLoadTemplate(template.elements)}
                                className="w-full text-left bg-white p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow-sm transition-all"
                            >
                                <div className="font-medium text-sm text-gray-800">{template.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {template.elements.length} elements
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "properties" && (
                <ElementProperties
                    selectedElement={selectedElement}
                    onUpdateElement={onUpdateElement}
                    fileInputRef={fileInputRef}
                />
            )}
        </div>
    );
}
