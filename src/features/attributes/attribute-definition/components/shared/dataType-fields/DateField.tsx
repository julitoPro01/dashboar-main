import { FieldProps } from './FieldProps'

export const DateField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder='01/01/2026'
            type="date"
            value={(value as string) ?? ""}
            onChange={e => onChange(e.target.value)}
        />)
}
