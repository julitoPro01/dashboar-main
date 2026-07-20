export const capitalize = (text: string) =>
    text
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());