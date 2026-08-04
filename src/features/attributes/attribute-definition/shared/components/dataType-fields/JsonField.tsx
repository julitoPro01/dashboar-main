import { FieldProps } from "./FieldProps"


export const JsonField = ({ value, onChange, className }: FieldProps) => {
    return (
        <textarea className={className}
            placeholder="Textos especiales..."
            spellCheck={false}
            value={
                typeof value === "string"
                    ? value
                    : JSON.stringify(value ?? {}, null, 2)
            }
            onChange={e => onChange(e.target.value)}
        />)
}
