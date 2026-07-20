type InputMessageParams = {
    field?: string
    min?: number
    max?: number
    value?: string | number
}

export const inputMsg = {

    required: (p?: InputMessageParams) =>
        `El campo ${p?.field ?? ""} es obligatorio.`,

    minLength: (p: InputMessageParams) =>
        `Debe tener al menos ${p.min} caracteres.`,

    maxLength: (p: InputMessageParams) =>
        `No debe exceder ${p.max} caracteres.`,

    minValue: (p: InputMessageParams) =>
        `El valor mínimo permitido es ${p.min}.`,

    maxValue: (p: InputMessageParams) =>
        `El valor máximo permitido es ${p.max}.`,

    email: () =>
        "Ingrese un correo electrónico válido.",

    url: () =>
        "Ingrese una URL válida.",

    pattern: () =>
        "Formato inválido.",

    number: () =>
        "Debe ser un número válido.",

    integer: () =>
        "Debe ser un número entero.",

    positive: () =>
        "Debe ser un número positivo.",

    noSpaces: () =>
        "No debe contener espacios.",

    invalid: () =>
        "Valor inválido."

} as const;