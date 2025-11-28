export function ElementProperties({ selectedElement, onUpdateElement, fileInputRef }) {
    if (!selectedElement) {
        return (
            <div className="p-4">
                <p className="text-center text-gray-400 text-sm py-8">
                    Select an element to edit properties
                </p>
            </div>
        );
    }

    const handleImageChange = () => {
        fileInputRef.current?.click();
    };

    const renderPropertyControls = () => {
        const commonControls = (
            <>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Position X (px)</label>
                    <input
                        type="number"
                        value={selectedElement.x || 0}
                        onChange={(e) => onUpdateElement({ ...selectedElement, x: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                        min="0"
                        max="750"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Position Y (px)</label>
                    <input
                        type="number"
                        value={selectedElement.y || 0}
                        onChange={(e) => onUpdateElement({ ...selectedElement, y: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                        min="0"
                        max="1123"
                    />
                </div>
            </>
        );

        switch (selectedElement.type) {
            case "table":
            case "formTable":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Rows</label>
                            <input
                                type="number"
                                value={selectedElement.rows || 2}
                                onChange={(e) => onUpdateElement({ ...selectedElement, rows: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="1"
                                max="20"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Columns</label>
                            <input
                                type="number"
                                value={selectedElement.cols || 2}
                                onChange={(e) => onUpdateElement({ ...selectedElement, cols: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="1"
                                max="10"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 400}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="100"
                                max="750"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
                            <input
                                type="color"
                                value={selectedElement.backgroundColor || "#ffffff"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, backgroundColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.borderWidth || 1}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderWidth: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="0"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Color</label>
                            <input
                                type="color"
                                value={selectedElement.borderColor || "#000000"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>

                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <label className="block text-xs font-semibold text-blue-900 mb-3">Row Repeat Configuration</label>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Array Path</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., schools or student.grades"
                                        value={selectedElement.repeat?.arrayPath || ""}
                                        onChange={(e) => onUpdateElement({
                                            ...selectedElement,
                                            repeat: {
                                                ...selectedElement.repeat,
                                                arrayPath: e.target.value
                                            }
                                        })}
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Path to the array in your data
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Start Row (0-indexed)</label>
                                    <input
                                        type="number"
                                        value={selectedElement.repeat?.startRow ?? 1}
                                        onChange={(e) => onUpdateElement({
                                            ...selectedElement,
                                            repeat: {
                                                ...selectedElement.repeat,
                                                startRow: parseInt(e.target.value)
                                            }
                                        })}
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                                        min="0"
                                        max={Math.max(0, (selectedElement.rows || 2) - 1)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Which row should repeat (0 = first row)
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Column Keys (comma-separated)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., school,year,grade"
                                        value={selectedElement.repeat?.cols?.join(",") || ""}
                                        onChange={(e) => onUpdateElement({
                                            ...selectedElement,
                                            repeat: {
                                                ...selectedElement.repeat,
                                                cols: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                            }
                                        })}
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Keys for each column in the repeated row
                                    </p>
                                </div>

                                {selectedElement.repeat?.arrayPath && (
                                    <button
                                        onClick={() => onUpdateElement({
                                            ...selectedElement,
                                            repeat: undefined
                                        })}
                                        className="w-full px-2 py-1.5 text-xs bg-red-100 text-red-700 border border-red-300 rounded hover:bg-red-200 transition"
                                    >
                                        Clear Repeat Configuration
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <label className="block text-xs font-semibold text-blue-900 mb-2">Cell Editing</label>
                            <p className="text-xs text-blue-700">Double-click cells in the table to edit their content</p>
                        </div>
                    </>
                );

            case "image":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Image Preview</label>
                            <div className="border border-gray-300 rounded-md p-2 bg-gray-50 flex justify-center">
                                <img
                                    src={selectedElement.src}
                                    alt={selectedElement.alt || "Image"}
                                    className="max-h-32 max-w-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 200}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
                            <input
                                type="number"
                                value={selectedElement.height || 150}
                                onChange={(e) => onUpdateElement({ ...selectedElement, height: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm font-medium text-gray-700"
                            >
                                Change Image
                            </button>
                        </div>
                    </>
                );

            case "rectangle":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 200}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
                            <input
                                type="number"
                                value={selectedElement.height || 100}
                                onChange={(e) => onUpdateElement({ ...selectedElement, height: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
                            <input
                                type="color"
                                value={selectedElement.backgroundColor || "#ffffff"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, backgroundColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.borderWidth || 1}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderWidth: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="0"
                                max="5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Border Color</label>
                            <input
                                type="color"
                                value={selectedElement.borderColor || "#d1d5db"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, borderColor: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                    </>
                );

            case "line":
                return (
                    <>
                        {commonControls}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Length (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 200}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Line Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.lineWidth || 1}
                                onChange={(e) => onUpdateElement({ ...selectedElement, lineWidth: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="1"
                                max="10"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Line Color</label>
                            <input
                                type="color"
                                value={selectedElement.color || "#000000"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, color: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                    </>
                );

            case "header":
            case "text":
            default:
                return (
                    <>
                        {commonControls}
                        {selectedElement.field && (
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 mb-2">Field Name</label>
                                <div className="px-3 py-2 bg-gray-100 rounded-md text-xs text-gray-800 font-mono">
                                    {selectedElement.field}
                                </div>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Content</label>
                            <input
                                type="text"
                                value={selectedElement.value || ""}
                                onChange={(e) => onUpdateElement({ ...selectedElement, value: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Font Family</label>
                            <select
                                value={selectedElement.fontFamily || "Arial"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, fontFamily: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="Arial">Arial</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Font Size (px)</label>
                            <input
                                type="number"
                                value={selectedElement.fontSize || 12}
                                onChange={(e) => onUpdateElement({ ...selectedElement, fontSize: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="8"
                                max="72"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Font Weight</label>
                            <select
                                value={selectedElement.fontWeight || "normal"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, fontWeight: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="300">Light</option>
                                <option value="normal">Normal</option>
                                <option value="600">Semi-Bold</option>
                                <option value="bold">Bold</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Color</label>
                            <input
                                type="color"
                                value={selectedElement.color || "#000000"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, color: e.target.value })}
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="color"
                                    value={selectedElement.backgroundColor === "transparent" ? "#ffffff" : selectedElement.backgroundColor || "#ffffff"}
                                    onChange={(e) => onUpdateElement({ ...selectedElement, backgroundColor: e.target.value })}
                                    className="flex-1 h-10 border border-gray-300 rounded-md cursor-pointer"
                                />
                                <button
                                    onClick={() => onUpdateElement({ ...selectedElement, backgroundColor: "transparent" })}
                                    className="px-3 py-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Text Alignment</label>
                            <select
                                value={selectedElement.textAlign || "left"}
                                onChange={(e) => onUpdateElement({ ...selectedElement, textAlign: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                        {selectedElement.type === "header" && (
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedElement.underline || false}
                                        onChange={(e) => onUpdateElement({ ...selectedElement, underline: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-xs font-medium text-gray-600">Underline</span>
                                </label>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
                            <input
                                type="number"
                                value={selectedElement.width || 100}
                                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                min="50"
                                max="750"
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Element Properties</h3>
            {renderPropertyControls()}
        </div>
    );
}
