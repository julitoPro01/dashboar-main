import { ProductFormData } from "@/src/features/products/types";
import { Textarea } from "@/src/shared/form";
import { useFormContext, useFormState } from "react-hook-form"

export const ShortDescription = () => {
    const { register,control } = useFormContext<ProductFormData>();

      const {errors,dirtyFields} = useFormState({control,name:"shortDescription"})
    

    return (

        <Textarea
            label="Descripción corta"
            labelOption={{type:"top",required:true,
                description:"Se mostrará en vistas de lista y tarjetas"
            }}
            rows={3}
            maxLength={300}
            minLength={10}
            placeholder="Resume las principales características y beneficios del producto... (máximo 300 caracteres)"
            error={errors.shortDescription?.message}
            isDirty={dirtyFields.shortDescription}
            {...register("shortDescription")}
        />

    )
}
