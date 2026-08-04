import { FieldProps } from './FieldProps'

export const BooleanField = ({ value, onChange, className }: FieldProps) => {
    return (
        <input className={className}
            type="checkbox"
            checked={Boolean(value)}
            onChange={e => onChange(e.target.checked)}
        />)
}
