"use client";
import { CategoryTreeSelector } from "@/src/features/category/shared/components";
import { DynamicModal } from "@/src/shared/components/modal";
import { useStore } from "@/src/store/useStore";
import { useShallow } from "zustand/react/shallow";

export const SelectCategoryModal = () => {

    const { setOpenModal, setFilters, isOpen, categoryId, paths } = useStore(useShallow(v => ({
        setFilters: v.setCategoryAttrFilters,
        setOpenModal: v.setSelectCategoryModal,
        isOpen: v.selectCategoryModal.isOpen,
        paths: v.selectCategoryModal.paths,
        categoryId: v.categoryAttrFilters.categoryId
    })))



    const handleApply = (categoryId: number, isParent: boolean, paths: { name: string, id: number }[]) => {
        console.log(categoryId)
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

            <CategoryTreeSelector
                categoryId={categoryId}
                paths={paths}
                onConfirm={handleApply}
            />

        </DynamicModal >
    )
}

