"use client";

import { ProductFormData, productFormSchema, } from "../types";
import { useCreateProduct } from "../shared/hooks";

import { BasicInformation, CustomAttributes, Gallery, SupplierSelection, Categorization, RecordStatusInfo } from "../shared/components/product-form";
import { FormProvider } from "@/src/shared/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { getHasValues } from "@/src/shared/utils/getHasValues";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { VERIFICATION_STATUS_ID } from "@/src/shared/domains/verificationStatus";
import { INVENTORY_STATUS_ID, SALES_STATUS_ID } from "@/src/shared/domains/catalog";
import { ATTRIBUTE_INPUT_CONFIG } from "../constants";
import { FormActions } from "./FormActions";


export const CreateProduct = () => {

  const user = useBootDataStore(v => v.user);
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      customAttributes: [],
      categorization: {
        systemAttributes: [],
      },
      images: []
    }
  })

  const { mutateAsync } = useCreateProduct();

  const handleSubmit = async (val: ProductFormData) => {

    if (!user) return;

    // ATRIBUTOS DEL SISTEMA
    const system = val.categorization.systemAttributes
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
    // ATRIBUTOS PERSONALIZADOS
    const custom = val.customAttributes?.map(v => getHasValues(v)).filter(v => Object.keys(v).length > 0);

    await mutateAsync({
      name: val.basicInfo.name,
      slug: val.basicInfo.slug,
      shortDescription: val.basicInfo.shortDescription,
      longDescription: val.basicInfo.longDescription,

      categoryId: val.categorization.category.id,
      supplierId: val.supplier.id,

      recordStatusId: RECORD_STATUS_ID.DRAFT,
      verificationStatusId: VERIFICATION_STATUS_ID.DRAFT,
      inventoryStatusId: INVENTORY_STATUS_ID.OUT_OF_STOCK,
      saleStatusId: SALES_STATUS_ID.COMING_SOON,

      images: val.images.map(({ mediaFile, isPrimary }, i) => ({
        mediaFile: {
          fileName: mediaFile.fileName,
          filePath: mediaFile.filePath,
          mimeType: mediaFile.mimeType,
          fileSize: mediaFile.fileSize,
        },
        isPrimary, displayOrder: i + 1
      })),

      systemAttributes: system,
      customAttributes: custom,

      createdBy: user.name,
      createdById: user.id

    },
      {
        onSuccess(val) {
          if (val.ok)
            form.reset();
        }
      }
    )

  }

  return (
    <FormProvider form={form} onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="col-span-3 space-y-6 lg:col-span-2">
          <BasicInformation />
          <Gallery />
          <Categorization />
          <CustomAttributes />
        </div>

        <div className="col-span-3 space-y-6 lg:col-span-1 lg:sticky lg:top-6">
          <SupplierSelection />
          <br />
          {/* <CatalogVisibilitySettings /> */}
          <RecordStatusInfo/>
        </div>
      </div>
      <FormActions />
    </FormProvider>

  )
}
