
import { DynamicModal } from "@/src/shared/components/modal"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useFormContext, useFormState, useWatch } from "react-hook-form"
import { MdExpandMore } from "react-icons/md"
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters"
import { CategoryTreeSelector } from "@/src/features/category/shared/components"
import { CatgTreeSelectorSelected } from "@/src/features/category/types"
import { CategorizationForm } from "@/src/features/products/types"
import { FIELD_STYLE } from "@/src/shared/form"
import { CiWarning } from "react-icons/ci"

export const CategorySelection = () => {

    const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, control, register } = useFormContext<CategorizationForm>();
    const { errors, dirtyFields } = useFormState({ control, name: "categorization.category" });
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
                <div className="space-y-2">

                    <div className="flex flex-wrap items-center">
                        <span className={FIELD_STYLE.label + " " + FIELD_STYLE.validation["*"]}>Categoría asignado</span>
                    </div>

                    <button className={clsx(
                        FIELD_STYLE.base,
                        FIELD_STYLE.size["md"],
                        FIELD_STYLE.borderSize[1],
                        FIELD_STYLE.roundedSize.lg,
                        errors.categorization?.category
                            ? FIELD_STYLE.status.error
                            : dirtyFields.categorization?.category ? FIELD_STYLE.status.dirty : FIELD_STYLE.status.normal,
                        "text-start relative")}
                        type="button"
                        onClick={handleOpenModal}
                    >
                        <span className="text-text-muted text-sm"> {selected?.name ?? "Seleccionar"} </span>

                        <div className=" absolute right-0 pr-1 top-0 flex items-center h-full text-text-muted">
                            <MdExpandMore size={20} />
                        </div>
                    </button>

                </div>
                {/* ERROR MSG */}
                {errors.categorization?.category && <span className={FIELD_STYLE.validation.errorMsg}>{errors.categorization.category.message}</span>}
                {/* CATEGORIAS SELECCIONADOS */}

                {(selected?.paths) && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-1.5 rounded-md bg-bg-soft-blue px-4 py-1.5 text-sm">
                        {selected.paths.map(({ name, id }, index) => {

                            return <div key={id} className="flex items-center gap-x-1.5">
                                <span
                                    className={
                                        index === countpaths - 1
                                            ? "text-primary"
                                            : "text-text"
                                    }
                                >
                                    {name}
                                </span>

                                {index < countpaths - 1 && (
                                    <span className="text-xs text-text-subtle">❯</span>
                                )}
                            </div>
                        })}
                    </div>
                )}

                {selected && <>
                    <br />
                    <div className="flex items-start gap-2.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
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
