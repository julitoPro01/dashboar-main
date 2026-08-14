
import { DynamicModal } from "@/src/shared/components/modal"
import clsx from "clsx"
import { useState } from "react"
import { useFormContext, useFormState, useWatch } from "react-hook-form"
import { MdExpandMore } from "react-icons/md"
import { SearchInput, useSearchFilter } from "@/src/shared/table/filters"
import { CategoryTreeSelector } from "@/src/features/category/shared/components"
import { CatgTreeSelectorSelected } from "@/src/features/category/types"
import { ProductFormData } from "@/src/features/products/types"
import { FIELD_STYLE } from "@/src/shared/form"

import { useCategoryAttributes } from "../../../hooks"
import { Button } from "@/src/shared/components/btn"


export const CategorySelection = () => {

    const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setValue, control, reset, getValues } = useFormContext<ProductFormData>();
    const { errors } = useFormState({ control, name: "category.id" });
    const selected = useWatch({ control, name: "category" });

    const { attributes, isError, isLoading, msg } = useCategoryAttributes();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const getAttributes = async (id: number) => {

        const data = await attributes(id);
        reset({
            ...getValues(),
            systemAttributes: data.map(v => ({
                group: v.group,
                data: v.attributes.map(v => ({
                    attributeDefinitionId: v.attributeDefinitionId,
                    dataType: v.dataType,
                    name: v.name,
                    options: v.options,

                    valueText: "",
                    valueNumber: 0,
                    valueBoolean: false,
                    valueDate: "",
                    isRequired: v.isRequired
                }))
            }))
        })
    }


    const handleConfirm = async ({ id, name, paths, path }: CatgTreeSelectorSelected) => {
        // asignamos
        setValue("category", {
            id, name, paths, path
        }, { shouldDirty: true, shouldValidate: true });

        setIsModalOpen(false)
        //cerramos

        await getAttributes(id)

    }


    return (
        <>
            <div>
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center">
                        <span className={FIELD_STYLE.label + " " + FIELD_STYLE.validation["*"]}>Categoría</span>
                        {/* MENSAGE DE ERROR */}
                        {
                            (isError || isLoading) &&
                            <p className=" text-xs px-2  rounded-full">
                                <span className={`${isError && "text-error-strong"}`} >{msg}</span>
                                {isError &&
                                    <Button variant="basic" size="xs" select="underline" padding="p-0" className="text-text ml-2"
                                        onClick={() => getAttributes(getValues("category.id"))}
                                    >Reintentar</Button>
                                }
                            </p>
                        }
                    </div>

                    <button className={clsx(
                        FIELD_STYLE.base,
                        FIELD_STYLE.size["md"],
                        FIELD_STYLE.borderSize[1],
                        FIELD_STYLE.roundedSize.lg,
                        errors.category ? FIELD_STYLE.status.error : FIELD_STYLE.status.normal,
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
                {errors.category &&
                    <span className={FIELD_STYLE.validation.errorMsg}>{errors.category.message}</span>
                }
                {/* CATEGORIAS SELECCIONADOS */}
                {selected?.paths
                    ? <div className='flex flex-wrap text-sm mt-2 bg-bg-soft-blue py-1 px-4'>
                        {selected?.paths.map(({ name, id }) => (
                            <span key={id} className="flex items-center text-primary font-medium after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                                {name}
                            </span>))}
                    </div>
                    : ""}


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
                {/* {null} */}
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
