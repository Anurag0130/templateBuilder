import React, { useState } from 'react'
import { Save } from 'lucide-react';


function Modal() {
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleSave = () => {
        if (!fileName.trim()) return;      // prevent empty name
        saveTemplate(`${fileName}.html`, elements);
        setOpen(false);
        setFileName("");
    };
    return (
        <>
        
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn scale-100">

                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Save Template
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter template name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-5"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal



