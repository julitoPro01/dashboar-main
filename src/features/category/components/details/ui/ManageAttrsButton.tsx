"use client";
import { Button } from "@/src/shared/components/btn"
import { FaPlus } from "react-icons/fa"
import { useFloatingMenuAction } from "../../list-tree/hooks/useFloatingMenuAction"
import { useStore } from "@/src/store/useStore";

interface Props {
    paths: { id: number; name: string }[];
    categoryId: number;
}
export const ManageAttrsButton = ({ paths, categoryId }: Props) => {

    const mainCategoryPath = useStore(v => v.selectedMainCategory?.path) || "";

    const onManageAttrs = useFloatingMenuAction(mainCategoryPath).onManageAttrs;

    return (
        <Button variant="secondary" size="sm" onClick={() => onManageAttrs({ paths, categoryId })}>
            <FaPlus size={16} />
        </Button>)
}
