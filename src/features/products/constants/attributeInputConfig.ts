import { AttributeDataTypeDb } from "../../attributes/attribute-definition/types";
import { AttributeInputConfig } from "../types";


export const ATTRIBUTE_INPUT_CONFIG: Record<
    AttributeDataTypeDb,
    AttributeInputConfig
> = {
    BOOLEAN: {
        input: "checkbox",
        field: "valueBoolean",
    },

    COLOR: {
        input: "text",
        field: "valueText",
    },

    DATE: {
        input: "date",
        field: "valueDate",
    },

    DECIMAL: {
        input: "number",
        field: "valueNumber",
    },

    EMAIL: {
        input: "text",
        field: "valueText",
    },

    LONG_TEXT: {
        input: "textarea",
        field: "valueText",
    },

    MULTISELECT: {
        input: "multiselect",
        field: "valueOptionIds",
    },

    NUMBER: {
        input: "number",
        field: "valueNumber",
    },

    PHONE: {
        input: "text",
        field: "valueText",
    },

    SELECT: {
        input: "select",
        field: "valueNumber",
    },

    TEXT: {
        input: "text",
        field: "valueText",
    },

    URL: {
        input: "text",
        field: "valueText",
    },
};