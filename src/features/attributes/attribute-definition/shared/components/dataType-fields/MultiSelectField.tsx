import { FieldProps } from './FieldProps'

export const MultiSelectField = ({ value, onChange, attribute, className }: FieldProps) => {
    return (
        <select className={className}
            multiple
            value={(value as string) ?? []}
            onChange={e => {

                const values = [...e.target.selectedOptions]
                    .map(o => Number(o.value));

                onChange(values);

            }}
        >
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
