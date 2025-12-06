import React, { useState, useRef, useEffect } from "react";
import { Newspaper, Check } from "lucide-react";

const PAGE_SIZES = [
    { name: "A4", orientation: "portrait", width: "210mm", height: "297mm" },
    { name: "A5", orientation: "portrait", width: "148mm", height: "210mm" },
    { name: "A4 Landscape", orientation: "landscape", width: "297mm", height: "210mm" },
    { name: "A5 Landscape", orientation: "landscape", width: "210mm", height: "148mm" },
];

export default React.memo(function PageSizeSelector({ onChangePageSize, initialState }) {
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(initialState?.name ?? "A4");

    useEffect(() => {
        if (initialState?.name) {
            setSelected(initialState.name);
        }
    }, [initialState]);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setSelected(item.name);
        onChangePageSize?.(item);
        setOpen(false);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-white hover:bg-indigo-50/30 
        border border-gray-300 hover:border-indigo-300 transition-all text-xs font-semibold 
        text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
                <Newspaper size={14} />
                Page Size: {selected}
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-0 min-w-[200px] bg-white border border-gray-200 
        rounded-md shadow-xl z-[9999] overflow-hidden max-h-[400px] overflow-y-auto">
                    {PAGE_SIZES?.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition 
              flex items-center justify-between border-b border-gray-100 last:border-b-0"
                        >
                            <span className="font-medium text-gray-700">{item.name}</span>

                            {selected === item.name && (
                                <Check size={14} className="text-indigo-600 flex-shrink-0 ml-2" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
})
