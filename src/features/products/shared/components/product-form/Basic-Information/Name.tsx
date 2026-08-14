import { useFormContext, useFormState } from "react-hook-form"
import { Input } from "@/src/shared/form";
import { ProductFormData } from "@/src/features/products/types";

export const Name = () => {

  const { register,control } = useFormContext<ProductFormData>()

  const {errors,dirtyFields} = useFormState({control,name:"name"})
  
  return (
    <Input
      label="Nombre"
      placeholder="e.g Premiun Watch"
      labelOption={{type:"top",required:true}}
      error={errors?.name?.message}
      isDirty={dirtyFields.name}
      {...register("name")}
    />
  )
}
