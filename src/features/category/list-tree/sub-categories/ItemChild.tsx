import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES, RecordStatusBadge } from "@/src/shared/domains/status";
import { CategoryTreeNode } from "../../types";
import { MdKeyboardArrowDown, MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import clsx from "clsx";
import { FaRegFolder } from "react-icons/fa";
import { Button } from "@/src/shared/components/btn";

interface ItemProps {
    ctg: CategoryTreeNode;
    selectedPaths: CategoryTreeNode[];
    hasChildren: boolean;
    isSelected: boolean;
    onOpenFloatingMenu: (selectedPaths: CategoryTreeNode[], cx: number, cy: number) => void;
}


// COMPONENTE CATEGORÍA HIJO
export const ItemChild = ({ selectedPaths, ctg, isSelected, hasChildren, onOpenFloatingMenu }: ItemProps) => {

    return (
        <div className="relative flex items-center select-none py-0.5">

            <div className={clsx("absolute left-0 w-[20.5px] border-b border-border-strong",
                hasChildren ? "bottom-0" : "top-1/2 -translate-y-1/2"
            )} />

            {hasChildren
                ? <div className="w-10 flex justify-center">
                    <Button size="xs" padding="px-1.5 py-2" variant="basic">
                        <MdKeyboardArrowDown size={20} />
                    </Button>
                </div>
                : <span className="w-5.25 "> </span>
            }

            <div className={clsx("flex-1 flex items-center rounded-lg  px-2 h-10 border ",
                `text-text transition-colors  cursor-pointer ${!isSelected && "hover:bg-hover"}`,
                isSelected ? "bg-bg-select border-border-select/50 " : "border-transparent",
            )}
                onClick={({ clientX, clientY }) => onOpenFloatingMenu(selectedPaths, clientX, clientY)}
            >


                <div className="flex-1 flex items-center  ">
                    {hasChildren && <span className="w-5 text-primary"><FaRegFolder /></span>}
                    <span className="px-2 text-sm" >{ctg.name}</span>
                </div>

                <div className="w-40 flex justify-around">
                    <RecordStatusBadge status={ctg.recordStatus.name}
                        style={{ border: false, bg: false, bullet: false, textSize: "xxs" }}
                    />
                    <span className=" text-center text-text-subtle font-mono text-sm">{ctg.level}</span>
                </div>
            </div>

        </div>
    )

    // return (
    //     <div className="px-2 group/child select-none py-0.5">
    //         <div className={`flex items-center justify-between gap-3 py-2 px-2 rounded-lg transition-colors
    //                             ${isSelected ? "bg-bg-select text-text" : "hover:bg-hover text-text-muted"}`}
    //             onClick={({ clientX, clientY }) => onOpenFloatingMenu(selectedItems, clientX, clientY)}>

    //             <div className="flex items-center gap-2">
    //                 <span className="text-lg text-text-subtle"><MdOutlineSubdirectoryArrowRight size={16} /></span>
    //                 <span className="text-sm whitespace-nowrap">{category.name}</span>
    //                 <span className={`text-[9px] ml-2 px-2 py-0.5 ${style.colorBg50} ${style.colorTxt500} rounded-full tracking-wider font-semibold uppercase`}>
    //                     {RECORD_STATUS_LABEL[category.recordStatus.name]}
    //                 </span>
    //             </div>

    //         </div>
    //     </div>
    // )
}
