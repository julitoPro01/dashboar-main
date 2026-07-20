import { categoryHasReferences, deleteCategory } from "@/src/action/category";
import { getToastStyle } from "@/src/shared/components/toaster";
import { sleep } from "@/src/shared/utils";
import { useStore } from "@/src/store/useStore";
import { useState } from "react";
import { toast } from "sonner"
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "@/src/shared/components/btn";

interface Props {
    id: number;
    parentId?: number;
    deleteSubCategoryCache: () => void
}

export const Delete = ({ id, parentId, deleteSubCategoryCache }: Props) => {

    const setMainChanges = useStore(v => v.setMainCategoryChanges);
    const setFloatingPanel = useStore(v => v.setFloatingPanel);


    const [response, setResponse] = useState<{ msg: string; hasReferences: boolean; loading?: boolean }>({ msg: "", hasReferences: false, loading: false });

    const onClose = () => { toast.dismiss(); }

    const onDelete = async () => {
        setResponse(prev => ({ ...prev, loading: true }));

        const res = await categoryHasReferences({ id });
        await sleep(1000); // Simula un retraso para mostrar el estado de carga

        if (res.ok) {
            if (res.data!.hasReferences) {
                setResponse({
                    msg: res.msg,
                    hasReferences: true,
                    loading: false
                });
            } else {
                // Proceed with deletion
                const res = await deleteCategory({ id, parentId });
                toast.dismiss();
                if (res.ok) {
                    //Es categoría raíz.
                    if (res.data?.isRootCategory) setMainChanges({ type: "delete", id });
                    // Es subcategoría.
                    else
                        if (res.data?.parentIsRootCategory) { //Su padre es categoría raíz.}
                            deleteSubCategoryCache()
                            if (!res.data.hasSibling)
                                setMainChanges({
                                    type: "update",
                                    values: {
                                        id: parentId!,
                                        hasChildren: false,
                                    }
                                });
                        }
                        else if (res.data?.hasSibling) { //Es subcategoría y tiene hermanos.
                            deleteSubCategoryCache()

                        } else { //Es subcategoría y no tiene hermanos, por lo que el sub padre deja de tener hijos.
                            deleteSubCategoryCache()
                        }

                    setFloatingPanel({ open: false });
                    toast.success("Categoría eliminada correctamente.", { style: getToastStyle("success") });
                } else {
                    toast.error("Error al eliminar la categoría.", { style: getToastStyle("error") });
                }
            }
        }
    }

    return (
        <>
            {
                response.hasReferences
                    ? <div className={`h-px w-full bg-linear-to-r from-red-500/50 to-transparent`}></div>
                    : <div className={`h-px w-full bg-linear-to-r from-green-500/50 to-transparent`}></div>
            }

            <div className="space-y-4 mt-4">
                <div className="rounded-lg bg-neutral-900/30 p-3">

                    <div>
                        <p> ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.</p>
                        {
                            response.hasReferences
                                ? <p className="mt-2 text-sm text-red-400">{response.msg}</p>
                                : <>
                                    <div className="mt-2 text-sm text-neutral-400 flex items-center gap-2">
                                        <BiInfoCircle className="text-3xl" />
                                        <span>No se puede eliminar una categoría que contiene productos o referencias asociadas.</span>
                                    </div>
                                </>
                        }
                    </div>

                </div>
                <div className="flex justify-between gap-3 pt-2">
                    <Button
                        loading={response.loading}
                        onClick={onDelete}
                        disabled={response.hasReferences}
                        className="flex-1"
                    >
                        {response.loading ? "Eliminando..." : "Eliminar"}
                    </Button>

                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-neutral-600 bg-neutral-800/50 
                    px-4 py-2.5 text-sm font-medium text-neutral-300 
                    hover:bg-neutral-700 hover:text-neutral-100 hover:border-neutral-500 
                    active:scale-[0.98] transition-all duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )
}
