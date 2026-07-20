
interface Props {
    onSubmit: () => void;
    fieldName: string;
    onChange: (fieldName: string) => void;
    isSubmitting?:boolean;
}

export const Form = ({ onSubmit, onChange, fieldName,isSubmitting }: Props) => {
    return (
        <form
            className=" w-full"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}>
            <input
                onClick={(e) => e.stopPropagation()}
                disabled={isSubmitting}
                autoFocus
                onFocus={e=>e.target.select()}
                className="flex-1 w-full border-0 font-semibold text-text-muted  focus:ring-0  outline-none transition-all"
                type="text" name="category"
                value={fieldName}
                placeholder="Nombre de categoría"
                onBlur={() => onSubmit()}
                onChange={(e) => onChange(e.target.value)}
            />
        </form>)
}
