import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField"
import clsx from "clsx"
import { useFormContext } from "react-hook-form"

export const ShortDescription = () => {
    const { register } = useFormContext<{ shortDescription: string }>();
    return (
        <div>
            <label className={INPUT_FIELD_STYLE.label + " " + INPUT_FIELD_STYLE.isRequired}>Descripción corta</label>
            <textarea className={clsx(INPUT_FIELD_STYLE.base, "max-h-30 min-h-15", INPUT_FIELD_STYLE.states.normal)}
                rows={3}
                maxLength={300}
                minLength={10}
                placeholder="Resumen breve para vistas de lista y tarjeta (máximo 300 caracteres)"
                {...register("shortDescription")}
            />
        </div>
    )
}
