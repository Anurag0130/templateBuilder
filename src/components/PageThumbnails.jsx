import { Plus } from 'lucide-react';

export function PageThumbnails({ pages, currentIndex, onChange, onAddPage }) {
    return (
        <div className="w-32 bg-gray-100 border-r overflow-y-auto p-2">
            {pages.map((page, index) => (
                <div
                    key={page.id}
                    onClick={() => onChange(index)}
                    className={`
                        mb-2 cursor-pointer rounded border-2
                        ${index === currentIndex 
                            ? 'border-indigo-500 shadow-lg' 
                            : 'border-gray-300'
                        }
                    `}
                >
                    <div className="bg-white aspect-[794/1123] flex items-center justify-center">
                        <span className="text-xs text-gray-400">Page {index + 1}</span>
                    </div>
                </div>
            ))}
            
            <button onClick={onAddPage} className="w-full aspect-[794/1123] border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded flex items-center justify-center">
                <Plus size={20} />
            </button>
        </div>
    );
}