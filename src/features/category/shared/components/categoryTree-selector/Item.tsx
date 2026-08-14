import clsx from "clsx"
import { MdKeyboardArrowDown } from "react-icons/md"
import { FaRegFolder } from "react-icons/fa"
import { RecordStatusBadge } from "@/src/shared/domains/status"
import { CategoryTreeResponse } from "../../../types"

type Props = {
    // selected: { id: number, path: string },
    ctg: CategoryTreeResponse,
    selectedPath: CategoryTreeResponse[],
    onSelect: (val: any) => void,
    isSelected: boolean;
    hasChildren: boolean;
}
export const Item = ({ isSelected, ctg, hasChildren, onSelect, selectedPath }: Props) => {

    return (
        <div className="relative flex items-center select-none py-0.5">

            <div className={clsx("absolute left-0 w-5.25 border-b border-border-strong",
                hasChildren ? "bottom-0" : "top-1/2 -translate-y-1/2"
            )} />

            {hasChildren
                ? <div className="w-7 flex justify-center ">
                    <span className=" text-text-subtle"><MdKeyboardArrowDown size={20} /> </span>
                </div>
                : <span className="w-5.25 "> </span>
            }

            <div className={clsx("flex-1 flex items-center rounded-lg  px-2 h-10 border ",
                hasChildren
                    ? "text-text-muted"
                    : `text-text transition-colors  cursor-pointer ${!isSelected && "hover:bg-hover"}`,
                isSelected ? "bg-bg-select border-border-select/50 " : "border-transparent",
            )}
            onClick={() => (!hasChildren) && onSelect(selectedPath)}
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
}