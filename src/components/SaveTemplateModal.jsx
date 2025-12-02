// components/SaveTemplateModal.jsx
import React, { useState, useEffect } from "react";

export function SaveTemplateModal({
  isOpen,
  onClose,
  onSave,
  isEditMode = false,
  currentTemplateName = "",
  initialFileName = ""
}) {
  const [fileName, setFileName] = useState(initialFileName);

  useEffect(() => {
    if (isOpen) {
      setFileName(initialFileName);
    }
  }, [isOpen, initialFileName]);

  const handleSave = () => {
    if (!fileName.trim()) {
      alert("Please enter a template name");
      return;
    }
    onSave(fileName.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => {
        onClose();
        setFileName(isEditMode ? currentTemplateName : "");
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isEditMode ? "Update Template" : "Save Template"}
        </h2>

        <input
          type="text"
          placeholder="Enter template name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-5"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            }
          }}
          autoFocus
        />

        {isEditMode && currentTemplateName && (
          <p className="text-xs text-gray-500 mb-4">
            Currently editing: <span className="font-medium text-gray-700">{currentTemplateName}</span>
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              setFileName(isEditMode ? currentTemplateName : "");
            }}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!fileName.trim()}
            className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}