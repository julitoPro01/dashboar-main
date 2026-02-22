type Props = Record<string, any>;

export const getHasValues = <T extends Props>(data: T): Partial<T> => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        // Verificar si el valor existe
        const hasValue = (() => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim() !== '';
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === 'object') {
                // Para objetos, verificar si tiene propiedades
                return Object.keys(value).length > 0;
            }
            return true; // Para numbers, booleans, etc.
        })();
        
        if (hasValue) {
            acc[key as keyof T] = value;
        }
        
        return acc;
    }, {} as Partial<T>);
};