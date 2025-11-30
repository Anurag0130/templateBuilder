import { useState } from "react";
import { Copy, Code, Check, ChevronRight } from "lucide-react";

const DEFAULT_RULES = [
    {
        id: 1,
        syntax: "{{variableName}}",
        description: "Insert a simple variable into the template",
        example: "{{student.name}}",
    },
    {
        id: 2,
        syntax: "{{#if condition}}...{{/if}}",
        description: "Conditionally render content based on a boolean value",
        example: "{{#if isPassed}}Congratulations!{{/if}}",
    },
    {
        id: 3,
        syntax: "{{#each arrayName}}...{{/each}}",
        description:
            "Loop through an array and render content for each item. Use 'this' for item.",
        example: "{{#each courses}}<li>{{this.name}}</li>{{/each}}",
    },
    {
        id: 4,
        syntax: "{{@index}}",
        description: "Access the current loop index inside an each block",
        example: "{{#each students}}{{@index}}. {{this.name}}{{/each}}",
    },
    {
        id: 5,
        syntax: "{{#if array.length}}...{{/if}}",
        description: "Check if an array has items",
        example: "{{#if courses.length}}You have {{courses.length}} courses{{/if}}",
    },
];

const RuleCard = ({ rule, onCopy, copiedId }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:border-indigo-300 hover:shadow-sm transition-all">
        <div className="space-y-2">
            {/* Syntax */}
            <code className="text-xs font-mono bg-indigo-50 px-2 py-1 rounded text-indigo-700 font-semibold block break-all">
                {rule?.syntax || "No Syntax"}
            </code>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed">
                {rule?.description || "No description"}
            </p>

            {/* Example */}
            {rule.example && (
                <div className="bg-green-50 border border-green-200 rounded p-2">
                    <p className="text-[10px] font-semibold text-green-800 mb-1 flex items-center gap-1">
                        <Code size={10} />
                        Example
                    </p>
                    <code className="text-[10px] font-mono text-green-700 block break-all">
                        {rule?.example}
                    </code>
                </div>
            )}

            {/* Copy Button */}
            <button
                onClick={() => onCopy(rule.syntax, rule.id)}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-[0.98] transition-all"
            >
                {copiedId === rule.id ? (
                    <>
                        <Check size={12} />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy size={12} />
                        Copy
                    </>
                )}
            </button>
        </div>
    </div>
);

export default function HandlebarsRules() {
    const [rules] = useState(DEFAULT_RULES);
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="bg-gray-50 p-4">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <Code size={20} className="text-indigo-600" />
                    <h1 className="text-lg font-bold text-gray-900">
                        Handlebars Template Guide
                    </h1>
                </div>
                <p className="text-xs text-gray-600">
                    Learn how to use dynamic template syntax in your documents
                </p>
            </div>

            {/* Quick Reference */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="bg-purple-600 p-1 rounded">
                        <Code size={12} className="text-white" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-900">Quick Reference</h2>
                </div>

                <div className="space-y-2">
                    <div className="bg-white/70 rounded p-2">
                        <code className="text-xs font-mono text-purple-700 font-semibold block mb-0.5">
                            {"{{variable}}"}
                        </code>
                        <p className="text-[10px] text-gray-600">Insert simple values</p>
                    </div>
                    <div className="bg-white/70 rounded p-2">
                        <code className="text-xs font-mono text-purple-700 font-semibold block mb-0.5">
                            {"{{#if condition}}"}
                        </code>
                        <p className="text-[10px] text-gray-600">Conditional rendering</p>
                    </div>
                    <div className="bg-white/70 rounded p-2">
                        <code className="text-xs font-mono text-purple-700 font-semibold block mb-0.5">
                            {"{{#each array}}"}
                        </code>
                        <p className="text-[10px] text-gray-600">Loop through items</p>
                    </div>
                    <div className="bg-white/70 rounded p-2">
                        <code className="text-xs font-mono text-purple-700 font-semibold block mb-0.5">
                            {"{{@index}}"}
                        </code>
                        <p className="text-[10px] text-gray-600">Current loop index</p>
                    </div>
                </div>
            </div>

            {/* Section Header */}
            <div className="mb-3">
                <h2 className="text-sm font-bold text-gray-900 mb-0.5">
                    Detailed Examples
                </h2>
                <p className="text-xs text-gray-600">
                    Click "Copy" on any rule to use it in your templates
                </p>
            </div>

            {/* Rules List */}
            <div className="space-y-3 mb-4">
                {rules?.map((rule) => (
                    <RuleCard
                        key={rule?.id}
                        rule={rule}
                        onCopy={handleCopy}
                        copiedId={copiedId}
                    />
                ))}
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-blue-900 font-semibold mb-2 flex items-center gap-1">
                    <ChevronRight size={12} className="text-blue-600" />
                    Pro Tips
                </p>
                <div className="space-y-1.5 text-[11px] text-blue-800 leading-relaxed">
                    <p>
                        • Combine <code className="px-1 bg-blue-100 rounded font-mono text-[10px]">{"{{#each}}"}</code> with <code className="px-1 bg-blue-100 rounded font-mono text-[10px]">{"{{#if}}"}</code> to filter items
                    </p>
                    <p>
                        • Use <code className="px-1 bg-blue-100 rounded font-mono text-[10px]">{"{{@index}}"}</code> for auto-numbering lists
                    </p>
                    <p>
                        • Access nested properties: <code className="px-1 bg-blue-100 rounded font-mono text-[10px]">{"{{user.name}}"}</code>
                    </p>
                </div>
            </div>
        </div>
    );
}