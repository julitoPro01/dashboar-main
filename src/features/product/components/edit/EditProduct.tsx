"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductForm, ProductFormProvider } from "../shared";
import { upsertProductSchema } from "../../validation/upsertProductForm.schema";
import { useRef } from "react";
import { createSlug, getDirtyValues } from "@/src/utils";
import { updateProduct } from "@/src/action";
import { MessageError, MessageSuccess } from "@/src/constants";
import { SupplierOptionsResponse } from "@/src/interfaces/supplier";
import { CategoriesResponse } from "@/src/interfaces/category";
import { ProductFormDataResponse } from "@/src/interfaces/products";
import { UpsertProductForm } from "../../type/upsertProductForm.type";
import { ToastError, ToastSuccess } from "@/src/components/ui";


interface Props {
  productFormData: {
    suppliers: SupplierOptionsResponse;
    mainCategories: CategoriesResponse;
    productStatuses: [];
  };
  user: { id: number, name: string };
  productForm: ProductFormDataResponse
}

export const EditProduct = ({ productFormData, productForm, user }: Props) => {

  const { suppliers, mainCategories, productStatuses } = productFormData;

  const initForm = useRef<UpsertProductForm>({
    name: productForm.name,
    shortDescription: productForm.shortDescription,
    supplierId: productForm.supplierId,
    longDescription: productForm.longDescription ?? undefined,
    images: productForm.images.map(v => ({
      id: v.id,
      fileId: v.fileId,
      previewUrl: v.imageUrl,
      isPrimary: v.isPrimary,
      displayOrder: v.displayOrder
    })),
    selectedCategories: productForm.selectedCategories
  })

  const form = useForm<UpsertProductForm>({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: initForm.current
  });

  const onSubmit = async (data: UpsertProductForm) => {

    const values = getDirtyValues(form.formState.dirtyFields, data);
    const mainCategory = values.selectedCategories?.find(v => !v.parentId);
    const name = values.name;

    if (!form.formState.isDirty) return;

    const res = await updateProduct({
      supplierId: values.supplierId,
      mainCategoryId: mainCategory ? mainCategory.id : undefined,
      name,
      longDescription: values.longDescription,
      shortDescription: values.shortDescription,
      slug: name ? createSlug(name) : undefined
    },
      undefined, // Imagenes
      values.selectedCategories?.map(v => ({
        categoryId: v.id, productId: productForm.id
      })),
      { updateById: user.id, updatedBy: user.name },
      productForm.id);

    if (res.ok) {
      toastSuccess(res.data!.publicId);
      form.reset(data);
    } else {
      toastError();
    }

  }


  return (
    <ProductFormProvider form={form} onSubmit={onSubmit} >
      <ProductForm
        suppliers={suppliers}
        mainCategories={mainCategories}
      />
    </ProductFormProvider>
  )
}


const msgSucc = MessageSuccess.update("Producto");
const msgErr = MessageError.update("Producto");

const toastSuccess = (publicId:string) => ToastSuccess({
  title: msgSucc.title,
  description: msgSucc.description,
  link:{href:`/product/${publicId}`,title:"Ver detalles"}
}, { duration: 5000 });

const toastError = () => ToastError({
  title: msgErr.title,
  description: msgErr.description
}, { duration: 5000 })