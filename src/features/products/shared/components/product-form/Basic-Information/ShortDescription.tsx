import { ProductFormData } from "@/src/features/products/types";
import { Textarea } from "@/src/shared/form";
import { useFormContext, useFormState, useWatch } from 'react-hook-form';

export const ShortDescription = () => {
    const { register, control } = useFormContext<ProductFormData>();

    const { errors, dirtyFields } = useFormState({ control, name: "basicInfo.shortDescription" })

    const value = useWatch({ control, name: "basicInfo.shortDescription" }) ?? ""

    return (

        <Textarea
            label="Descripción Corta"
            labelOption={{
                type: "top", required: true,
                descrPosition:"bottom",
                description: "Se mostrará en vistas de lista y tarjetas"
            }}
            rows={5}
            maxLength={300}
            minLength={10}
            maxLengthLabel={300}
            currentLengthLabel={value.length}

            placeholder="Resume las principales características y beneficios del producto... (máximo 300 caracteres)"
            error={errors.basicInfo?.shortDescription?.message}
            isDirty={dirtyFields.basicInfo?.shortDescription}
            {...register("basicInfo.shortDescription")}
        />

    )
}
