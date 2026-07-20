"use client";

import { useForm } from "react-hook-form";
import { productFormSchema } from "../shared/types/productForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormProvider } from "../shared/ProductFormProvider";
import { ProductForm } from "../shared/ProductForm";
import { ProductFormData } from "../shared/types/productForm.type";

export const CreateProduct = () => {

  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(productFormSchema)
  });

  const handleSubmit = (val: ProductFormData) => {

  }

  return (
    <>
      <ProductFormProvider form={form} onSubmit={handleSubmit} >
        <ProductForm />
      </ProductFormProvider>
    </>
  )
}
