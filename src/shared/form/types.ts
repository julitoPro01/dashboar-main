
export type FieldType = "text" | "number" | "date" | "checkbox" | "select" | "multiselect"

export type RoundedSize = "sm" | "md" | "lg" | "xl" | "full" | "none" | "left" | "right"

export type TextSize = "sm" | "lg" | "xl" | "xs" | "2xl"
export type FieldSize = "sm" | "md" | "lg" | "xl";

type Label = {
    required?: boolean,
}

type LabelOption =
    | { type: "left" } & Label
    | { type: "left-join", border?: string, rounded?: string } & Label
    | { type: "top", description?: string, descrPosition?: "top" | "bottom" } & Label
    | { type: "top-floating", description?: string } & Label

export interface FormInputProps {

    roundedSize?: RoundedSize;
    border?: 0 | 1 | 2;
    fieldSize?: FieldSize;
    textSize?: TextSize;
    fieldClass?: string,

    error?: string | boolean | undefined;
    isDirty?: boolean;

    labelOption?: LabelOption;
    label?: string

    fieldIcon?: React.ReactNode;
    iconPosition?: "left" | "right"

    maxLengthLabel?: number
    currentLengthLabel?: number
}

export type FieldStatusType = "error" | "normal" | "dirty";

export type FormSkeletonProps = {
    node?: string;
    label?: boolean;
    field?: string;
}
