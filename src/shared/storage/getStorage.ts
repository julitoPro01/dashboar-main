export const getStorage = (key: string) => {

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    catch (error) {
        console.error("Error getting item from localStorage:", error);
        return null;
    }
}