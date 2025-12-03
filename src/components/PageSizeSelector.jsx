
import { useState, useRef, useEffect } from "react";
import { Newspaper } from "lucide-react";

export default function PageSizeSelector({ onChangePageSize }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (size) => {
        onChangePageSize(size);  // This triggers size change
        setOpen(false);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-white hover:bg-indigo-50/30 
                border border-gray-300 hover:border-indigo-300 transition-all text-xs font-semibold 
                text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
                <Newspaper size={14} />
                Page
            </button>

            {open && (
                <div className="absolute top-0 left-full ml-1  bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                    <button
                        onClick={() => handleSelect("A4")}
                        className="w-full text-left px-4 text-sm hover:bg-indigo-50 transition"
                    >
                        A4
                    </button>
                    <button
                        onClick={() => handleSelect("A5")}
                        className="w-full text-left px-4  text-sm hover:bg-indigo-50 transition"
                    >
                        A5
                    </button>
                </div>
            )}
        </div>
    );
}