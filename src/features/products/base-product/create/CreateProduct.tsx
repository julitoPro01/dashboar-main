"use client";


import { FormProvider } from "@/src/shared/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { VERIFICATION_STATUS_ID } from "@/src/shared/domains/verificationStatus";
import { FormActions } from "./FormActions";
import { useStore } from "@/src/store/useStore";
import { ProductFormData, productFormSchema } from "../../types";
import { useCreateProduct } from "../../shared/hooks";
import { INVENTORY_STATUS, SALE_STATUS } from "../../shared/catalog";
import { mapSystemAttributesToDb } from "../../shared/helpers";
import { BasicInformation, Categorization, Gallery, LongDescription, RecordStatusInfo, SupplierSelection } from "../../shared/components/product-form";

export const CreateProduct = () => {

  const refreshCustomOriginal = useStore(v => v.productRefreshOriginalLongDescriptionCreate);

  const initLong = useStore.getState().productOriginalLongDescription.originalCreate;

  const user = useBootDataStore(v => v.user);
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      categorization: {
        systemAttributes: [],
      },
      images: [],
      longDescription: {
        description: initLong.description,
        customProperties: initLong.customProperties
      }
    }
  })

  const { mutateAsync } = useCreateProduct();

  const handleSubmit = async (val: ProductFormData) => {

    if (!user) return;

    // ATRIBUTOS PERSONALIZADOS
    const json = val.longDescription ? JSON.stringify(val.longDescription) : undefined;
    const longDescription = json ? JSON.parse(json) : undefined

    await mutateAsync({
      name: val.basicInfo.name,
      slug: val.basicInfo.slug,
      shortDescription: val.basicInfo.shortDescription,
      longDescription,

      categoryId: val.categorization.category.id,
      supplierId: val.supplier.id,

      recordStatusId: RECORD_STATUS_ID.DRAFT,
      verificationStatusId: VERIFICATION_STATUS_ID.DRAFT,
      inventoryStatus: INVENTORY_STATUS.OUT_OF_STOCK,
      saleStatus: SALE_STATUS.COMING_SOON,

      images: val.images,

      systemAttributes: mapSystemAttributesToDb(val.categorization.systemAttributes),

      createdBy: user.name,
      createdById: user.id

    },
      {
        onSuccess(val) {
          if (val.ok) {
            // Restablecemos el formulario
            form.reset();
            // refrescamos la data original a otra version
            refreshCustomOriginal()
          }
        }
      }
    )

  }

  return (
    <FormProvider form={form} onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <div className="col-span-3 space-y-6 lg:col-span-2">
          <BasicInformation />
          <Gallery />
          <Categorization />
          <LongDescription />
        </div>

        <div className="col-span-3 space-y-6 lg:col-span-1 lg:sticky lg:top-6">
          <SupplierSelection />
          <br />
          <RecordStatusInfo />
        </div>
      </div>
      <FormActions />
    </FormProvider>

  )
}
