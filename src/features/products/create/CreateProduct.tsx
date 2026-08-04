"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider } from "@/src/shared/form";
import { ProductForm } from "../shared/components";
import { ProductFormData, productFormSchema } from "../types";

export const CreateProduct = () => {

  const form = useForm({ resolver: zodResolver(productFormSchema) });

  const handleSubmit = (val: ProductFormData) => {

  }

  return (
    <>
      <FormProvider form={form} onSubmit={handleSubmit} >
        <ProductForm />
      </FormProvider>
    </>
  )
}
