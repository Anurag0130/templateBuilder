import React, { useState } from "react";
import { Plus, Trash2, Copy, Code } from "lucide-react";

// Default Rules
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



const RuleCard = ({ rule, onDelete, onCopy }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 hover:shadow transition">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                {/* Syntax */}
                <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-blue-600">
                        {rule.syntax}
                    </code>

                    <button
                        onClick={() => onCopy(rule.syntax)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Copy syntax"
                    >
                        <Copy size={14} className="text-gray-500" />
                    </button>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600">{rule.description}</p>

                {/* Example */}
                {rule.example && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Example:</p>
                        <code className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded block">
                            {rule.example}
                        </code>
                    </div>
                )}
            </div>

            {/* Delete */}
            <button
                onClick={() => onDelete(rule.id)}
                className="p-1.5 hover:bg-red-50 text-red-500 rounded"
            >
                <Trash2 size={14} />
            </button>
        </div>
    </div>
);


// ---------------------------------------------------------
// Add Rule Form Component
// ---------------------------------------------------------
const AddRuleForm = ({ newRule, onChange, onAdd, onCancel }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">

        <InputField
            label="Syntax Pattern *"
            placeholder="e.g., {{variableName}}"
            value={newRule.syntax}
            onChange={(val) => onChange({ ...newRule, syntax: val })}
        />

        <TextareaField
            label="Description *"
            placeholder="Describe what this syntax does"
            value={newRule.description}
            onChange={(val) => onChange({ ...newRule, description: val })}
        />

        <InputField
            label="Example (optional)"
            placeholder="e.g., {{student.name}}"
            value={newRule.example}
            onChange={(val) => onChange({ ...newRule, example: val })}
        />

        <div className="flex gap-2">
            <button
                onClick={onAdd}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
            >
                Add Rule
            </button>
            <button
                onClick={onCancel}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
            >
                Cancel
            </button>
        </div>
    </div>
);


// ---------------------------------------------------------
// Small Input Components
// ---------------------------------------------------------
const InputField = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:outline-none"
        />
    </div>
);

const TextareaField = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
            {label}
        </label>
        <textarea
            rows={2}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:border-blue-500 focus:outline-none"
        />
    </div>
);


// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------
export function HandlebarsRules() {
    const [rules, setRules] = useState(DEFAULT_RULES);
    const [showForm, setShowForm] = useState(false);

    const [newRule, setNewRule] = useState({
        syntax: "",
        description: "",
        example: "",
    });

    // Add rule
    const handleAddRule = () => {
        if (!newRule.syntax.trim() || !newRule.description.trim()) return;

        setRules([...rules, { ...newRule, id: Date.now() }]);
        setNewRule({ syntax: "", description: "", example: "" });
        setShowForm(false);
    };

    // Delete
    const handleDeleteRule = (id) => {
        setRules(rules.filter((r) => r.id !== id));
    };

    // Copy
    const handleCopy = (text) => navigator.clipboard.writeText(text);

    return (
        <div className="p-4 space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Handlebars Rules
                    </h3>
                    <p className="text-xs text-gray-400">Define syntax rules for templates</p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={16} />
                </button>
            </div>


            {/* Quick Reference */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Code size={14} className="text-purple-600" /> Quick Reference Guide
                </p>

                <div className="text-xs space-y-2 text-gray-600">
                    <p>• {"{{variable}}"} – simple value</p>
                    <p>• {"{{#if condition}}"} – condition block</p>
                    <p>• {"{{#each array}}"} – loop</p>
                    <p>• {"{{@index}}"} – loop index</p>

                </div>
            </div>

            {/* Add New Rule Form */}
            {showForm && (
                <AddRuleForm
                    newRule={newRule}
                    onChange={setNewRule}
                    onAdd={handleAddRule}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Rules List */}
            <div className="space-y-3">
                {rules.map((rule) => (
                    <RuleCard
                        key={rule.id}
                        rule={rule}
                        onDelete={handleDeleteRule}
                        onCopy={handleCopy}
                    />
                ))}
            </div>


        </div>
    );
}
