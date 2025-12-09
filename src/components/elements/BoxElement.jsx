// BoxElement.jsx
export function BoxElement({ 
  element, 
  isSelected, 
  onClick, 
  onDoubleClick,
  children // Optional: actual child components to render inside
}) {
  const selectedClass = isSelected ? "ring-2 ring-blue-500 z-10" : "";
  
  // Map shadow values to Tailwind classes
  const getShadowClass = () => {
    switch(element.shadow) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
      case 'xl': return 'shadow-xl';
      case '2xl': return 'shadow-2xl';
      default: return '';
    }
  };

  const shadowClass = getShadowClass();

  return (
    <div 
      className={`cursor-move ${selectedClass} ${shadowClass}`} 
      style={{ 
        width: "100%", 
        height: "100%",
        backgroundColor: element.backgroundColor,
        borderWidth: element.borderWidth,
        borderColor: element.borderColor,
        borderStyle: element.borderStyle,
        borderRadius: element.borderRadius,
        padding: element.padding,
        opacity: element.opacity,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden' // Keep children within bounds
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {/* This div acts as the content area respecting padding */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {/* Render children if provided */}
        {children && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {children}
          </div>
        )}
        
        {/* Optional: Show placeholder text when empty */}
        {(!children || (Array.isArray(children) && children.length === 0)) && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              color: '#9ca3af',
              fontSize: '14px',
              fontStyle: 'italic'
            }}
          >
            {/* Drag elements here */}
          </div>
        )}
      </div>
    </div>
  );
}