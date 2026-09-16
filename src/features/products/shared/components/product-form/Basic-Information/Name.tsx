import { useFormContext, useFormState, useWatch } from "react-hook-form"
import { Input } from "@/src/shared/form";
import { ProductFormData } from "@/src/features/products/types";

export const Name = () => {

  const { register, control } = useFormContext<ProductFormData>()

  const { errors, dirtyFields } = useFormState({ control, name: "basicInfo.name" })

  const value = useWatch({ control, name: "basicInfo.name" }) ?? "";

  return (
    <Input
      label="Nombre"
      placeholder="e.g Premiun Watch"
      labelOption={{ type: "top", 
        descrPosition:"bottom",
        description: "Usa títulos descriptivos orientados al SEO comercial", required: true }}
      error={errors?.basicInfo?.name?.message}
      isDirty={dirtyFields.basicInfo?.name}
      maxLengthLabel={150}
      currentLengthLabel={value.length}
      {...register("basicInfo.name")}
    />
  )
}
