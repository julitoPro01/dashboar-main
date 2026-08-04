"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateSupplier } from "@/src/action";
import { getDirtyValues } from "@/src/shared/utils";
import { errorMessages, successMessage } from "@/src/shared/messages";
import { ToastError, ToastSuccess } from "@/src/shared/components/toaster";
import { Button } from "@/src/shared/components/btn";
import { SupplierForm as SupplierFormType, SupplierFormDataResponse, supplierFormSchema } from "../types";
import { SupplierForm } from "../shared/components";

interface Props {
    user: { name: string, id: number };
    supplier: SupplierFormDataResponse;
}

export const SupplierEdit = ({ user, supplier }: Props) => {

    const { handleSubmit, register, formState: { errors, isSubmitting, dirtyFields, isDirty }, reset } = useForm<SupplierFormType>({
        resolver: zodResolver(supplierFormSchema),
        defaultValues: {
            name: supplier.name,
            address: supplier.address,
            description: supplier.description,
            relationMode: supplier.relationMode,
            capabilities: supplier.capabilities,
            logoUrl: supplier.logoUrl
        }
    })

    const onSubmit = async (state:SupplierFormType) => {
        const newDate = getDirtyValues(supplier, state);

        const res = await updateSupplier({
            id: supplier.id,
            ...newDate,
            updatedBy: user.name,
            updatedById: user.id,
            logoUrl:undefined
        })

        if (res.ok) {
          toastSuccess();
          reset(state)
        } else {
          toastError()
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="edit-supplier">
                <SupplierForm register={register} errors={errors} dirty={dirtyFields} />
            </form>

            {/* Sticky Footer Actions */}
            <div className="px-8 py-5 bg-background border-t border-border-subtle flex justify-between gap-3">
                <button
                    onClick={() => reset()}
                    className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                    Deshacer cambios
                </button>
                <Button
                    disabled={!isDirty}
                    loading={isSubmitting}
                    variant="primary"
                    type="submit"
                    formId="edit-supplier"
                >{isSubmitting ? "Guardando...":"Guardar cambios"}</Button>
            </div>
        </>
    )
}


const s = successMessage.updated("proveedor");
const e = errorMessages.generic;

const toastSuccess = () => ToastSuccess({
    title: s.title,
    description: s.description,
}, { duration: 5000 });

const toastError = () => ToastError({
    title: e.title,
    description: e.description,
    activeBtnClose: true
}, { duration: 5000 })