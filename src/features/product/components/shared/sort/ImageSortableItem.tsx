import { configSortNode } from "@/src/components/ui";
import { FaRegHandLizard } from "react-icons/fa"

interface Props {
    id: string;
    children: React.ReactNode;
    order:number;
}

export const ImageSortableItem = ({ id, children, order }: Props) => {

    const { style, setNodeRef, listeners, attributes } = configSortNode(id);


    return (
        <div style={style} ref={setNodeRef} className=" relative">

            <div {...listeners} {...attributes}

                className={` absolute flex  -top-0.5 -left-0.5 group  z-10 cursor-grab active:cursor-grabbing p-2`}>

                <div className="flex justify-center items-center text-white font-semibold w-10 h-10 py-2 bg-amber-500 rounded-full group-hover:bg-amber-600">
                    <span>{order}</span>
                </div>
                
                <FaRegHandLizard className="text-gray-400 group-hover:text-gray-900 cursor-grab active:cursor-grabbing" />
            </div>
            {children}
        </div>
    )
}
