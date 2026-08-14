
export type FieldType = "text" | "number" | "date" | "checkbox" | "select" | "multiselect"

export type RoundedSize = "sm" | "md" | "lg" | "xl" | "full" | "none" | "left" | "right"

export type TextSize = "sm" | "lg" | "xl" | "xs" | "2xl"
export type FieldSize = "sm" | "md" | "lg" | "xl";

type Label = {
    required?: boolean,
}

type LabelOption =
    | { type: "left" } & Label
    | { type: "left-join",border?:string, rounded?:string} & Label
    | { type: "top", description?: string } & Label
    | { type: "top-floating" } & Label

export interface FormInputProps {

    roundedSize?: RoundedSize;
    border?: 0 | 1 | 2;
    fieldSize?: FieldSize;
    textSize?: TextSize;
    fieldIcon?: React.ReactNode;
    fieldClass?: string,
    error?: string | boolean | undefined;
    isDirty?: boolean;
    labelOption?: LabelOption;
    label?:string
}

export type FieldStatusType = "error" | "normal" | "dirty";

export type FormSkeletonProps = {
    node?: string;
    label?: boolean;
    field?: string;
}
