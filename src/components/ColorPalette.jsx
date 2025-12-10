import React, { useState } from 'react';
import { Pipette, RotateCcw, Palette } from 'lucide-react';

// Predefined color palettes like Paint
const COLOR_PALETTES = {
  // Standard colors (top row)
  standard: [
 '#000000', '#7F7F7F', '#880015', '#ED1C24', '#FF7F27', '#FFF200', 
  '#22B14C', '#00A2E8', '#3F48CC', '#A349A4', '#FFFFFF', '#C3C3C3',
  '#B97A57', '#FFAEC9', '#FFC90E', '#EFE4B0', '#B5E61D', '#99D9EA',
  '#7092BE', '#C8BFE7', '#1C1C1C', '#383838', '#555555', '#717171',
  '#8D8D8D', '#AAAAAA', '#C6C6C6', '#E2E2E2', '#FFCCCC', '#FF9999',
  '#FF6666', '#FF3333', '#FF0000', '#CC0000', '#990000', '#660000',
  '#330000', '#FFF4CC', '#FFE699', '#FFD966', '#FFCC33', '#FFBF00',
  '#CC9900', '#997300', '#664D00', '#332600', '#191300', '#E6F4EA',
  '#C2E8CE', '#9DDCB2', '#79D096', '#55C47A', '#31B85E', '#279349',
  '#1D6E35', '#134920', '#0A250B', '#CCF0FF', '#99E0FF', '#66D1FF',
  '#33C1FF', '#00B2FF', '#0091CC', '#006C99', '#004866', '#002433',
  '#001219', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#00008B',
  '#8A2BE2', '#6A5ACD', '#4682B4', '#2E8B57', '#556B2F',
  '#808000', '#B8860B', '#CD5C5C', '#D2691E', '#8B4513',
  '#5F9EA0', '#6495ED', '#40E0D0', '#20B2AA', '#00FA9A',
  '#7FFFD4', '#98FB98', '#FFB6C1', '#DB7093', '#C71585',
  '#FF69B4', '#F08080', '#FFA07A', '#FA8072', '#F4A460',
  '#DAA520', '#BC8F8F', '#D8BFD8', '#BA55D3', '#9370DB'
  ],
  
  // Reds
  reds: [
    '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336',
    '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252',
    '#FF1744', '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292',
    '#EC407A', '#E91E63'
  ],
  
  // Oranges & Yellows
  orangesYellows: [
    '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
    '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFFDE7', '#FFF9C4',
    '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D',
    '#F9A825', '#F57F17'
  ],
  
  // Greens
  greens: [
    '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
    '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#F1F8E9', '#DCEDC8',
    '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38',
    '#558B2F', '#33691E'
  ],
  
  // Blues
  blues: [
    '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
    '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#E1F5FE', '#B3E5FC',
    '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1',
    '#0277BD', '#01579B'
  ],
  
  // Purples & Pinks
  purplesPinks: [
    '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
    '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EDE7F6', '#D1C4E9',
    '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8',
    '#4527A0', '#311B92'
  ],
  
  // Grays & Browns
  graysBrowns: [
    '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E',
    '#757575', '#616161', '#424242', '#212121', '#EFEBE9', '#D7CCC8',
    '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037',
    '#4E342E', '#3E2723'
  ]
};

export function ColorPalette({ 
  value, 
  onChange, 
  label = "Color",
  showTransparent = false,
  defaultColor = "#000000"
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [customColor, setCustomColor] = useState(value || defaultColor);
  const [activeTab, setActiveTab] = useState('standard');

  const handleColorSelect = (color) => {
    onChange(color);
    setCustomColor(color);
  };

  const handleTransparent = () => {
    onChange('transparent');
    setShowPicker(false);
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
          {showTransparent && (
            <button
              onClick={handleTransparent}
              className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              title="Transparent"
            >
              None
            </button>
          )}
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
                className={`px-3 py-1.5 text-xs rounded whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Color Grid */}
          <div className="mb-3">
            <div className="grid grid-cols-10 gap-1">
              {tabs.find(t => t.id === activeTab)?.colors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  onClick={() => handleColorSelect(color)}
                  className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
                    value === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
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
                className="w-full h-16 border border-gray-300 rounded cursor-pointer"
                title="Click to open color picker"
              />
            </div>

            {/* Hex Input */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Or Enter Hex Code:</label>
              <div className="flex gap-2">
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