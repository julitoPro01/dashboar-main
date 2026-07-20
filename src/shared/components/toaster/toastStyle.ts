
// toastStyles.ts
// toastStyles.ts
// toastStyles.ts
export const TOAST_STYLE = {
    base: {
        background: 'linear-gradient(135deg, #121214 0%, #1a1a1e 100%)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '12px',
        // Sombra negra pura muy difuminada para dar elevación real sin luces de colores
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
        color: '#f4f4f5',
        padding: '14px 16px',
        fontSize: '14px',
        fontWeight: '500',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    } as React.CSSProperties,

    // Loading - Azul sutil
    loading: {
        background: 'linear-gradient(135deg, #121214 0%, #0f1622 100%)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        color: '#60a5fa',
        borderLeft: '4px solid #3b82f6',
    } as React.CSSProperties,

    // Success - Verde esmeralda elegante
    success: {
        background: 'linear-gradient(135deg, #121214 0%, #0c1b14 100%)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        color: '#34d399',
        borderLeft: '4px solid #10b981',
    } as React.CSSProperties,

    // Error - Rojo sobrio
    error: {
        background: 'linear-gradient(135deg, #121214 0%, #1f1010 100%)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        color: '#f87171',
        borderLeft: '4px solid #ef4444',
    } as React.CSSProperties,

    // Warning - Ámbar fino
    warning: {
        background: 'linear-gradient(135deg, #121214 0%, #1c140c 100%)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        color: '#fbbf24',
        borderLeft: '4px solid #f59e0b',
    } as React.CSSProperties,

    // Info - Cian oscuro
    info: {
        background: 'linear-gradient(135deg, #121214 0%, #0c191d 100%)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        color: '#22d3ee',
        borderLeft: '4px solid #06b6d4',
    } as React.CSSProperties,
};



// Función para combinar estilos
export const getToastStyle = (type: 'loading' | 'success' | 'error' | 'warning' | 'info' = 'loading'): React.CSSProperties => {
    return {
        ...TOAST_STYLE.base,
        ...TOAST_STYLE[type],
    };
};