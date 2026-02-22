import { useFormContext } from "react-hook-form";
import { UpsertVariantForm } from "../../../type/upsertVariantForm.type";
import { BtnAsyncActionModal } from "@/src/components/modal";

export const BtnAction = () => {

    const { formState: { isDirty, isSubmitting, defaultValues }, reset } = useFormContext<UpsertVariantForm>();

    // Verificamos si tiene datos inicializados
    const hasValues = !!defaultValues && Object.values(defaultValues).length > 3;

    return (
        <div className={`flex justify-between`}>

            {hasValues ?
                <button
                    disabled={!isDirty}
                    type="button"
                    className="hover:text-black text-gray-500 underline-offset-2 hover:underline disabled:text-gray-400"
                    onClick={() => reset()}
                >
                    Deshacer cambios</button>
                : <span></span>
            }


            <BtnAsyncActionModal
                onCancel={() => { }}
                btnSave={{
                    disabled: isSubmitting,
                    title: hasValues ? "Guardar cambioas" : "Agregar variante",
                    loadingTitle: hasValues ? "Guardando..." : "Agregando...",
                    type: "submit"
                }}
            />
        </div>)
}
