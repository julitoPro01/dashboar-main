import clsx from "clsx"
import { INPUT_FIELD_STYLE } from "../theme/inputField"
import { FormInputProps, InputStateType } from "./types";

interface Props extends FormInputProps {
    rows?: number
}

type State = keyof typeof INPUT_FIELD_STYLE.states


export const Textarea = ({
    error = false,
    isDirty = false,
    isRequired = false,
    label,
    value = "",
    placeholder = "",
    className = "",
    rows,
    onChange,
}: Props) => {

    const state: InputStateType =
        error ? "error"
            : isDirty ? "dirty"
                : "normal";

    return (
        <div className={className}>
            {label
                ? <label className={`${INPUT_FIELD_STYLE.label} ${isRequired ? INPUT_FIELD_STYLE.isRequired : ""}`}>{label}</label>
                : ""}

            <textarea className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states[state])}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={({ target: { value } }) => onChange?.(value)}
            >
            </textarea>

            {error
                ? <span className={INPUT_FIELD_STYLE.labelError} >{error}</span>
                : ""
            }
        </div>
    )
}
