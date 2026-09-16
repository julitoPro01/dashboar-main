"use client";


import { BasicInformationForm, basicInformationSchema, CategorizationForm, categorizationSchema, CustomAttributeForm, customAttributesSchema, GalleryForm, gallerySchema, ProductFormDataResponse, SupplierForm, supplierSchema } from "../types"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useBootDataStore } from "@/src/store/useBootDataStore";
import { FormProvider } from "@/src/shared/form";
import { BasicInformation, Categorization, CustomAttributes, Gallery, RecordStatusInfo, SupplierSelection } from "../shared/components/product-form";
import { useUpdateBasicInfo, useUpdateCategorization, useUpdateCustomAttrs, useUpdateGallery } from "../shared/hooks";
import { getDirtyValues } from "@/src/shared/utils";
import { ATTRIBUTE_INPUT_CONFIG } from "../constants";
import { getHasValues } from "@/src/shared/utils/getHasValues";
import { useStore } from "@/src/store/useStore";
import { useState } from "react";

interface Props {
    data: ProductFormDataResponse
}

export const EditProduct = ({ data }: Props) => {

    const id = data.id;

    return (

        <>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                <div className="col-span-3 space-y-6 lg:col-span-2">

                    <Basic basicInfo={data.basicInfo} id={id} />

                    <Gal images={data.images} id={id} />

                    <Cat categorization={data.categorization} id={id} />

                    <Custom id={id} />
                </div>

                <div className="col-span-3 space-y-8 lg:col-span-1 lg:sticky lg:top-6">
                    <Supplier supplier={data.supplier} id={id} />
                    <br />
                    <RecordStatusInfo />
                </div>
            </div>

        </>

    )
}


const Supplier = ({ supplier, id }: SupplierForm & { id: number }) => {

    const user = useBootDataStore(v => v.user);

    const form = useForm({
        resolver: zodResolver(supplierSchema),
        defaultValues: { supplier }
    })

    const { mutateAsync } = useUpdateBasicInfo();

    const handleSubmit = async ({ supplier: val }: SupplierForm) => {
        if (!user) return;

        const dirtiy = getDirtyValues(supplier, val)

        if (Object.keys(dirtiy).length < 1) return;

        await mutateAsync({
            id,
            updatedBy: user.name,
            updatedById: user.id,
            data: { supplierId: dirtiy.id }
        }, {
            onSuccess(res) {
                if (res.ok)
                    form.reset(form.getValues());
            }
        })
    }

    return (
        <FormProvider form={form} onSubmit={handleSubmit}>
            <SupplierSelection isEdit entity="product" id={id} />
        </FormProvider>)
}

const Basic = ({ basicInfo, id }: BasicInformationForm & { id: number }) => {

    const user = useBootDataStore(v => v.user);

    const form = useForm({
        resolver: zodResolver(basicInformationSchema),
        defaultValues: {
            basicInfo: {
                name: basicInfo.name,
                slug: basicInfo.slug,
                shortDescription: basicInfo.shortDescription,
                longDescription: basicInfo.longDescription
            }
        }
    });

    const { mutateAsync } = useUpdateBasicInfo();

    const handleSubmit = async ({ basicInfo: val }: BasicInformationForm) => {

        if (!user) return;


        const dirties = getDirtyValues(basicInfo, val)

        if (Object.keys(dirties).length < 1) return;

        await mutateAsync({
            id,
            updatedBy: user.name,
            updatedById: user.id,
            data: dirties
        }, {
            onSuccess(res) {
                if (res.ok)
                    form.reset(form.getValues());
            }
        })
    }
    return (
        <FormProvider form={form} onSubmit={handleSubmit}>
            <BasicInformation isEdit />
        </FormProvider>
    )
}

const Gal = ({ id, images }: GalleryForm & { id: number }) => {

    const user = useBootDataStore(v => v.user);

    const form = useForm({
        resolver: zodResolver(gallerySchema),
        defaultValues: { images: images }
    });

    const { mutateAsync } = useUpdateGallery();

    const handleSubmit = async (val: GalleryForm) => {

        if (!user) return;

        const images = val.images.map(({ mediaFile, isPrimary }, i) => ({
            mediaFile: {
                fileName: mediaFile.fileName,
                filePath: mediaFile.filePath,
                mimeType: mediaFile.mimeType,
                fileSize: mediaFile.fileSize,
            },
            isPrimary, displayOrder: i + 1
        }));

        await mutateAsync({
            productId: id,
            images
        }, {
            onSuccess(res) {
                if (res.ok)
                    form.reset(form.getValues())
            }
        })
    }
    return (

        <FormProvider form={form} onSubmit={handleSubmit}>
            <Gallery isEdit />
        </FormProvider>

    )
}

const Cat = ({ categorization, id }: CategorizationForm & { id: number }) => {

    const user = useBootDataStore(v => v.user);

    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm({
        resolver: zodResolver(categorizationSchema),
        defaultValues: {
            categorization: {
                category: categorization.category,
                systemAttributes: []
            }
        }
    })

    const { mutateAsync } = useUpdateCategorization();

    const handleSubmit = async ({ categorization: val }: CategorizationForm) => {
        if (!user) return;


        const dirties = getDirtyValues(categorization, { category: val.category })

        const attributes = val.systemAttributes
            ?.flatMap(v => v.attributes)
            .map(curr => {
                const { field } = ATTRIBUTE_INPUT_CONFIG[curr.dataType];

                const value: Record<string, any> = {
                    valueText: undefined,
                    valueNumber: undefined,
                    valueBoolean: undefined,
                    valueDate: undefined,
                    valueOptionIds: undefined,
                };

                switch (field) {
                    case "valueText":
                        value.valueText = curr.valueText?.trim() || undefined;
                        break;

                    case "valueNumber":
                        value.valueNumber = curr.valueNumber ?? undefined;
                        break;

                    case "valueBoolean":
                        value.valueBoolean = curr.valueBoolean ?? undefined;
                        break;

                    case "valueDate":
                        value.valueDate = curr.valueDate?.trim() || undefined;
                        break;

                    case "valueOptionIds":
                        value.valueOptionIds = curr.valueOptionIds?.length
                            ? curr.valueOptionIds
                            : undefined;
                        break;
                }
                const data = {
                    attributeDefinitionId: Object.values(getHasValues(value)).length ? curr.attributeDefinitionId : undefined,
                    ...value,
                };
                if (data.attributeDefinitionId)
                    return data;
                else return undefined;
            }).filter(Boolean) as [];

        await mutateAsync({
            productId: id,
            data: {
                categoryId: dirties.category?.id,
                attributes
            }
        }, {
            onSuccess(res) {
                if (res.ok) {
                    form.reset(form.getValues());
                    setIsSuccess(true)
                }
            }
        })
    }

    return (
        <FormProvider form={form} onSubmit={handleSubmit}>
            <Categorization isEdit id={id} isEditSuccess={isSuccess} />
        </FormProvider>
    )
}

const Custom = (data: { id: number }) => {

    const form = useForm({
        resolver: zodResolver(customAttributesSchema),
    })

    const { mutateAsync } = useUpdateCustomAttrs();
    const handleSubmit = async (val: CustomAttributeForm) => {
        await mutateAsync({
            productId: data.id,
            attributes: val.customAttributes ?? []
        }, {
            onSuccess(res) {
                if (res.ok)
                    form.reset(form.getValues())
            }
        })
    }

    return (

        <FormProvider form={form} onSubmit={handleSubmit}>
            <CustomAttributes isEdit id={data.id} entity="product" />
        </FormProvider>


    )
}
