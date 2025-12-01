import { useState } from "react";
import { Copy, Check, RefreshCw, Code, ChevronDown, ChevronRight } from "lucide-react";
import { backendData } from "../templates/constants";

export function DummyJsonDataPanel({ initialData }) {

    const [jsonData, setJsonData] = useState(backendData);
    const [copied, setCopied] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});


    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyField = (fieldPath) => {
        navigator.clipboard.writeText(`{{${fieldPath}}}`);
        setCopiedField(fieldPath);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const toggleSection = (key) => {
        setExpandedSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const renderJsonPreview = (data, parentKey = "", level = 0) => {
        return Object.entries(data).map(([key, value]) => {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            const isExpanded = expandedSections[fullKey];

            // Handle Arrays
            if (Array.isArray(value)) {
                return (
                    <div key={fullKey} className="mb-2">
                        <button
                            onClick={() => toggleSection(fullKey)}
                            className="flex items-center gap-1 w-full text-left hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                        >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            <span className="text-sm font-semibold text-indigo-700">{key}</span>
                            <span className="text-xs text-gray-500">({value.length} items)</span>
                        </button>
                        {isExpanded && (
                            <div className="ml-4 mt-1 border-l-2 border-indigo-200 pl-2">
                                {value.map((item, idx) => (
                                    <div key={idx} className="mb-2">
                                        <div className="text-xs text-gray-500 mb-0.5">[{idx}]</div>
                                        {typeof item === "object" ? (
                                            renderJsonPreview(item, `${fullKey}[${idx}]`, level + 1)
                                        ) : (
                                            <div className="flex items-center justify-between group">
                                                <code className="text-sm text-green-700">
                                                    {typeof item === "string" ? `"${item}"` : item}
                                                </code>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }

            // Handle Objects
            if (typeof value === "object" && value !== null) {
                return (
                    <div key={fullKey} className="mb-2">
                        <button
                            onClick={() => toggleSection(fullKey)}
                            className="flex items-center gap-1 w-full text-left hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                        >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            <span className="text-sm font-semibold text-indigo-700">{key}</span>
                        </button>
                        {isExpanded && (
                            <div className="ml-4 mt-1 border-l-2 border-indigo-200 pl-2">
                                {renderJsonPreview(value, fullKey, level + 1)}
                            </div>
                        )}
                    </div>
                );
            }

            // Handle Primitives
            return (
                <div key={fullKey} className="mb-1 flex items-center justify-between group hover:bg-gray-50 rounded px-1 py-0.5 transition-colors">
                    <div className="flex-1 min-w-0 pr-2">
                        <code className="text-sm font-mono block">
                            <span className="text-purple-600 font-medium">{key}:</span>{" "}
                            <span className="text-green-700 break-all">
                                {typeof value === "string" ? `"${value}"` : String(value)}
                            </span>
                        </code>
                    </div>
                    <button
                        onClick={() => handleCopyField(fullKey)}
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 px-2 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded transition-all"
                        title="Copy as Handlebars"
                    >
                        {copiedField === fullKey ? (
                            <Check size={12} />
                        ) : (
                            "{{}}"
                        )}
                    </button>
                </div>
            );
        });
    };

    return (
        <div className="w-100 bg-white border-l border-gray-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Code size={16} className="text-white" />
                        </div>
                        <h2 className="text-base font-bold text-gray-900">
                            Template Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-white rounded transition-colors"
                            title="Copy JSON"
                        >
                            {copied ? (
                                <Check size={14} className="text-green-600" />
                            ) : (
                                <Copy size={14} className="text-gray-600" />
                            )}
                        </button>

                    </div>
                </div>
                <p className="text-sm text-gray-600">
                    Click to expand nested fields
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Code size={14} />
                        Available Fields
                    </p>
                    <div className="space-y-1">
                        {renderJsonPreview(jsonData)}
                    </div>
                </div>

                {/* Usage Hint */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900 font-medium mb-2">
                        💡 How to use
                    </p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        Hover over any field and click the <code className="px-1.5 bg-blue-100 rounded">{"{{}}"}</code> button to copy as Handlebars syntax
                    </p>
                </div>
            </div>
        </div>
    );
}