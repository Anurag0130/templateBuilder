export const getButtonClass = (isEnabled, variant = 'default') => {
    const baseClass = "flex items-center gap-1.5 px-3 py-2 rounded-md transition-all text-xs font-semibold";
    
    if (variant === 'primary') {
        return `${baseClass} bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200/50 hover:shadow-lg hover:-translate-y-0.5 px-4`;
    }
    
    if (variant === 'secondary') {
        return `${baseClass} bg-white hover:bg-indigo-50/30 border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 px-4`;
    }
    
    return isEnabled
        ? `${baseClass} bg-indigo-50/50 hover:bg-indigo-100/70 border border-indigo-200/60 text-indigo-600 cursor-pointer hover:shadow-md hover:-translate-y-0.5`
        : `${baseClass} bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200`;
};


export const getInputClass = (hasError) => {
    return `px-3 py-2 border rounded-md ${
        hasError ? 'border-red-500' : 'border-gray-300'
    }`;
};