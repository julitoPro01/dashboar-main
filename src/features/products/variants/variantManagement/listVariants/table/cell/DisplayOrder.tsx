import { useSortableItemContext } from "@/src/shared/sortable";
import { LuArrowDownUp } from "react-icons/lu";
import { CellObjs } from "../Columns";


interface Props extends CellObjs {
    data: {
        order: number
    }
}
export const SortableOrderCell = ({ data }: Props) => {
    const { handleRef } = useSortableItemContext();

    return (

        <button
            className={`flex items-center justify-center gap-2 not-disabled:cursor-grab active:cursor-grabbing disabled:cursor-no-drop not-disabled:hover:text-text-strong w-full h-full`}
            ref={handleRef}
        >
            <LuArrowDownUp size={20} /> <span>{data.order}</span>
        </button>

    )
}

export const OrderInputCell = ({ data }: Props) => {

    return (
        
        <button>
            {data.order}
        </button >

    )
}