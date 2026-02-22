
export const isNotEmpty = (v: string) => v.trim().length > 0;

export const isNumeric = (v: string) => !Number.isNaN(Number(v));

export const isPositiveNumber = (v: string) =>
    isNumeric(v) && Number(v) >= 0;

export const isPercentage = (v: string) =>
    isNumeric(v) && Number(v) >= 0 && Number(v) <= 100;

export const isValidDate = (v: string) =>
    !Number.isNaN(Date.parse(v));

export const isValidHtmlDate = (v: string): boolean => {
    // 1️⃣ formato exacto YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;

    const [year, month, day] = v.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    // 2️⃣ verificar que no haya autocorrección
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};
