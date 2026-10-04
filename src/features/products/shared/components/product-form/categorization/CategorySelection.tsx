
import { DynamicModal } from "@/src/shared/components/modal"
import { useEffect, useState } from "react"
import { useFormContext, useFormState, useWatch } from "react-hook-form"
import { MdOutlineCategory } from "react-icons/md"
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters"
import { CategoryTreeSelector } from "@/src/features/category/shared/components"
import { CatgTreeSelectorSelected } from "@/src/features/category/types"
import { CategorizationForm } from "@/src/features/products/types"
import { FIELD_STYLE } from "@/src/shared/form"
import { CiWarning } from "react-icons/ci"
import { LuArrowRightLeft } from "react-icons/lu"

export const CategorySelection = () => {

    const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, control, register } = useFormContext<CategorizationForm>();
    const { errors } = useFormState({ control, name: "categorization.category" });
    const selected = useWatch({ control, name: "categorization.category" });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleConfirm = async ({ id, name, paths, path }: CatgTreeSelectorSelected) => {
        // asignamos
        setValue("categorization.category", {
            id, name, paths, path
        }, { shouldDirty: true, shouldValidate: true });

        setIsModalOpen(false)
        //cerramos
    }


    useEffect(() => {
        register("categorization.category");
    }, [register]);

    const countpaths = selected?.paths?.length ?? 0;

    return (
        <>
            <div className="w-full">

                <div className="rounded-md">
                    {/* Label */}
                    <div className="mb-3 flex items-center gap-4">
                        <span
                            className={
                                FIELD_STYLE.label +
                                " " +
                                FIELD_STYLE.validation["*"]
                            }
                        >
                            Categoría asignada
                        </span>
               
                    </div>

                    {/* Category */}
                    <div className=" flex items-center bg-bg-select gap-3 rounded-md border border-border-input px-3 py-3">
                        <div className="mt-0.5 shrink-0 text-primary">
                            <MdOutlineCategory size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                            {selected?.path ? (
                                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
                                    {selected.paths?.map(({ name, id }, index) => (
                                        <div
                                            key={id}
                                            className="flex items-center gap-x-1.5"
                                        >
                                            <span
                                                className={
                                                    index === countpaths - 1
                                                        ? "font-medium text-primary"
                                                        : "text-text"
                                                }
                                            >
                                                {name}
                                            </span>

                                            {index < countpaths - 1 && (
                                                <span className="text-xs text-text-subtle">
                                                    ›
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-sm text-text-muted">
                                    Sin categoría asignada
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action */}
                    <div className="mt-3 flex justify-end">
                        <button
                            type="button"
                            className=" inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 "
                            onClick={handleOpenModal}
                        >
                            <LuArrowRightLeft size={16} />
                           {selected ? "Cambiar categoría":"Seleccionar"} 
                        </button>
                    </div>
                </div>

                {/* ERROR MSG */}
                {errors.categorization?.category && <span className={FIELD_STYLE.validation.errorMsg}>{errors.categorization.category.message}</span>}
                {/* CATEGORIAS SELECCIONADOS */}


                {selected && <>
                    <div className="flex my-4 items-start gap-2.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
                        <CiWarning
                            size={22}
                            className="mt-0.5 shrink-0 text-amber-600"
                        />

                        <p className="text-sm leading-5 text-amber-800">
                            Cambiar la categoría reconfigurará los{" "}
                            <strong className="font-semibold">
                                atributos del sistema heredados
                            </strong>{" "}
                            y requerirá volver a validar los campos obligatorios.
                        </p>
                    </div>
                </>}

            </div>

            <DynamicModal open={isModalOpen} onClose={handleCloseModal} fixedHeight
                size="4xl"
                Search={<SearchInput
                    value={value}
                    placeholder="Buscar categoría... (min.3)"
                    onChange={handleSearch}
                    onClear={handleClean}
                />}
            >
                <CategoryTreeSelector
                    categoryId={selected?.id}
                    paths={selected?.paths}
                    name={selected?.name}
                    path={selected?.path}
                    onConfirm={handleConfirm}
                    search={valueApplied}
                />

            </DynamicModal>
        </>
    )
}
