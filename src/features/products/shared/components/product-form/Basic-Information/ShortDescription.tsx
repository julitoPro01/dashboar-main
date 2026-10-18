import { ProductFormData } from "@/src/features/products/types";
import { Textarea } from "@/src/shared/form";
import { useFormContext, useFormState, useWatch } from 'react-hook-form';

export const ShortDescription = () => {
    const { register, control } = useFormContext<ProductFormData>();

    const { errors, dirtyFields } = useFormState({ control, name: "basicInfo.shortDescription" })

    const value = useWatch({ control, name: "basicInfo.shortDescription" }) ?? ""

    return (

        <Textarea
            custom={{
                label: "Descripción Corta",
                labelPosition: "top",
                descrPosition: "bottom",
                description: "Se mostrará en vistas de lista y tarjetas",
                maxLengthLabel: 300,
                currentLengthLabel: value.length,
                error: errors.basicInfo?.shortDescription?.message,
                isDirty: dirtyFields.basicInfo?.shortDescription,
            }}
            required
            rows={5}
            maxLength={300}
            minLength={10}

            placeholder="Resume las principales características y beneficios del producto... (máximo 300 caracteres)"
            {...register("basicInfo.shortDescription")}
        />

    )
}
