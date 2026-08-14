"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoDocumentTextOutline, IoInformationCircleOutline } from "react-icons/io5"
import { MdOutlineCategory } from "react-icons/md"
import { RiListIndefinite } from "react-icons/ri"

import { FormCard, FormProvider } from "@/src/shared/form";
import { ProductFormSections } from "../shared/components";
import { ProductFormData, productFormSchema } from "../types";
import { FormActions } from "./FormActions";


export const CreateProduct = () => {

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      images: [],
      systemAttributes: [],
      customAttributes: []
    }
  });

  console.log("create product")

  const handleSubmit = (val: ProductFormData) => {

  }

  return (
    <>
      <FormProvider form={form} onSubmit={handleSubmit} >


        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">

          <FormCard className="col-span-2"
            title="Información básica"
            titleIcon={<IoInformationCircleOutline />} >
            <ProductFormSections.BasicInformation />
          </FormCard>

          <FormCard className="col-span-2 xl:col-span-1"
            title="Descripción detallada" titleIcon={<IoDocumentTextOutline />}>
            <ProductFormSections.DetailedDescription />
          </FormCard>

          <div className="col-span-2">
            <ProductFormSections.Gallery />
          </div>

          <FormCard className="col-span-2 xl:col-span-1"
            title="Categorización" titleIcon={<MdOutlineCategory />}>
            <ProductFormSections.Categorization />
          </FormCard>

          <FormCard className="col-span-2 xl:col-span-3" title="Propiedades" titleIcon={<RiListIndefinite />}
          description="Completa las propiedades definidas para la categoría de este producto." >
            <ProductFormSections.SystemAttributes />
          </FormCard>

          <div className="col-span-2 xl:col-span-3">

            <ProductFormSections.CustomAttributes />

          </div>

        </div>

        <FormActions />
      </FormProvider>
    </>
  )
}
