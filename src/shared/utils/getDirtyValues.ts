

export function getDirtyValues<T>(
  oldValues: T,
  newValues: T
): Partial<T> {
  const result: Partial<Record<string, any>> = {};

  for (const key in newValues) {
    const oldValue = oldValues?.[key];
    const newValue = newValues?.[key];

    // 🔹 Si ambos son objetos (y no null)
    if (
      typeof newValue === "object" &&
      newValue !== null &&
      !Array.isArray(newValue)
    ) {
      const nestedDiff = getDirtyValues(
        oldValue || {},
        newValue
      );

      if (Object.keys(nestedDiff).length > 0) {
        result[key] = nestedDiff as any;
      }
    }

    // 🔹 Si son arrays
    else if (Array.isArray(newValue)) {
      const arraysAreEqual =
        JSON.stringify(oldValue) === JSON.stringify(newValue);

      if (!arraysAreEqual) {
        result[key] = newValue;
      }
    }

    // 🔹 Valores primitivos
    else {
      if (oldValue !== newValue) {
        result[key] = newValue;
      }
    }
  }

  return result as T;
}
