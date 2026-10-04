import clsx from "clsx"
import { useEffect, useState } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { MdExpandMore, MdOutlineStore, MdRestartAlt } from "react-icons/md"
import { DynamicModal } from "@/src/shared/components/modal";
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters";
import { SupplierSelector } from "@/src/features/suppliers/shared/components";
import { SupplierCapabilityDb, SupplierRelationModeDb } from "@/src/features/suppliers/types";
import { SUPPLIER_CAPABILITIES_LABELS, SUPPLIER_RELATION_MODE_LABEL } from "@/src/features/suppliers/constants";
import { SupplierForm } from "@/src/features/products/types";
import { FIELD_STYLE } from "@/src/shared/form";
import { LuBuilding2 } from "react-icons/lu";
import { Button } from "@/src/shared/components/btn";
import { FaCheck } from "react-icons/fa6";

type Props =
    { isEdit?: false,  }
    | { isEdit: true, entity: "product" | "variant", id: number, isSubmitting?:boolean }

export const SupplierSelection = (props: Props) => {

    const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, control, register, reset } = useFormContext<SupplierForm>();

    const { errors, dirtyFields } = useFormState({ control, name: "supplier" });
    const selected = useWatch({ control, name: "supplier" });


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleConfirm = ({ id, name, relationMode, capabilities }: { id: number, name: string, relationMode: SupplierRelationModeDb, capabilities: SupplierCapabilityDb[] }) => {
        // asignamos
        setValue("supplier", {
            id, name, relationMode, capabilities
        }, { shouldDirty: true, shouldValidate: true })

        setIsModalOpen(false)
    }

    useEffect(() => {
        register("supplier")
    }, [register])

    return (
        <>

            <div className="w-full">
                <div className="space-y-6">

                    <div className="flex flex-1 justify-between items-center gap-3 pb-2 text-primary border-b border-border-input">
                        <span className="text-2xl">{<LuBuilding2 />}</span>
                        <div className="w-full">
                            <h3 className={`font-semibold text-text ${FIELD_STYLE.validation["*"]}`}>
                                Proveedor comercial
                            </h3>
                        </div>
                        {props.isEdit &&
                            <div className="inline-flex gap-4">
                                <Button variant="basic" size="xs" padding="p-0" type="button"
                                    disabled={props.isSubmitting || !dirtyFields.supplier}
                                    onClick={() => reset()}
                                >
                                    <MdRestartAlt size={20} />
                                </Button>
                                <Button
                                    variant="basic" size="xs" padding="p-0" type="submit"
                                    loading={props.isSubmitting}
                                    disabled={!dirtyFields.supplier}
                                >
                                    <FaCheck size={20} />
                                </Button>
                            </div>
                        }
                    </div>

                    <button className={clsx(
                        FIELD_STYLE.base,
                        FIELD_STYLE.size["md"],
                        FIELD_STYLE.borderSize[1],
                        FIELD_STYLE.roundedSize.sm,
                        errors.supplier
                            ? FIELD_STYLE.status.error
                            : dirtyFields.supplier ? FIELD_STYLE.status.dirty : FIELD_STYLE.status.normal,

                        "text-start relative flex gap-2")}
                        type="button"
                        aria-label="Proveedor comercial"
                        onClick={handleOpenModal}
                    >
                        <MdOutlineStore />
                        <span className="text-text-muted text-sm">{selected?.name ?? "Seleccionar"}</span>
                        <div className=" absolute right-0 pr-1 top-0 flex items-center h-full">
                            <MdExpandMore size={20} />
                        </div>
                    </button>
                </div>

                {/* MSG ERROR */}
                {errors.supplier &&
                    <span className={FIELD_STYLE.validation.errorMsg}>{errors.supplier.message}</span>
                }

                {/* MODO RELATION */}
                <div className="mt-2 flex flex-col items-start bg-bg-soft-blue flex-wrap gap-1 rounded-md px-3 py-2.5 text-sm">
                    <span className="font-semibold text-primary">
                        Modo de relación contractual
                    </span>
                    {
                        selected?.relationMode
                            ? <span className="border border-border-input bg-bg-select px-2 py-1 rounded-md">
                                {SUPPLIER_RELATION_MODE_LABEL[selected.relationMode]}
                            </span>
                            : <span className="text-sm font-medium text-text-muted py-1">
                                Sin definir
                            </span>
                    }

                </div>
                {/* CAPABILITIES */}
                <div className="mt-2 flex flex-col bg-bg-soft-blue px-3 py-2.5 gap-1 rounded-md text-sm">
                    <span className="shrink-0 text-primary font-semibold">
                        Capacidades
                    </span>

                    {
                        selected?.capabilities
                            ? <div className="flex flex-wrap gap-1.5">
                                {selected.capabilities.map((capability) => (
                                    <span
                                        key={capability}
                                        className="rounded bg-bg-select border border-border-input px-2 py-0.5 font-medium text-text"
                                    >
                                        {SUPPLIER_CAPABILITIES_LABELS[capability]}
                                    </span>
                                ))}
                            </div>
                            : <span className="text-sm font-medium text-text-muted py-1">
                                Sin definir
                            </span>
                    }
                </div>


            </div>
            {/* </FormCard> */}
            <DynamicModal open={isModalOpen} onClose={handleCloseModal} inactiveScroll
                size="2xl"
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
