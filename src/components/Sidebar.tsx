import React, { useState } from "react";
import { Search, X, ChevronRight, ChevronLeft } from "lucide-react";
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
    const [collapsed, setCollapsed] = useState(false);

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

    /* ----------------------------- COLLAPSED VIEW ----------------------------- */
    if (collapsed) {
        return (
            <div className="w-12 bg-white border-r border-gray-300 flex flex-col items-center shadow-sm">
                <button
                    className="w-full py-4 hover:bg-gray-100 transition flex items-center justify-center border-b border-gray-200"
                    onClick={() => setCollapsed(false)}
                    title="Expand sidebar"
                >
                    <ChevronRight size={20} className="text-gray-600" />
                </button>
                
                {/* Vertical tabs indicators */}
                <div className="flex flex-col gap-4 mt-6">
                    <div className="w-1 h-1 rounded-full bg-gray-400" title="Fields"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400" title="Elements"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400" title="Templates"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400" title="Properties"></div>
                </div>
            </div>
        );
    }

    /* -------------------------------- FULL VIEW ------------------------------- */
    return (
        <div className="w-96 border-r border-gray-300 bg-white flex flex-col h-screen shadow-lg">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white flex justify-between items-center flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-800">Template Builder</h2>
                <button
                    onClick={() => setCollapsed(true)}
                    className="p-2 hover:bg-white rounded-lg transition shadow-sm"
                    title="Collapse sidebar"
                >
                    <ChevronLeft size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-white border-b border-gray-200 flex-shrink-0">
                {["fields", "elements", "templates", "properties"].map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 py-3 px-3 text-xs font-medium transition-all ${
                            activeTab === tab
                                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tabs Content - with proper overflow handling */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === "fields" && (
                    <div className="flex flex-col h-full">
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    placeholder="Search fields..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {Object.entries(groupedFields).map(([group, fields]) => {
                                const filtered = filterFields(fields);
                                if (!filtered.length) return null;

                                return (
                                    <div key={group}>
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                                            {group}
                                        </h3>

                                        <div className="space-y-2">
                                            {filtered.map((field) => (
                                                <div
                                                    key={field}
                                                    draggable
                                                    onDragStart={(e) => onDragStart(e, field)}
                                                    className="bg-white p-3 border border-gray-200 rounded-lg cursor-grab hover:border-blue-400 hover:shadow-md transition-all active:cursor-grabbing"
                                                >
                                                    <span className="block text-sm font-medium text-gray-800 mb-1">
                                                        {field}
                                                    </span>
                                                    <span className="block text-xs text-gray-500 truncate">
                                                        {String(studentData[field as keyof typeof studentData] || "").substring(0, 35)}
                                                        {String(studentData[field as keyof typeof studentData] || "").length > 35
                                                            ? "..."
                                                            : ""}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === "elements" && (
                    <div className="p-4 space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
                            Layout Elements
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(elementTypes).map(([type, config]) => (
                                <button
                                    key={type}
                                    onClick={() => handleAddElement(type)}
                                    className="flex flex-col items-center gap-2 bg-white p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                                >
                                    <config.icon size={22} className="text-gray-600" />
                                    <span className="text-xs font-medium text-center text-gray-700">{config.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "templates" && (
                    <div className="p-4 space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
                            Quick Templates
                        </h3>

                        <div className="space-y-3">
                            {Object.entries(templatePresets).map(([key, template]) => (
                                <button
                                    key={key}
                                    onClick={() => onLoadTemplate(template.elements)}
                                    className="w-full text-left bg-white p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                                >
                                    <div className="font-medium text-sm text-gray-800 mb-1">{template.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {template.elements.length} elements
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "properties" && (
                    <div className="h-full">
                        {selectedElement ? (
                            <div className="p-4">
                                <div className="mb-4 pb-3 border-b border-gray-200">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Element Properties
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Customize selected element
                                    </p>
                                </div>
                                <ElementProperties
                                    selectedElement={selectedElement}
                                    onUpdateElement={onUpdateElement}
                                    fileInputRef={fileInputRef}
                                />
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center p-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">No element selected</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Click on an element in the canvas to view and edit its properties
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}