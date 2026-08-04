export function getDirtyValues<T extends Record<string, unknown>>(
    oldValues: Partial<T>,
    newValues: Partial<T>
): Partial<T> {
    const result: Partial<Record<string,unknown>> = {};

    for (const key in newValues) {
        const oldValue = oldValues[key];
        const newValue = newValues[key];

        // Objetos
        if (
            typeof newValue === "object" &&
            newValue !== null &&
            !Array.isArray(newValue)
        ) {
            const nestedDiff = getDirtyValues(
                (oldValue as Record<string, unknown>) ?? {},
                newValue as Record<string, unknown>
            );

            if (Object.keys(nestedDiff).length > 0) {
                result[key] = nestedDiff as T[Extract<keyof T, string>];
            }
        }

        // Arrays
        else if (Array.isArray(newValue)) {
            if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                result[key] = newValue;
            }
        }

        // Primitivos
        else if (oldValue !== newValue) {
            result[key] = newValue;
        }
    }

    return result as Partial<T>;
}