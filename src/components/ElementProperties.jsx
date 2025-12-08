export function ElementProperties({
  selectedElement,
  onUpdateElement,
  fileInputRef,
  // ✅ NEW PROPS for cell editing
  selectedCellInfo,
  onUpdateCellStyle,
  onClearCellSelection
}) {

  if (selectedCellInfo) {
    const isMultiSelect = selectedCellInfo.isMultiSelect || false;
    const cellCount = selectedCellInfo.selectedCells?.length || 1;
    return (
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Cell Properties</h3>

        {/* ✅ FIXED: Conditional Cell Info Header */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          {isMultiSelect ? (
            <>
              <div className="text-xs text-blue-900 font-medium">
                Editing <strong>{cellCount} cells</strong>
              </div>
              <div className="text-xs text-blue-700 mt-1">
                Styling will apply to all {cellCount} selected cells
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-blue-900 font-medium">
                Editing Cell: <strong>Row {selectedCellInfo.row + 1}, Col {selectedCellInfo.col + 1}</strong>
              </div>
              <div className="text-xs text-blue-700 mt-1">
                Cell Key: {selectedCellInfo.cellKey}
              </div>
            </>
          )}
        </div>
        {/* ✅ Cell Content - only show for single cell */}
        {!isMultiSelect && (
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">Cell Content</label>
            <input
              type="text"
              value={selectedCellInfo.cellData || ""}
              onChange={(e) => {
                // Update cell data
                const newCellData = { ...(selectedCellInfo.element.cellData || {}) };
                newCellData[selectedCellInfo.cellKey] = e.target.value;
                onUpdateElement({
                  ...selectedCellInfo.element,
                  cellData: newCellData
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter cell content"
            />
          </div>
        )}

        {/* Font Size */}
        {/* <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Font Size (px)</label>
          <input
            type="number"
            value={selectedCellInfo.styles.fontSize || 12}
            onChange={(e) => {
              const value = parseInt(e.target.value);

              // prevent negative or less than 8
              if (value < 0) return;

              onUpdateElement({
                ...selectedElement,
                fontSize: value,
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            min="0"
            max="72"
          />
        </div> */}

        {/* Font Size */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Font Size (px)
          </label>
          <input
            type="number"
            value={selectedCellInfo.styles.fontSize || 12}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value < 0) return;
              if (value > 72) return;
              onUpdateCellStyle({ fontSize: value });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            min="0"
            max="72"
          />
        </div>


        {/* Font Weight */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Font Weight</label>
          <select
            value={selectedCellInfo.styles.fontWeight || "normal"}
            onChange={(e) => onUpdateCellStyle({ fontWeight: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="300">Light</option>
            <option value="normal">Normal</option>
            <option value="600">Semi-Bold</option>
            <option value="bold">Bold</option>
            <option value="700">700</option>
          </select>
        </div>

        {/* Font Family */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Font Family</label>
          <select
            value={selectedCellInfo.styles.fontFamily || "Tahoma"}
            onChange={(e) => onUpdateCellStyle({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="Tahoma">Tahoma</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
          </select>
        </div>

        {/* Font Style */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Font Style</label>
          <select
            value={selectedCellInfo.styles.fontStyle || "normal"}
            onChange={(e) => onUpdateCellStyle({ fontStyle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>

        {/* Text Transform */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Text Transform</label>
          <select
            value={selectedCellInfo.styles.textTransform || "none"}
            onChange={(e) => onUpdateCellStyle({ textTransform: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="none">None</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>

        {/* Text Decoration */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Text Decoration</label>
          <select
            value={selectedCellInfo.styles.textDecoration || "none"}
            onChange={(e) => onUpdateCellStyle({ textDecoration: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="line-through">Line Through</option>
          </select>
        </div>

        {/* Text Color */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Text Color</label>
          <input
            type="color"
            value={selectedCellInfo.styles.color || "#000000"}
            onChange={(e) => onUpdateCellStyle({ color: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        {/* Background Color */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
          <input
            type="color"
            value={selectedCellInfo.styles.backgroundColor || "#ffffff"}
            onChange={(e) => onUpdateCellStyle({ backgroundColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        {/* Text Align */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">Text Align</label>
          <select
            value={selectedCellInfo.styles.textAlign || "left"}
            onChange={(e) => onUpdateCellStyle({ textAlign: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClearCellSelection}
            className="flex-1 px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // ✅ FIXED: Reset ALL selected cells
              const element = selectedCellInfo.element;
              const newCellStyles = { ...(element.cellStyles || {}) };

              if (isMultiSelect && selectedCellInfo.selectedCells) {
                // Delete styles for all selected cells
                selectedCellInfo.selectedCells.forEach(({ row, col }) => {
                  const key = `${row}-${col}`;
                  delete newCellStyles[key];
                });
              } else {
                // Delete single cell style
                delete newCellStyles[selectedCellInfo.cellKey];
              }

              onUpdateElement({ ...element, cellStyles: newCellStyles });
              onClearCellSelection();
            }}
            className="flex-1 px-4 py-2 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            Reset {isMultiSelect ? `${cellCount} Cells` : 'Style'}
          </button>
        </div>
      </div>
    );
  }


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
            onChange={(e) => {
              const value = parseInt(e.target.value);

              if (value < 1) return;

              onUpdateElement({
                ...selectedElement,
                x: value,
              });
            }} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            min="1"
            max="1000"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Position Y (px)
          </label>

          <input
            type="number"
            value={selectedElement.y || 0}
            onChange={(e) => {
              const value = parseInt(e.target.value);

              // prevent negative or less than 1
              if (value < 1) return;

              onUpdateElement({
                ...selectedElement,
                y: value,
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            min="1"
            max="1123"
          />
        </div>

      </>
    );

    switch (selectedElement.type) {

      case "list":
        return (
          <>
            {commonControls}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">List Items (one per line)</label>
              <textarea
                value={(selectedElement.items || []).join("\n")}
                onChange={(e) => onUpdateElement({ ...selectedElement, items: e.target.value.split("\n") })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">List Style</label>
              <select
                value={selectedElement.listStyle || "bullet"}
                onChange={(e) => onUpdateElement({ ...selectedElement, listStyle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="bullet">Bullet</option>
                <option value="number">Number</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Font Size (px)</label>
              <input
                type="number"
                value={selectedElement.fontSize || 14}
                // onChange={(e) => onUpdateElement({ ...selectedElement, fontSize: parseInt(e.target.value) })}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 0) return;

                  onUpdateElement({
                    ...selectedElement,
                    fontSize: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="0"
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
              <label className="block text-xs font-medium text-gray-600 mb-2">Line Height</label>
              <input
                type="number"
                step="0.1"
                value={selectedElement.lineHeight || 1.8}
                onChange={(e) => onUpdateElement({ ...selectedElement, lineHeight: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="1"
                max="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Indentation (px)</label>
              <input
                type="number"
                value={selectedElement.indentation || 20}
                onChange={(e) => onUpdateElement({ ...selectedElement, indentation: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="0"
                max="100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
              <input
                type="number"
                value={selectedElement.width || 400}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  // prevent negative or less than 8
                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    width: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="100"
              />
            </div>
          </>
        );

        return (
          <>
            {commonControls}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Barcode Data</label>
              <input
                type="text"
                value={selectedElement.data || ""}
                onChange={(e) => onUpdateElement({ ...selectedElement, data: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Format</label>
              <select
                value={selectedElement.format || "CODE128"}
                onChange={(e) => onUpdateElement({ ...selectedElement, format: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="CODE128">CODE128</option>
                <option value="EAN13">EAN13</option>
                <option value="UPC">UPC</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
              <input
                type="number"
                value={selectedElement.width || 200}
                onChange={(e) => onUpdateElement({ ...selectedElement, width: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="100"
                max="400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
              <input
                type="number"
                value={selectedElement.height || 60}
                onChange={(e) => onUpdateElement({ ...selectedElement, height: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="30"
                max="150"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedElement.displayValue || false}
                  onChange={(e) => onUpdateElement({ ...selectedElement, displayValue: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-xs font-medium text-gray-600">Display Value</span>
              </label>
            </div>
          </>
        );

      case "link":
        return (
          <>
            {commonControls}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Link Text</label>
              <input
                type="text"
                value={selectedElement.text || ""}
                onChange={(e) => onUpdateElement({ ...selectedElement, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">URL</label>
              <input
                type="text"
                value={selectedElement.href || ""}
                onChange={(e) => onUpdateElement({ ...selectedElement, href: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Font Size (px)</label>
              <input
                type="number"
                value={selectedElement.fontSize || 14}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 0) return;

                  onUpdateElement({
                    ...selectedElement,
                    fontSize: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="0"
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
              <label className="block text-xs font-medium text-gray-600 mb-2">Link Color</label>
              <input
                type="color"
                value={selectedElement.color || "#2563eb"}
                onChange={(e) => onUpdateElement({ ...selectedElement, color: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>
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
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedElement.openInNewTab || false}
                  onChange={(e) => onUpdateElement({ ...selectedElement, openInNewTab: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-xs font-medium text-gray-600">Open in New Tab</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
              <input
                type="number"
                value={selectedElement.width || 400}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  // prevent negative or less than 8
                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    width: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="1000"
              />
            </div>
          </>
        );


        return (
          <>
            {commonControls}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Label</label>
              <input
                type="text"
                value={selectedElement.label || ""}
                onChange={(e) => onUpdateElement({ ...selectedElement, label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Rows</label>
              <input
                type="number"
                value={selectedElement.rows || 3}
                onChange={(e) => onUpdateElement({ ...selectedElement, rows: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="2"
                max="6"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Font Size (px)</label>
              <input
                type="number"
                value={selectedElement.fontSize || 14}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 0) return;

                  onUpdateElement({
                    ...selectedElement,
                    fontSize: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="0"
                max="72"
              />
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
              <label className="block text-xs font-medium text-gray-600 mb-2">Width (px)</label>
              <input
                type="number"
                value={selectedElement.width || 400}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    fontSize: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="1000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
              <input
                type="number"
                value={selectedElement.height || 80}
                onChange={(e) => onUpdateElement({ ...selectedElement, height: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="60"
                max="200"
              />
            </div>
          </>
        );

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
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 50) return;

                  onUpdateElement({
                    ...selectedElement,
                    width: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="50"
                max="1000"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
              <input
                type="number"
                value={selectedElement.height || 200}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 100) return;

                  onUpdateElement({
                    ...selectedElement,
                    height: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="50"
                max="1000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Row Height (px)</label>
              <input
                type="number"
                value={selectedElement.rowHeight || 30}
                onChange={(e) => onUpdateElement({ ...selectedElement, rowHeight: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="20"
                max="100"
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
                      repeat: { ...selectedElement.repeat, arrayPath: e.target.value }
                    })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Path to the array in your data</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Row (0-indexed)</label>
                  <input
                    type="number"
                    value={selectedElement.repeat?.startRow ?? 1}
                    onChange={(e) => onUpdateElement({
                      ...selectedElement,
                      repeat: { ...selectedElement.repeat, startRow: parseInt(e.target.value) }
                    })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                    min="0"
                    max={Math.max(0, (selectedElement.rows || 2) - 1)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Which row should repeat (0 = first row)</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Column Keys (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., school,year,grade"
                    value={selectedElement.repeat?.cols?.join(",") || ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      onUpdateElement({
                        ...selectedElement,
                        repeat: {
                          ...selectedElement.repeat,
                          cols: raw === "" ? [] : raw.split(",").map((s) => s.trim())
                        }
                      });
                    }}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Keys for each column in the repeated row</p>
                </div>
                {selectedElement.repeat?.arrayPath && (
                  <button
                    onClick={() => onUpdateElement({ ...selectedElement, repeat: undefined })}
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
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  // prevent negative or less than 8
                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    width: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="1000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
              <input
                type="number"
                value={selectedElement.height || 150}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  // prevent negative or less than 8
                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    height: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
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
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    width: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="1000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-2">Height (px)</label>
              <input
                type="number"
                value={selectedElement.height || 100}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    height: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="1000"
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
                onChange={(e) => {
                  const value = parseInt(e.target.value);


                  if (value < 0) return;

                  onUpdateElement({
                    ...selectedElement,
                    fontSize: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="0"
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
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value < 10) return;

                  onUpdateElement({
                    ...selectedElement,
                    width: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                min="10"
                max="1000"
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
