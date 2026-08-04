import clsx from "clsx";
import { INPUT_FIELD_STYLE } from "../theme/inputField";
import { FormInputProps, InputStateType } from "./types"


export const Select = ({
    error = false,
    isDirty = false,
    isRequired = false,
    label,
    value = "",
    className = "",
    description = "",
    children,
    onChange,
}: FormInputProps & { children: React.ReactNode }) => {

    const state: InputStateType = error ? "error" : isDirty ? "dirty" : "normal";

    return (
        <div className={className}>
            <label className={`${INPUT_FIELD_STYLE.label} ${isRequired && INPUT_FIELD_STYLE.isRequired}`}>{label}</label>
            {
                description &&
                <span className="text-xs font-medium text-text-muted"> {description} </span>
            }
            <select
                className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states[state])}
                value={value}
                onChange={({ target: { value } }) => onChange?.(value)}
            >
                <option value={0} className="text-text-muted" > Seleccionar</option>
            
                {children}
            </select>
            {error && <span className={INPUT_FIELD_STYLE.labelError} >{error}</span>}
        </div>
    )
}
