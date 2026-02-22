import { BiPlus } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";

interface Props {
    onClick: () => void;
}

export const BtnNewCategory = ({ onClick }: Props) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
            className="cursor-pointer absolute right-8 hidden text-gray-400 font-border group-hover:flex hover:text-black p-1 ml-5  rounded-full  h-full items-center pe-1">
            <BiPlus
                size={24}
                className="font-bold"
            />
        </button>
    )
}

interface EditProps {
    onClick: () => void;
}

export const BtnEdit = ({ onClick }: EditProps) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick()
            }}
            className={"cursor-pointer absolute right-1 hidden text-gray-400 font-border group-hover:flex hover:text-black p-1 ml-5  rounded-full  h-full items-center pe-1"
            }>
            <CiEdit
                size={18}
            />
        </button>
    )
}