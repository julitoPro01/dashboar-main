"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BtnSubmitLoading, ToastError, ToastSuccess } from "@/src/components/ui";
import { APP_ROUTES } from "@/src/domains/routes";
import { errorMessages, successMessage } from "@/src/constants";
import { SupplierForm } from "../shared/SupplierForm";
import { UpsertSupplierForm } from "../../shared/upsertSupplierForm.type";
import { UpsertSupplierFormSchema } from "../../shared/upsertSupplierForm.schema";
import { SupplierFormDataResponse } from "@/src/interfaces/supplier";
import { getDirtyValues } from "@/src/utils";
import { updateSupplier } from "@/src/action";

interface Props {
    user: { name: string, id: number };
    supplier: SupplierFormDataResponse;
}

export const SupplierEdit = ({ user, supplier }: Props) => {

    const { handleSubmit, register, formState: { errors, isSubmitting, dirtyFields, isDirty }, reset } = useForm<UpsertSupplierForm>({
        resolver: zodResolver(UpsertSupplierFormSchema),
        defaultValues: {
            name: supplier.name,
            address: supplier.address,
            description: supplier.description,
            relationMode: supplier.relationMode,
            capabilities: supplier.capabilities,
            logoUrl: supplier.logoUrl
        }
    })

    const onSubmit = async (state: UpsertSupplierForm) => {
        const newDate = getDirtyValues(supplier, state);
        const res = await updateSupplier({
            id: supplier.id,
            ...newDate,
            updatedBy: user.name,
            updatedById: user.id
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
            <div className="px-8 py-5 bg-background border-t border-border-subtle flex justify-end gap-3">
                <button
                    onClick={() => reset()}
                    className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                    Deshacer cambios
                </button>
                <BtnSubmitLoading
                    disabled={!isDirty}
                    loading={isSubmitting}
                    title="Guardar cambios"
                    loadingTitle="Guardando..."
                    variant="primary"
                    type="submit"
                    form="edit-supplier"
                />
            </div>
        </>
    )
}


const s = successMessage.updated("proveedor");
const e = errorMessages.generic;

const toastSuccess = () => ToastSuccess({
    title: s.title,
    description: s.desc,
}, { duration: 5000 });

const toastError = () => ToastError({
    title: e.title,
    description: e.description,
    activeBtnClose: true
}, { duration: 5000 })