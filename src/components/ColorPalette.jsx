import React, { useState } from 'react';
import { RotateCcw, Palette } from 'lucide-react';
import { COLOR_PALETTES } from '../templates/colorConstansts';



export function ColorPalette({
  value,
  onChange,
  label = "Color",
  defaultColor = "#000000"
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState(value || defaultColor);
  const [activeTab, setActiveTab] = useState('standard');

  const handleColorSelect = (color) => {
    onChange(color);
    setCustomColor(color);
  };


  const handleReset = () => {
    onChange(defaultColor);
    setCustomColor(defaultColor);
  };

  const tabs = [
    { id: 'standard', label: 'Standard', colors: COLOR_PALETTES.standard },
    { id: 'reds', label: 'Reds', colors: COLOR_PALETTES.reds },
    { id: 'orangesYellows', label: 'Oranges', colors: COLOR_PALETTES.orangesYellows },
    { id: 'greens', label: 'Greens', colors: COLOR_PALETTES.greens },
    { id: 'blues', label: 'Blues', colors: COLOR_PALETTES.blues },
    { id: 'purplesPinks', label: 'Purples', colors: COLOR_PALETTES.purplesPinks },
    { id: 'graysBrowns', label: 'Grays', colors: COLOR_PALETTES.graysBrowns }
  ];

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-600 mb-2">
        {label}
      </label>

      {/* Current Color Display */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="flex-1 h-10 border-2 border-gray-300 rounded-md relative overflow-hidden hover:border-blue-500 transition-colors"
          style={{
            background: value === 'transparent'
              ? 'repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 50% / 10px 10px'
              : value || defaultColor
          }}
        >
          {value === 'transparent' && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600 bg-white/80">
              Transparent
            </span>
          )}
        </button>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <button
            onClick={handleReset}
            className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            title="Reset to default"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Color Palette Dropdown */}
      {showPicker && (
        <div className="border border-gray-300 rounded-md p-3 bg-white shadow-lg max-h-96 overflow-y-auto">

          {/* Tabs */}
          <div className="flex gap-1 mb-3 pb-2 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs rounded whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Color Grid - Changed from grid-cols-10 to grid-cols-5 */}
          <div className="mb-3">
            <div className="grid grid-cols-5 gap-">
              {tabs.find(t => t.id === activeTab)?.colors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  onClick={() => handleColorSelect(color)}
                  className={`w-6 h-6 mb-2 rounded-2xl border-2 hover:scale-105 transition-transform ${value === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                    }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Custom Color Picker Section */}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Palette size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">Custom Color</span>
            </div>

            {/* Native Color Picker */}
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Pick Any Color:</label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  handleColorSelect(e.target.value);
                }}
                className="w-full h-12 border border-gray-300 rounded cursor-pointer"
                title="Click to open color picker"
              />
            </div>

            {/* Hex Input */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Or Enter Hex Code:</label>
              <div className="flex gap-2 flex-col">
                <input
                  type="text"
                  value={customColor.toUpperCase()}
                  onChange={(e) => {
                    const hex = e.target.value;
                    setCustomColor(hex);
                    // Validate hex color
                    if (/^#[0-9A-F]{6}$/i.test(hex)) {
                      handleColorSelect(hex);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded font-mono uppercase"
                  placeholder="#000000"
                  maxLength="7"
                />
                <button
                  onClick={() => {
                    if (/^#[0-9A-F]{6}$/i.test(customColor)) {
                      handleColorSelect(customColor);
                    }
                  }}
                  className="px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Format: #RRGGBB (e.g., #FF5733)</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowPicker(false)}
            className="w-full mt-3 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors font-medium"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}