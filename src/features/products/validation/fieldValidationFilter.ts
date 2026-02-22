import { ProductTableFilter } from "@/src/interfaces/products";
import { isPercentage, isPositiveNumber, isValidDate, isValidHtmlDate } from "@/src/utils";

export const validateField = (key: string, value: string): boolean => {
    const v = value.trim();
    if (!v) return false;

    switch (key) {
        case "search":
            return v.length >= 5;

        case "priceMin":
        case "priceMax":
            return isPositiveNumber(v);

        case "discountMin":
        case "discountMax":
            return isPercentage(v);

        case "registeredFrom":
        case "registeredTo":
            return isValidHtmlDate(v);

        default:
            return true;
    }
};


export const validateFieldWithError = (
    key: keyof ProductTableFilter,
    value: string
): string | undefined => {
    const v = value.trim();

    if (!v) return undefined; // vacío = sin error

    switch (key) {
        case "search":
            if (v.length < 5) return "Mínimo 5 caracteres";
            break;

        case "priceMin":
        case "priceMax":
            if (Number.isNaN(Number(v))) return "Debe ser un número";
            if (Number(v) < 0) return "No puede ser negativo";
            break;

        case "discountMin":
        case "discountMax":
            if (Number.isNaN(Number(v))) return "Debe ser un número";
            if (Number(v) < 0 || Number(v) > 100)
                return "Debe estar entre 0 y 100";
            break;

        case "registeredFrom":
        case "registeredTo":
            if (!isValidHtmlDate(v)) return "Fecha inválida";
            break;
    }

    return undefined;
};
