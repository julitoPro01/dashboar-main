import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { RenderCategoryTree } from "./RenderCategoryTree";
import { CategoryTreeResponse } from "@/src/interfaces/category";
import { UpsertProductForm } from "@/src/features/product/type/upsertProductForm.type";

type SelectedCategoryTree = { id: number, name: string, parentId?: number }

interface Props {
    onCloseModal: () => void;
    categoryTree: CategoryTreeResponse;
}

export const SelectSubCategories = ({ categoryTree, onCloseModal }: Props) => {

    const { setValue } = useFormContext<UpsertProductForm>()

    const [selectedCatgTree, setSelectedCatgTree] = useState<SelectedCategoryTree[]>([]);

    return (
        <div className="relative">
            <div className="py-2 px-4">
                <span className="font-semibold text-lg text-white bg-indigo-400 px-2 py-1 rounded-2xl">
                    {categoryTree.name}
                </span>
            </div>

            {RenderCategoryTree(setSelectedCatgTree, selectedCatgTree)(categoryTree.children, [{ id: categoryTree.id, name: categoryTree.name, parentId: categoryTree.parentId ?? undefined }])}

            <div className="m-4 bg-white sticky bottom-0">
                <div className="p-4 bg-sky-100">
                    <span className="font-semibold"> Seleccionados: </span>
                    {selectedCatgTree.map(v => v.name).join(" > ")}
                </div>
                <div className="flex gap-5 justify-end mt-4">

                    <button className="hover:text-black"
                        onClick={() => {
                            onCloseModal()
                            setSelectedCatgTree([])
                        }}
                    > Cancelar
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={selectedCatgTree.length < 1}
                        onClick={() => {
                            onCloseModal()
                            setSelectedCatgTree([])
                            setValue("selectedCategories", selectedCatgTree, { shouldDirty: true })
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>


        </div>
    )
}
