export const capitalize = (text: string) =>
    text
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .replace(/(^|\s)\p{L}/gu, match => match.toUpperCase());