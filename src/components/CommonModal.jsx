import React from "react";
import { X } from "lucide-react";

export function CommonModal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true
}) {

    React.useEffect(() => {
        if (!closeOnEscape || !isOpen) return;

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl"
    };

    const handleBackdropClick = () => {
        if (closeOnBackdropClick) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} mx-4 animate-scaleIn`}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h2>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        )}
                    </div>
                )}

                <div className="px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}


