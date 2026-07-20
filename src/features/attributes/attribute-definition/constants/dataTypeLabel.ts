import { AttributeDataTypeDb } from "../types";

export const ATTRIBUTE_DATATYPE_LABEL: Record<AttributeDataTypeDb, string> = {
    TEXT: "Texto corto",
    LONG_TEXT: "Texto largo",
    NUMBER: "Número entero",
    DECIMAL: "Número decimal",
    DATE: "Fecha",
    BOOLEAN: "Booleano",
    SELECT: "Selección única",
    MULTISELECT: "Selección múltiple",
    COLOR: "Color",
    URL: "Enlace web",
    EMAIL: "Correo electrónico",
    PHONE: "Teléfono",
    JSON: "Formato JSON"
}


export const DATA_TYPE_OPTIONS = Object.entries(ATTRIBUTE_DATATYPE_LABEL).map(([value,label])=>({value,label}));
