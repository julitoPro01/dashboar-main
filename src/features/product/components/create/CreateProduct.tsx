"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upsertProductSchema } from "../../validation/upsertProductForm.schema";
import { ProductForm, ProductFormProvider } from "../shared";
import { addProduct } from "@/src/action";
import { createSlug } from "@/src/utils";
import { MessageError, MessageSuccess } from "@/src/constants";
import { sortCategoriesByParent } from "@/src/features/category/utils";
import { CategoryResponse } from "@/src/interfaces/category";
import { UpsertProductForm } from "../../type/upsertProductForm.type";
import { ToastError, ToastSuccess } from "@/src/components/ui";


interface Props {
    productFormData: {
        suppliers: {name:string,id:number,capability:string}[];
        mainCategories: CategoryResponse[];
    }
    user: { id: number, name: string };
}

export const CreateProduct = ({ productFormData, user }: Props) => {

    const { suppliers, mainCategories } = productFormData;


    const form = useForm<UpsertProductForm>({
        resolver: zodResolver(upsertProductSchema),
        defaultValues: initForm,
    });



    const onSubmit = async (state: UpsertProductForm) => {

        const sort = sortCategoriesByParent(state.selectedCategories);
        const mainCategoryId = sort.at(0)!.id;
        const lastCategoryId = sort.at(-1)!.id;
        //TODO: subir las imagenes a la nube y obtener los urls 
        //....
        const res = await addProduct(
            {
                supplierId: state.supplierId,
                mainCategoryId,
                lastCategoryId,
                name: state.name,
                longDescription: state.longDescription,
                shortDescription: state.shortDescription,
                slug: createSlug(state.name),
            },
            state.images.map(v => ({
                isPrimary: v.isPrimary,
                displayOrder: v.displayOrder,
                mediaFile: {
                    fileName: v.mediaFile!.fileName,
                    filePath: v.mediaFile!.filePath,
                    fileSize: v.mediaFile!.fileSize,
                    mimeType: v.mediaFile!.mimeType
                }
            })),
            state.selectedCategories.map(v => v.id),
            { createdBy: user.name, createdById: user.id }
        )

        if (res.ok) {
            const data = res.data!
            const { title, description } = MessageSuccess.create("Producto", data.name);
            ToastSuccess({
                title,
                description
            });

            form.reset()
        } else {
            const { title, description } = MessageError.create("Producto");
            ToastError({
                title, description
            })
        }

    };

    return (
        <ProductFormProvider form={form} onSubmit={onSubmit} >
            <ProductForm
                suppliers={suppliers}
                mainCategories={mainCategories}
            />
        </ProductFormProvider>
    )
}

const initForm = {
    selectedCategories: [],
    images: []
}