import { useState } from "react";
import { Plus, Copy, Code } from "lucide-react";

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

                <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-blue-600">
                        {rule?.syntax || "No Syntax"}
                    </code>

                    <button
                        onClick={() => onCopy(rule.syntax)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Copy syntax"
                    >
                        <Copy size={14} className="text-gray-500" />
                    </button>
                </div>


                <p className="text-xs text-gray-600">{rule?.description || "No description"}</p>

                {rule.example && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Example:</p>
                        <code className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded block">
                            {rule?.example || "No Example"}
                        </code>
                    </div>
                )}
            </div>

        </div>
    </div>
);


export function HandlebarsRules() {
    const [rules, setRules] = useState(DEFAULT_RULES);
    const [showForm, setShowForm] = useState(false);


    const handleCopy = (text) => navigator.clipboard.writeText(text);

    return (
        <div className="p-4 space-y-4">

            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Handlebars Rules
                    </h3>
                    <p className="text-xs text-gray-400">Define syntax rules for templates</p>
                </div>

              
            </div>



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


            {/* Rules List */}
            <div className="space-y-3">
                {rules?.map((rule) => (
                    <RuleCard
                        key={rule?.id}
                        rule={rule}
                        onDelete={() => { }}
                        onCopy={handleCopy}
                    />
                ))}
            </div>


        </div>
    );
}
