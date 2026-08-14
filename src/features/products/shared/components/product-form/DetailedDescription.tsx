import { Textarea } from "@/src/shared/form";
import { useFormContext, useFormState } from "react-hook-form";

export const DetailedDescription = () => {
    const { register, control } = useFormContext<{ longDescription: string }>();

    const { errors, dirtyFields } = useFormState({ control, name: "longDescription" })

    return (
        <Textarea
            maxLength={3000}
            labelOption={{
                type: "top",
                description: "Se mostrará en la página de detalle del producto"
            }}
            placeholder="Describe en detalle las características, especificaciones y aspectos importantes del producto... (máximo 3,000 caracteres)"
            error={errors?.longDescription?.message}
            isDirty={dirtyFields.longDescription}
            {...register("longDescription")}
        />
    )
}

