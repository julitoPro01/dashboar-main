import { FieldProps } from './FieldProps'

export const ColorField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            placeholder='Ej. Rojo'
            type="color"
            value={(value as string) ?? "#000000"}
            onChange={e => onChange(e.target.value)}
        />)
}
