import clsx from "clsx";
import { CiEdit } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";

interface PropsBtnAction {
    handleUpdateCategory: () => void;
    isSelected: boolean
}
export const BtnAction = ({ handleUpdateCategory, isSelected }: PropsBtnAction) => {

    return (
        <div className={clsx("h-full group-hover:flex",
            { "flex": isSelected, "hidden": !isSelected }
        )}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateCategory()
                }}
                className={"text-gray-400 hover:text-black h-full items-center pe-1 cursor-pointer"}>
                <CiEdit
                    size={20}
                />
            </button>

            <button
                className={"h-full flex items-center cursor-pointer"}>
                <MdKeyboardArrowRight
                    size={20}
                    className="text-gray-400 "
                />
            </button>
        </div>
    )
}