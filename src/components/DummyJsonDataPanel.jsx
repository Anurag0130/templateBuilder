import { useState } from "react";
import { Save, Copy, Check, RefreshCw, Code, ChevronDown, ChevronRight } from "lucide-react";

export function DummyJsonDataPanel({ onDataChange, initialData }) {
    const defaultData = initialData || {
        ApplicantAutoId: "APP/26-27/0163",
        AcademicYear: "2026-27",
        Class: "GRADE 3",
        udf_curriculum: "IB",
        udf_Name_of_the_Applicant: "Ryaan Seth",
        FatherName: "Nimish Seth",
        MotherName: "Aishwarya Rawat",
        FatherMobileNo: "468332435",
        MotherMobileNo: "490948709",
        FatherEmailId: "nimishseth@hotmail.com",
        MotherEmailId: "aishxlnc@gmail.com",
        addressDetails: {
            Permanent: {
                Address: "9 Old hall drive",
                City: "Caroline Springs",
                State: "Victoria",
                Pincode: "3023",
                Country: "Australia",
            }
        },
        extraLanguages: ["English", "Hindi", "French"],
        previousSchools: [
            { school: "Kids Global School", year: "2023-24", grade: "2" },
            { school: "Sunshine Academy", year: "2022-23", grade: "1" }
        ],
        schoolName: "GENESIS GLOBAL SCHOOL",
        schoolAddress: "SEC-132, EXPRESSWAY, NOIDA ; 201304"
    };

    const [jsonData, setJsonData] = useState(defaultData);
    const [jsonText, setJsonText] = useState(JSON.stringify(defaultData, null, 2));
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    const handleJsonChange = (e) => {
        const newText = e.target.value;
        setJsonText(newText);
        setError(null);

        try {
            const parsed = JSON.parse(newText);
            setJsonData(parsed);
            if (onDataChange) {
                onDataChange(parsed);
            }
        } catch (err) {
            setError("Invalid JSON format");
        }
    };

    const handleSave = () => {
        try {
            const parsed = JSON.parse(jsonText);
            setJsonData(parsed);
            setIsEditing(false);
            setError(null);
            if (onDataChange) {
                onDataChange(parsed);
            }
        } catch (err) {
            setError("Invalid JSON format. Please fix the errors.");
        }
    };

    const handleReset = () => {
        setJsonData(defaultData);
        setJsonText(JSON.stringify(defaultData, null, 2));
        setError(null);
        if (onDataChange) {
            onDataChange(defaultData);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonText);
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
                            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            <span className="text-xs font-semibold text-indigo-700">{key}</span>
                            <span className="text-[10px] text-gray-500">({value.length} items)</span>
                        </button>
                        {isExpanded && (
                            <div className="ml-4 mt-1 border-l-2 border-indigo-200 pl-2">
                                {value.map((item, idx) => (
                                    <div key={idx} className="mb-2">
                                        <div className="text-[10px] text-gray-500 mb-0.5">[{idx}]</div>
                                        {typeof item === "object" ? (
                                            renderJsonPreview(item, `${fullKey}[${idx}]`, level + 1)
                                        ) : (
                                            <div className="flex items-center justify-between group">
                                                <code className="text-xs text-green-700">
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
                            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            <span className="text-xs font-semibold text-indigo-700">{key}</span>
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
                        <code className="text-xs font-mono block">
                            <span className="text-purple-600 font-medium">{key}:</span>{" "}
                            <span className="text-green-700 break-all">
                                {typeof value === "string" ? `"${value}"` : String(value)}
                            </span>
                        </code>
                    </div>
                    <button
                        onClick={() => handleCopyField(fullKey)}
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 px-1.5 py-0.5 text-[10px] bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded transition-all"
                        title="Copy as Handlebars"
                    >
                        {copiedField === fullKey ? (
                            <Check size={10} />
                        ) : (
                            "{{}}"
                        )}
                    </button>
                </div>
            );
        });
    };

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <Code size={14} className="text-white" />
                        </div>
                        <h2 className="text-sm font-bold text-gray-900">
                            Template Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-white rounded transition-colors"
                            title="Copy JSON"
                        >
                            {copied ? (
                                <Check size={12} className="text-green-600" />
                            ) : (
                                <Copy size={12} className="text-gray-600" />
                            )}
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-1.5 hover:bg-white rounded transition-colors"
                            title="Reset to default"
                        >
                            <RefreshCw size={12} className="text-gray-600" />
                        </button>
                    </div>
                </div>
                <p className="text-xs text-gray-600">
                    Click to expand nested fields
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3">
                {!isEditing ? (
                    <>
                        {/* Preview Mode */}
                        <div className="mb-3">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Edit JSON
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                <Code size={11} />
                                Available Fields
                            </p>
                            <div className="space-y-0.5">
                                {renderJsonPreview(jsonData)}
                            </div>
                        </div>

                        {/* Usage Hint */}
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2">
                            <p className="text-xs text-blue-900 font-medium mb-1">
                                💡 How to use
                            </p>
                            <p className="text-[11px] text-blue-700 leading-relaxed">
                                Hover over any field and click the <code className="px-1 bg-blue-100 rounded">{"{{}}"}</code> button to copy as Handlebars syntax
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Edit Mode */}
                        <div className="mb-2 flex items-center gap-2">
                            <button
                                onClick={handleSave}
                                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <Save size={11} />
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setJsonText(JSON.stringify(jsonData, null, 2));
                                    setIsEditing(false);
                                    setError(null);
                                }}
                                className="px-2 py-1.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>

                        {error && (
                            <div className="mb-2 bg-red-50 border border-red-200 rounded-lg p-2">
                                <p className="text-xs text-red-700">{error}</p>
                            </div>
                        )}

                        <textarea
                            value={jsonText}
                            onChange={handleJsonChange}
                            className="w-full h-[calc(100vh-200px)] p-2 text-[11px] font-mono bg-gray-900 text-green-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            spellCheck={false}
                        />

                        <p className="mt-2 text-[10px] text-gray-500">
                            Edit JSON and click "Save"
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}