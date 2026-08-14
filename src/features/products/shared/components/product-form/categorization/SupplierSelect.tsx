import clsx from "clsx"
import { useState } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { MdExpandMore } from "react-icons/md"
import { DynamicModal } from "@/src/shared/components/modal";
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters";
import { SupplierSelector } from "@/src/features/suppliers/shared/components";
import { SupplierRelationModeDb } from "@/src/features/suppliers/types";
import { SUPPLIER_RELATION_MODE_LABEL } from "@/src/features/suppliers/constants";
import { ProductFormData } from "@/src/features/products/types";
import { FIELD_STYLE } from "@/src/shared/form";

export const SupplierSelection = () => {

    const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, control } = useFormContext<ProductFormData>();

    const { errors } = useFormState({ control, name: "supplier.id" });

    const selected = useWatch({ control, name: "supplier" });


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
        },{shouldValidate:true,shouldDirty:true});

        setIsModalOpen(false)
    }

    return (
        <>
            <div>
                <div className="space-y-2">
                    <span className={FIELD_STYLE.label + " " + FIELD_STYLE.validation["*"]}>Proveedor</span>

                    <button className={clsx(
                        FIELD_STYLE.base,
                        FIELD_STYLE.size["md"],
                        FIELD_STYLE.borderSize[1],
                        FIELD_STYLE.roundedSize.lg,
                        errors.supplier ? FIELD_STYLE.status.error: FIELD_STYLE.status.normal,
                        "text-start relative")}
                        type="button"
                        onClick={handleOpenModal}
                    >
                        <span className="text-text-muted text-sm">{selected?.name ?? "Seleccionar"}</span>
                        <div className=" absolute right-0 pr-1 top-0 flex items-center h-full">
                            <MdExpandMore size={20} />
                        </div>
                    </button>
                </div>
                {
                    selected?.relationMode &&
                    <div className='flex flex-wrap text-sm mt-2 bg-bg-soft-blue py-1 px-4 '>
                        <span className="flex items-center text-primary font-medium after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                            {SUPPLIER_RELATION_MODE_LABEL[selected.relationMode]}
                        </span>
                    </div>
                }

                {errors.supplier &&
                    <span className={FIELD_STYLE.validation.errorMsg}>{errors.supplier.message}</span>
                }
            </div>

            <DynamicModal open={isModalOpen} onClose={handleCloseModal} inactiveScroll
                size="4xl"
                fixedHeight
                Search={<SearchInput
                    value={value}
                    placeholder="Buscar proveedor... (min.3)"
                    onChange={handleSearch}
                    onClear={handleClean}
                />}
            >
                <SupplierSelector onConfirm={handleConfirm} id={selected?.id} filters={{ search: valueApplied }} />
            </DynamicModal>
        </>
    )
}
