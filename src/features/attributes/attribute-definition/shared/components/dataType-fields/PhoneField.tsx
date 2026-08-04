import { FieldProps } from "./FieldProps"


export const PhoneField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder="987654321"
            type="tel"
            value={(value as string) ?? ""}
            onChange={e => onChange(e.target.value)}
        />)
}
