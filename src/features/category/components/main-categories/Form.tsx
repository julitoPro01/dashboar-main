
interface Props {
    onSubmit: () => void;
    fieldName: string;
    onChange: (fieldName: string) => void;
}

export const Form = ({ onSubmit, onChange, fieldName }: Props) => {
    return (
        <form
            className=" w-full"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}>
            <input
                onClick={(e) => e.stopPropagation()}
                autoFocus
                className="flex-1 w-full tracking-wide text-lg border-0  focus:ring-0  outline-none transition-all"
                type="text" name="category"
                value={fieldName}
                placeholder="Nombre de categoría"
                onBlur={() => onSubmit()}
                onChange={(e) => onChange(e.target.value)}
            />
        </form>)
}
