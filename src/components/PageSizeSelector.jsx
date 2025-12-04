// import { useState, useRef, useEffect } from "react";
// import { Newspaper, Check } from "lucide-react";

// export default function PageSizeSelector({ onChangePageSize }) {
//     const [open, setOpen] = useState(false);
//     const [selectedSize, setSelectedSize] = useState("A4");
//     const dropdownRef = useRef();

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleSelect = (size) => {
//         setSelectedSize(size);
//         onChangePageSize(size);
//         setOpen(false);
//     };

//     const pageSizes = [   
//         { name: "A4", label: "A4", width: "680px", height: "954px" },
//         { name: "A5", label: "A5", width: "559px", height: "794px" },
//         { name: "A4 Landscape", label: "A4 Landscape", width: "954px", height: "680px" },
//         { name: "A5 Landscape", label: "A5 Landscape", width: "794px", height: "559px" },
//         // { name: "A3", label: "A3", width: "961px", height: "1357px" },
//         // { name: "Tabloid", label: "Tabloid", width: "877px", height: "1357px" },
//     ];

//     return (
//         <div className="relative inline-block" ref={dropdownRef}>
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-white hover:bg-indigo-50/30 
//                 border border-gray-300 hover:border-indigo-300 transition-all text-xs font-semibold 
//                 text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
//             >
//                 <Newspaper size={14} />
//                 Page Size: {selectedSize}
//             </button>

//             {open && (
//                 <div className="absolute top-full mt-1 left-0 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-xl z-[9999] overflow-hidden max-h-[400px] overflow-y-auto">
//                     {pageSizes.map((size) => (
//                         <button
//                             key={size.name}
//                             onClick={() => handleSelect(size.name)}
//                             className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition flex items-center justify-between border-b border-gray-100 last:border-b-0"
//                         >
//                             <span className="font-medium text-gray-700">{size.label}</span>
//                             {selectedSize === size.name && <Check size={14} className="text-indigo-600 flex-shrink-0 ml-2" />}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState, useRef, useEffect } from "react";
import { Newspaper, Check } from "lucide-react";

export default function PageSizeSelector({ onChangePageSize }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("A4");
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

    const pageSizes = [
        { name: "A4", orientation: "portrait", width: "210mm", height: "297mm" },
        { name: "A5", orientation: "portrait", width: "148mm", height: "210mm" },
        { name: "A4 Landscape", orientation: "landscape", width: "297mm", height: "210mm" },
        { name: "A5 Landscape", orientation: "landscape", width: "210mm", height: "148mm" },
    ];

    const handleSelect = (item) => {
        setSelected(item.name);
        onChangePageSize(item);   // send full object
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
                Page Size: {selected}
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-0 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-xl z-[9999] overflow-hidden max-h-[400px] overflow-y-auto">
                    {pageSizes.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition flex items-center justify-between border-b border-gray-100 last:border-b-0"
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
}
