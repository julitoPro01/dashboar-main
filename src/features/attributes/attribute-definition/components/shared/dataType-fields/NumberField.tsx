import { FieldProps } from './FieldProps'

export const NumberField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder='000-000'
            type="number"
            step={1}
            value={(value as number) ?? ""}
            onChange={e => onChange(Number(e.target.value))}
        />)
}
