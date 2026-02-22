import { BtnSubmitLoading } from "@/src/components/ui";
import { UpsertProductForm } from "@/src/features/product/type/upsertProductForm.type";
import { useFormContext } from "react-hook-form";


export const BtnActions = () => {

    const { formState: { isDirty, isSubmitting, defaultValues }, reset } = useFormContext<UpsertProductForm>();

    // Verificamos si tiene datos inicializados
    const hasValues = !!defaultValues && Object.values(defaultValues).length > 3;

    return (
        <div className={` flex justify-between bg-white border-t-4 rounded-xl shadow-lg px-6 mt-10 py-4`}>


          <button

                type="button"
                className="hover:text-black text-gray-700 underline-offset-2 hover:underline"
                onClick={() => reset()}
            >
                Deshacer cambios</button>

            <BtnSubmitLoading
                disabled={!isDirty}
                loading={isSubmitting}
                title={hasValues ? "Guardar cambios" : "Agregar al catálogo"}
                loadingTitle={hasValues ? "Guardando..." : "Agregando..."}
                variant={  "primary"}
                className="w-60"
                type="submit"
            />
        </div>)
}

