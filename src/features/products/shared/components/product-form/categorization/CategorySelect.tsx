
import { DynamicModal } from "@/src/shared/components/modal"
import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField"
import clsx from "clsx"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { MdExpandMore } from "react-icons/md"
import { ProductFormData } from "../../types/productForm"
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters"

export const CategorySelection = () => {

    const { value, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, watch } = useFormContext<ProductFormData>();
    const selected = watch("category");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleConfirm = (selectedId: number, _: boolean, paths: CategoryTreePath[], name: string) => {
        // asignamos
        setValue("category", {
            id: selectedId,
            name, paths
        });
        //cerramos
        setIsModalOpen(false)
    }


    return (
        <>
            <div>
                <div>
                    <span className={INPUT_FIELD_STYLE.label + " " + INPUT_FIELD_STYLE.isRequired}>Categoría</span>

                    <button className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states.normal,
                        "text-start relative cursor-pointer")}
                        type="button"
                        onClick={handleOpenModal}
                    >
                        <span className="text-text-muted"> {selected?.name ?? "Seleccionar"} </span>

                        <div className=" absolute right-0 pr-1 top-0 flex items-center h-full text-text-muted">
                            <MdExpandMore size={20} />
                        </div>
                    </button>
                </div>

                {/* CATEGORIAS SELECCIONADOS */}
                {selected?.paths
                    ? <div className='flex flex-wrap text-sm mt-2 bg-bg-soft-blue py-1 px-4 rounded-sm'>
                        {selected?.paths.map(({ name, id }) => (
                            <span key={id} className="flex items-center text-primary font-medium after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                                {name}
                            </span>))}
                    </div>
                    : ""}


            </div>

            <DynamicModal open={isModalOpen} onClose={handleCloseModal} fixedHeight
                Search={<SearchInput
                    value={value}
                    placeholder="Buscar categoría..."
                    onChange={handleSearch}
                    onClear={handleClean}
                />}
            >
                {null}
                {/* <CategoryTreeSelector
                    categoryId={selected?.id}
                    paths={selected?.paths}
                    name={selected?.name}
                    onConfirm={handleConfirm}

                /> */}

            </DynamicModal>
        </>
    )
}
