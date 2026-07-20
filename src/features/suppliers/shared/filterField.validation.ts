import { isValidHtmlDate } from "@/src/shared/utils";
import { SupplierTableFilter } from "../types";

export const validateFieldDate =(value:string)=>{

}

export const validateField = (key: string, value: string): boolean => {
    const v = value.trim();
    if (!v) return false;

    switch (key) {
        case "search":
            return v.length >= 3;

        case "registeredFrom":
        case "registeredTo":
            return isValidHtmlDate(v);

        default:
            return true;
    }
};


export const validateFieldWithError = (
    key: keyof SupplierTableFilter,
    value: string, filters: SupplierTableFilter
): string | undefined => {
    const v = value.trim();

    if (!v) return undefined; // vacío = sin error

    switch (key) {
        case "search":
            if (v.length < 3) return "Mínimo 5 caracteres";
            break;

        case "registeredFrom":
        case "registeredTo":
            if (!isValidHtmlDate(v)) return "Fecha inválida";
            if (filters.registeredFrom && filters.registeredTo) {
                if (new Date(filters.registeredFrom) > new Date(filters.registeredTo))
                    return "Fecha inválida";
            }
            break;
    }

    return undefined;
};


