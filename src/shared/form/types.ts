import { INPUT_FIELD_STYLE } from '../theme/inputField/inputFieldStyle';

export type FormInputProps={
    error?: string | boolean | undefined;
    isDirty?: boolean;
    isRequired?: boolean;
    value: string;
    label?: string;
    placeholder?: string;
    className?: string;
    description?:string;
    disabled?:boolean;
    onChange?: (v: string) => void
}

export type InputStateType = keyof typeof INPUT_FIELD_STYLE.states;

export type FormSkeletonProps = {
    label?: boolean;
    class0?: string;
    class1?: string;
}
