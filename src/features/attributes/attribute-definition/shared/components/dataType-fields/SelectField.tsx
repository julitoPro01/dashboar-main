import { FieldProps } from './FieldProps'

export const SelectField = ({ value, onChange, attribute, className }: FieldProps) => {
    return (
        <select className={className}
            value={(value as number) ?? ""}
            onChange={e => onChange(Number(e.target.value))}
        >
            <option value="">Seleccionar...</option>

            {attribute.options?.map(option => (
                <option
                    key={option.id}
                    value={option.id}
                >
                    {option.value}
                </option>
            ))}
        </select>)
}
