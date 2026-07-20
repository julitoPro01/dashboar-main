import { FieldProps } from './FieldProps'

export const DecimalField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder='Ej. 0.01'
            type="number"
            step="0.01"
            value={(value as number) ?? ""}
            onChange={e => onChange(Number(e.target.value))}
        />)
}
