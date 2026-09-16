export const isValidImageSrc = (value: string) => {
    if (value.startsWith("/")) {
        return true;
    }

    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};