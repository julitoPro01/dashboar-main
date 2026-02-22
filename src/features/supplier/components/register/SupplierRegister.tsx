"use client"

import { useForm } from "react-hook-form"
import { addSupplier } from "@/src/action"
import { zodResolver } from "@hookform/resolvers/zod"
import { APP_ROUTES } from "@/src/domains/routes"
import { BtnSubmitLoading, ToastError, ToastSuccess } from "@/src/components/ui"
import { SupplierForm } from "../shared/SupplierForm"
import { errorMessages, successMessage } from "@/src/constants"
import { UpsertSupplierForm } from "../../shared/upsertSupplierForm.type"
import { UpsertSupplierFormSchema } from "../../shared/upsertSupplierForm.schema"


interface Props {
  user: { name: string, id: number }
}

export const SupplierRegister = ({ user }: Props) => {

  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<UpsertSupplierForm>({ resolver: zodResolver(UpsertSupplierFormSchema), defaultValues: { capabilities: [] } })
  const onSubmit = async (state: UpsertSupplierForm) => {
    const res = await addSupplier(
      {
        name: state.name,
        address: state.address,
        description: state.description,
        logoUrl: state.logoUrl,
        relationMode: state.relationMode,
        capabilities: state.capabilities,
        createdBy: user.name,
        createdById: user.id
      }
    );
    if (res.ok) {
      toastSuccess(res.data!.name, res.data!.id);
      reset()
    } else {
      toastError()
    }
  }

  return (
    <>

      {/* Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} id="create-supplier">
        <SupplierForm register={register} errors={errors}/>
      </form>

      {/* Sticky Footer Actions */}
      <div className="px-8 py-5 bg-background border-t border-border-subtle flex justify-end gap-3">
       
        <BtnSubmitLoading
          loading={isSubmitting}
          title="Agregar negocio"
          loadingTitle="Agregando..."
          variant="primary"
          type="submit"
          form="create-supplier"
        />
      </div>
    </>
  )
}

const s = successMessage.create("Proveedor");
const toastSuccess = (name: string, id: number) => ToastSuccess({
  title: s.title,
  description: s.desc,

  link: {
    title: "Ver detalles",
    href: APP_ROUTES.SUPPLIERS.VIEW(id)
  }
}, { duration: 5000 });

const e = errorMessages.generic;
const toastError = () => ToastError({
  title: e.title,
  description: e.description,
  activeBtnClose: true
}, { duration: 5000 })


