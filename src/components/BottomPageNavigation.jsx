import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Copy, Trash2 } from 'lucide-react';

export function BottomPageNavigation({
    pages,
    currentIndex,
    onPageChange,
    onAddPage,
    onDeletePage,
    onDuplicatePage
}) {
    const isFirstPage = currentIndex === 0;
    const isLastPage = currentIndex === pages.length - 1;
    const canDelete = pages.length > 1;

    return (
        <div className="flex items-center justify-between gap-4 p-3 bg-white border-t border-gray-200 shadow-lg">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(Math.max(0, currentIndex - 1))}
                disabled={isFirstPage}
                className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all text-sm font-medium
                    ${isFirstPage
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:shadow-md hover:-translate-y-0.5'
                    }
                `}
                title="Previous page (Alt + ←)"
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            {/* Center Action Buttons */}
            <div className="flex items-center gap-2">
                {/* Page Counter */}
                <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <span className="text-sm font-bold text-indigo-700">
                        Page {currentIndex + 1} of {pages.length}
                    </span>
                </div>

                {/* Add Page Button */}
                <button
                    onClick={onAddPage}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg transition-all text-sm font-semibold shadow-md shadow-indigo-200/50 hover:shadow-lg hover:-translate-y-0.5"
                    title="Add new page (Ctrl + N)"
                >
                    <Plus size={16} />
                    Add Page
                </button>

                {/* Duplicate Page Button */}
                <button
                    onClick={onDuplicatePage}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-indigo-50 border border-indigo-200 hover:border-indigo-300 text-indigo-600 rounded-lg transition-all text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    title="Duplicate current page (Ctrl + D)"
                >
                    <Copy size={16} />
                    Duplicate
                </button>

                {/* Delete Page Button */}
                <button
                    onClick={onDeletePage}
                    disabled={!canDelete}
                    className={`
                        flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all text-sm font-semibold
                        ${canDelete
                            ? 'bg-white hover:bg-red-50 border border-red-200 hover:border-red-300 text-red-600 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                        }
                    `}
                    title={canDelete ? "Delete current page (Delete)" : "Cannot delete last page"}
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(Math.min(pages.length - 1, currentIndex + 1))}
                disabled={isLastPage}
                className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all text-sm font-medium
                    ${isLastPage
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:shadow-md hover:-translate-y-0.5'
                    }
                `}
                title="Next page (Alt + →)"
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    );
}