import { RegisterOptions } from "react-hook-form";

type DataType = | "VARCHAR" | "INT" | "DECIMAL" | "BOOLEAN" | "DATE"


interface Props {
    isRequired: boolean;
    dataType: DataType;
    attribute: { key: string };
}

export const getAttributeValidationRules = <
    TFieldValues extends Record<string, any>>(item: Props): RegisterOptions<TFieldValues, any> => {

    const rules: RegisterOptions<TFieldValues, any> = {};

    if (item.isRequired) {
        rules.required = `El atributo "${item.attribute.key}" es obligatorio`;
    }

    switch (item.dataType) {
        case "INT":
            rules.validate = value =>
                value === "" || Number.isInteger(Number(value)) || "Debe ser un número entero";
            break;

        case "DECIMAL":
            rules.validate = value =>
                value === "" || !isNaN(Number(value)) || "Debe ser un número decimal válido";
            break;

        case "BOOLEAN":
            rules.validate = value =>
                value === "" || ["true", "false", "0", "1"].includes(value.toLowerCase()) ||
                "Debe ser verdadero o falso";
            break;

        case "DATE":
            rules.validate = value =>
                value === "" || !isNaN(Date.parse(value)) || "Debe ser una fecha válida";
            break;

        case "VARCHAR":
        default:
            rules.maxLength = {
                value: 255,
                message: "Máximo 255 caracteres"
            };
            break;
    }

    return rules;
};
