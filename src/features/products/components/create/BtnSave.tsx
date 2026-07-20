import { useFormContext } from "react-hook-form"
import { MdOutlineInventory2 } from "react-icons/md";

export const BtnSave = () => {

    const { formState: { isSubmitting } } = useFormContext();

    return (
        <div className=' mt-6 w-full bg-surface-elevated flex justify-between items-center border border-border p-6 shadow'>
            <div className="flex items-center gap-4">
                <span className="text-4xl text-primary"><MdOutlineInventory2 /></span>
                <div className="flex flex-col">
                    <span className="font-bold text-text">Agregar producto</span>
                    <span className="text-text-muted text-xs uppercase">Gestión de catálogos</span>
                </div>
            </div>

            {/* <BtnSubmitLoading
                title="Agregar"
                loadingTitle="Agregando..."
                loading={isSubmitting}
                form='create-product'
                type="submit"
            /> */}
        </div>
        )
}
