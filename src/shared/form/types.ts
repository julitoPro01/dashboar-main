
export type FieldType = "text" | "number" | "date" | "checkbox" | "select" | "multiselect"

export type RoundedSize = "sm" | "md" | "lg" | "xl" | "full" | "none" | "left" | "right"

export type TextSize = "sm" | "lg" | "xl" | "xs" | "2xl"
export type FieldSize = "sm" | "md" | "lg" | "xl";

type Label = {
    required?: boolean,
}

export interface FormInputCustomProps {

    description?:string;
    descrPosition?:"top" | "bottom";

    roundedSize?: RoundedSize;
    border?: 0 | 1 | 2;
    fieldSize?: FieldSize;
    textSize?: TextSize;
    fieldClass?: string,

    error?: string | boolean | undefined;
    isDirty?: boolean;
    positionError?:"floating" | "relative"

    labelPosition?:"left"|"left-join"|"top"|"top-floating"
    label?: string;
    labelBg?:string;

    fieldIcon?: React.ReactNode;
    iconPosition?: "left" | "right"

    maxLengthLabel?: number
    currentLengthLabel?: number

    disabledLabel?:boolean
}

export type FieldStatusType = "error" | "normal" | "dirty";

export type FormSkeletonProps = {
    node?: string;
    label?: boolean;
    field?: string;
}
