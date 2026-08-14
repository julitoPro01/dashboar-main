"use client";
import { CategoryTreeSelector } from "@/src/features/category/shared/components";
import { CatgTreeSelectorSelected } from "@/src/features/category/types";
import { DynamicModal } from "@/src/shared/components/modal";
import { useStore } from "@/src/store/useStore";
import { useShallow } from "zustand/react/shallow";

export const SelectCategoryModal = () => {

    const { setOpenModal, setFilters, isOpen, categoryId, paths } = useStore(useShallow(v => ({
        setFilters: v.setCategoryAttrsFilters,
        setOpenModal: v.setCategorySelectModal,
        isOpen: v.aategorySelectModal.isOpen,
        paths: v.aategorySelectModal.paths,
        categoryId: v.categoryAttrsFilters.categoryId
    })))



    const handleApply = ({ id: categoryId, isParent, paths }: CatgTreeSelectorSelected) => {
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

