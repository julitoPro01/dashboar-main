"use client"

import { useForm } from "react-hook-form"
import { addSupplier } from "@/src/action"
import { zodResolver } from "@hookform/resolvers/zod"
import { SupplierForm } from "../shared/SupplierForm"
import { UpsertSupplierFormSchema } from "../../shared/upsertSupplierForm.schema"
import { UpsertSupplierForm } from "../../types/upsertSupplierForm.type"
import { errorMessages, successMessage } from "@/src/shared/messages"
import { ToastError, ToastSuccess } from "@/src/shared/components/toaster"
import { Button } from "@/src/shared/components/btn"


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
        <SupplierForm register={register} errors={errors} />
      </form>

      {/* Sticky Footer Actions */}
      <div className=" pt-5 bg-background border-t border-border-strong dark:border-border flex justify-end gap-3">
        <Button
          loading={isSubmitting}
          variant="secondary"
          type="submit"
          formId="create-supplier"
        > { isSubmitting ? "Agregando...":"Agregar negocio" } </Button>
      </div>
      
    </>
  )
}

const s = successMessage.create("Proveedor");
const toastSuccess = (name: string, id: number) => ToastSuccess({
  title: s.title,
  description: s.description,
}, { duration: 5000 });

const e = errorMessages.generic;
const toastError = () => ToastError({
  title: e.title,
  description: e.description,
  activeBtnClose: true
}, { duration: 5000 })


