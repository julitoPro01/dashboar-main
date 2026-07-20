import clsx from "clsx"
import { MdKeyboardArrowDown } from "react-icons/md"
import { FaRegFolder } from "react-icons/fa"
import { CategoryTreeResponse } from "../../../shared/categoryTree.api.type"
import { RecordStatusBadge } from "@/src/shared/domains/status"

type Props = {
    selectedId: number,
    ctg: CategoryTreeResponse,
    selected: CategoryTreeResponse[],
    onSelect: (val: any) => void,
    activateSelectionAll?: boolean
}
export const Item = ({ ctg, onSelect, selected, selectedId, activateSelectionAll }: Props) => {

    const hasChild = ctg.children.length;
    return (
        <div className={clsx("grid grid-cols-12 items-center py-2 rounded-lg my-1", {
            ["cursor-pointer transition-colors hover:bg-hover"]: activateSelectionAll ?? !hasChild,
            ["bg-bg-select"]: selectedId === ctg.id
        })}
            onClick={() =>(activateSelectionAll || !hasChild) && onSelect(selected)}>

            <div className="col-span-7 flex items-center gap-2">
                {
                    hasChild
                        ? <>
                            <span className="text-text-subtle"><MdKeyboardArrowDown /> </span>
                            <span className=" text-primary"><FaRegFolder /></span>
                        </>
                        : <span className="w-6"> </span>
                }
                <span className="text-text">{ctg.name}</span>
            </div>

            <div className="col-span-4 flex justify-center">
                <RecordStatusBadge status={ctg.recordStatus.name}
                    style={{ border: false, bg: false, bullet: false, textSize: "xxs" }} />
            </div>

            <div className="col-span-1 text-center text-text-subtle font-mono text-xs">
                {ctg.level}
            </div>

        </div>
    )
}