import clsx from "clsx"
import { INPUT_FIELD_STYLE } from "../theme/inputField"
import { FormInputProps, InputStateType } from "./types";


export const Input = ({
    error = false,
    isDirty = false,
    isRequired = false,
    label,
    value = "",
    placeholder = "",
    className = "",
    description = "",
    onChange, disabled = false
}: FormInputProps) => {

    const state: InputStateType = error ? "error" : isDirty ? "dirty" : "normal";


    return (
        <div className={className}>

            {label
                ? <label className={`${INPUT_FIELD_STYLE.label} ${isRequired ? INPUT_FIELD_STYLE.isRequired : ""}`}>{label}</label>
                : ""
            }

            {
                description
                    ? <span className="text-xs font-medium text-text-muted"> {description} </span>
                    : ""
            }

            <input type="text"
                className={clsx(
                    disabled ? INPUT_FIELD_STYLE.baseDisabled : INPUT_FIELD_STYLE.base,
                    INPUT_FIELD_STYLE.states[state])}
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={({ target: { value } }) => onChange?.(value)}
            />

            {error
                ? <span className={INPUT_FIELD_STYLE.labelError} >{error}</span>
                : ""
            }
        </div>
    )
}
