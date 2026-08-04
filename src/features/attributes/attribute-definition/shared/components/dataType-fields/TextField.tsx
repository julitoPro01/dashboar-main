import { FieldProps } from './FieldProps'

export const TextField = ({ value, attribute, onChange, className }: FieldProps) => {
    return (
        <input
            type="text"
            value={(value as string) ?? ""}
            placeholder={attribute.placeholder}
            required={attribute.isRequired}
            onChange={e => onChange(e.target.value)}
            className={className}
        />)
}
