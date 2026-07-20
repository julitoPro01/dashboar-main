import { FieldProps } from "./FieldProps"


export const LongTextField = ({ value, onChange, attribute, className }: FieldProps) => {
    return (
        <textarea className={className}
            value={(value as string) ?? ""}
            placeholder={attribute.placeholder}
            required={attribute.isRequired}
            onChange={e => onChange(e.target.value)}
        />)
}
