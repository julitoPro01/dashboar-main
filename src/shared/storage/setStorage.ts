
export const setStorage = (key: string, value: any) => {

    try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);

    } catch (error) {
        console.error("Error setting item in localStorage:", error);
    }

}
