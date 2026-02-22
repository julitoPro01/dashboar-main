import { BiEditAlt, BiTrash } from "react-icons/bi"
import { MdOutlineRemoveRedEye } from "react-icons/md"

interface Props{
    onRemove:()=>void;
    onUpdate:()=>void;
    onDetails:()=>void;
}

export const Action = ({onDetails,onRemove,onUpdate}:Props) => {
    return (
        <div className="flex flex-col justify-between ml-auto">
            <button
                onClick={onDetails}
                className="p-2 rounded-full text-blue-500 hover:text-white hover:bg-blue-500 transition"
            >
                <MdOutlineRemoveRedEye size={20} className="" />
            </button>

            <button
                onClick={onUpdate}
                className="p-2 rounded-full text-orange-500 hover:text-white hover:bg-orange-500 transition"
            >
                <BiEditAlt className="w-5 h-5" />
            </button>

            <button
                onClick={onRemove}
                className="p-2 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition"
            >
                <BiTrash className="w-5 h-5" />
            </button>

        </div>)
}
