import { BasicInformationForm } from "@/src/features/products/types";
import { Textarea } from "@/src/shared/form";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

export const DetailedDescription = () => {
    const { register, control } = useFormContext<BasicInformationForm>();

    const { errors, dirtyFields } = useFormState({ control, name: "basicInfo.longDescription" })

    const value = useWatch({ control, name: "basicInfo.longDescription" }) ?? "";

    return (
        <Textarea
            maxLength={3000}
            maxLengthLabel={3000}
            currentLengthLabel={value.length}
            rows={5}
            label="Descripción Detallada"
            labelOption={{
                type: "top",
                descrPosition:"bottom",
                description: "Se mostrará en la página de detalle del producto"
            }}
            placeholder="Describe en detalle las características, especificaciones y aspectos importantes del producto... (máximo 3,000 caracteres)"
            error={errors?.basicInfo?.longDescription?.message}
            isDirty={dirtyFields.basicInfo?.longDescription}
            {...register("basicInfo.longDescription")}
        />
    )
}

