
// toastStyles.ts
export const toastStyles = {
    // Estilo base común
    base: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        color: '#fafafa',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        backdropFilter: 'blur(10px)',
    } as React.CSSProperties,

    // Loading - Azul vibrante
    loading: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(59, 130, 246, 0.1)',
        color: '#dbeafe',
        borderLeft: '4px solid #3b82f6',
    } as React.CSSProperties,

    // Success - Verde vibrante
    success: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #022c22 100%)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(34, 197, 94, 0.1)',
        color: '#dcfce7',
        borderLeft: '4px solid #22c55e',
    } as React.CSSProperties,

    // Error - Rojo vibrante
    error: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #450a0a 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(239, 68, 68, 0.1)',
        color: '#fee2e2',
        borderLeft: '4px solid #ef4444',
    } as React.CSSProperties,

    // Warning - Amarillo vibrante
    warning: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #422006 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(245, 158, 11, 0.1)',
        color: '#fef3c7',
        borderLeft: '4px solid #f59e0b',
    } as React.CSSProperties,

    // Info - Cian vibrante
    info: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #164e63 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        boxShadow: '0 10px 30px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(6, 182, 212, 0.1)',
        color: '#cffafe',
        borderLeft: '4px solid #06b6d4',
    } as React.CSSProperties,
};

// Función para combinar estilos
export const getToastStyle = (type: 'loading' | 'success' | 'error' | 'warning' | 'info' = 'loading'): React.CSSProperties => {
    return {
        ...toastStyles.base,
        ...toastStyles[type],
    };
};