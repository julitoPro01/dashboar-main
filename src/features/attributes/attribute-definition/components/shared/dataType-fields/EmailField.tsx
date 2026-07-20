import { FieldProps } from "./FieldProps"


export const EmailField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder="ejemplo@gmail.com"
            type="email"
            value={(value as string) ?? ""}
            onChange={e => onChange(e.target.value)}
        />)
}
