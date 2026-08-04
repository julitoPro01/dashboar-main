import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField"
import clsx from "clsx"
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdExpandMore } from "react-icons/md"
import { ProductFormData } from "../../types/productForm";
import { DynamicModal } from "@/src/shared/components/modal";
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters";
import { SupplierSelector } from "@/src/features/suppliers/shared/components";
import { SupplierRelationModeDb } from "@/src/features/suppliers/types";
import { SUPPLIER_RELATION_MODE_LABEL } from "@/src/features/suppliers/constants";

export const SupplierSelection = () => {

    const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, watch } = useFormContext<ProductFormData>();
    const selected = watch("supplier");


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleConfirm = (par: { id: number, name: string, relationMode: SupplierRelationModeDb }) => {
        // asignamos
        setValue("supplier", {
            id: par.id, name: par.name, relationMode: par.relationMode
        });

        setIsModalOpen(false)
    }

    return (
        <>
            <div>
                <div>
                    <span className={INPUT_FIELD_STYLE.label + " " + INPUT_FIELD_STYLE.isRequired}>Proveedor</span>

                    <button className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states.normal,
                        "text-start relative")}
                        type="button"
                        onClick={handleOpenModal}
                    >
                        <span className="text-text-muted">{selected?.name ?? "Seleccionar"}</span>
                        <div className=" absolute right-0 pr-1 top-0 flex items-center h-full">
                            <MdExpandMore size={20} />
                        </div>
                    </button>
                </div>
                {
                    selected?.relationMode &&
                    <div className='flex flex-wrap text-sm mt-2 bg-bg-soft-blue py-1 px-4 rounded-sm'>
                        <span className="flex items-center text-primary font-medium after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                            {SUPPLIER_RELATION_MODE_LABEL[selected.relationMode]}
                        </span>
                    </div>
                }
            </div>

            <DynamicModal open={isModalOpen} onClose={handleCloseModal} inactiveScroll
                fixedHeight
                Search={<SearchInput
                    value={value}
                    placeholder="Buscar proveedor..."
                    onChange={handleSearch}
                    onClear={handleClean}
                />}
            >
                <SupplierSelector onConfirm={handleConfirm} id={selected?.id} filters={{search:valueApplied}}  />
            </DynamicModal>
        </>
    )
}
