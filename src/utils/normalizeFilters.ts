type FilterValues = Record<string, string>;

interface Props<T extends FilterValues> {
    filters: T;
    errors: Partial<Record<keyof T, string>>;
    validateField: (key: keyof T, value: string) => boolean;
}


export const normalizeFilters = <T extends Record<string, string>>({
    filters,
    errors,
    validateField,
}: Props<T>): T => {

    const entries = Object.entries(filters)
        .filter(([key, value]) => {
            if (errors[key as keyof T]) return false;
            if (value !== undefined) return true;
        })
        .filter(([key, value]) => validateField(key as keyof T, value))
        .map(([key, value]) => [key, value.trim()]);

    return Object.fromEntries(entries);
}