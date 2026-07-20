"use client";
import { SelectionCategoryTree, useCategoryTreeQuery } from "@/src/features/category";
import { DynamicModal } from "@/src/shared/components/modal";
import { useStore } from "@/src/store/useStore";
import { useShallow } from "zustand/react/shallow";

export const SelectCategoryModal = () => {

    const { setOpenModal, setFilters, isOpen, categoryId, paths } = useStore(useShallow(v => ({
        setFilters: v.setCategoryAttrFilter,
        setOpenModal: v.setSelectCategoryModal,
        isOpen: v.selectCategoryModal.isOpen,
        paths: v.selectCategoryModal.paths,
        categoryId: v.categoryAttrFilter.categoryId
    })))


    const { data } = useCategoryTreeQuery({});

    const handleApply = (categoryId: number, isParent: boolean, paths: { name: string, id: number }[]) => {
        setOpenModal({ isOpen: false, paths, isParent });
        setFilters((fil) => {
            return {
                fil: { categoryId, actionType: fil.actionType }
            }
        });
    }



    return (
        <DynamicModal
            title="Seleccionar categoría"
            description="Seleccione la categoría más específica para gestionarla."
            sizeTitle="2xl"
            open={isOpen}
            onClose={() => setOpenModal({ isOpen: false })}>

            <SelectionCategoryTree categoryTree={data}
                categoryId={categoryId}
                paths={paths}
                onConfirm={handleApply}
            />

        </DynamicModal >
    )
}

