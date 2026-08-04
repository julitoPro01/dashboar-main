import { Button } from "@/src/shared/components/btn"
import { toast } from "sonner";
import { useCategoryAttrActions } from "../../hook/useCategoryAttrs";

export const DeleteSelected = ({ selectedIds,updateIds, resetSelection }: { selectedIds: number[],updateIds:number[], resetSelection: () => void }) => {

    const action = useCategoryAttrActions();

    const handleDelete = () => {
        const succes = () => {
            resetSelection();
            toast.dismiss()
        }
        action.deleteRows({ids:selectedIds,updateIds}, succes);
    }

    const handleClose = () => { toast.dismiss(); }

    return (
        <>
            <div className={`h-px w-full bg-linear-to-r from-red-500/50 to-transparent min-w-80`}></div>

            <div className="space-y-4 mt-4">
                <div className="rounded-lg bg-neutral-900/30 px-3">

                    <div>
                        <p className="font-thin"> Esta acción no se puede deshacer.</p>
                        {action.isError &&
                            <p className="text-red-500 text-sm"> Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde. </p>
                        }
                    </div>

                </div>
                <div className="flex justify-between gap-3 pt-2">
                    <Button
                        loading={action.loading}
                        onClick={handleDelete}
                        disabled={action.loading}
                        className="flex-1"
                        variant="danger"
                    >
                        {action.loading ? "Eliminando..." : "Eliminar"}
                    </Button>

                    <button
                        onClick={handleClose}
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


