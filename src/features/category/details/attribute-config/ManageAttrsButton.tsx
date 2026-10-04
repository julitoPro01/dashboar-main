"use client";
import { Button } from "@/src/shared/components/btn"
import { FaPlus } from "react-icons/fa"
import { useStore } from "@/src/store/useStore";

interface Props {
    paths: { id: number; name: string }[];
    categoryId: number;
}
export const ManageAttrsButton = ({ paths, categoryId }: Props) => {

    const mainCategoryPath = useStore(v => v.selectedMainCategory?.path) || "";


    return (
        <Button variant="secondary" size="sm"
        //  onClick={() => onManageAttrs({ paths, categoryId })}
         >
            <FaPlus size={16} />
        </Button>)
}
