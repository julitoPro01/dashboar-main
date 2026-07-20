import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField"
import clsx from "clsx"
import { useFormContext } from "react-hook-form"

export const LongDescription = () => {
    const { register } = useFormContext<{ longDescription: string }>();
    return (
        <div className="h-full">
            <textarea className={clsx(INPUT_FIELD_STYLE.base, "min-h-full max-h-100", INPUT_FIELD_STYLE.states.normal)}
                maxLength={3000}
                placeholder="Describe las especificaciones, características y detalles a fondo de este producto (Máximo 3,000 caracteres)..."
                {...register("longDescription")}
            />
        </div>
    )
}
