import { Button } from "@/src/shared/components/btn"
import { useStore } from "@/src/store/useStore"
import { FaRegFolder } from "react-icons/fa";

export const CategorySelectorBar = () => {

    const setOpenModal = useStore(v => v.setCategorySelectModal);
    const selectedCatgRelation = useStore(v => v.aategorySelectModal.paths);

    const infoMsg = () => {

        return selectedCatgRelation
            ? <><FaRegFolder size={18} className="mx-2" />
                {selectedCatgRelation.map(({ name, id }, i) => (
                    <span key={id} className="flex items-center after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                        {name}
                    </span>))}
            </>
            : <p className="text-text-muted font-medium text-sm leading-tight text-wrap">
                Selecciona una categoría para gestionar sus atributos asignados
            </p>
    }


    return (
        <div className="bg-surface rounded-xl border border-border flex flex-col xl:flex-row  justify-between p-4 md:px-6 gap-2">

            <div className="flex flex-wrap items-center gap-2 flex-1 justify-evenly">

                <div className="flex items-center py-2">
                    <div className="flex flex-wrap items-center text-sm text-amber-500" >
                        {infoMsg()}
                    </div>
                </div>

                <Button variant="outline" onClick={() => setOpenModal({ isOpen: true })} >
                    {selectedCatgRelation
                        ? "Cambiar categoría"
                        : "Seleccionar categoría"
                    }
                </Button>

            </div>

        </div>
    )
}
