import { FieldProps } from "./FieldProps"


export const UrlField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder="https://ejemplo.com"
            type="url"
            value={(value as string) ?? ""}
            onChange={e => onChange(e.target.value)}
        />)
}
