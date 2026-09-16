import clsx from "clsx"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { FaRegFolder } from "react-icons/fa"
import { RecordStatusBadge } from "@/src/shared/domains/recordStatus"
import { CategoryTreeResponse } from "../../../types"

type Props = {
    ctg: CategoryTreeResponse,
    selectedPaths: CategoryTreeResponse[],
    isSelected: boolean;
    hasChildren: boolean;
    allowSelectingAll?: boolean;
    isOpen?: boolean;
    onOpen?: () => void;
    onSelect?: (val: any) => void,
    onOpenFloatingMenu?: (selectedPaths: CategoryTreeResponse[], cx: number, cy: number) => void;
}
export const ItemTree = ({ isSelected, ctg, hasChildren,
    onSelect, selectedPaths, allowSelectingAll,
    onOpen, isOpen, onOpenFloatingMenu }: Props) => {

    return (
        <div className="relative flex items-center select-none py-0.5  ">

            <div className=" flex items-center ">
                <div className={clsx("absolute left-0  border-b border-border-strong",
                    hasChildren ? " w-10" : "w-5 top-1/2 -translate-y-1/2"
                )} />

                {hasChildren &&
                    <div className="absolute bottom-0 translate-x-5  h-1/2 border-r border-border-strong " />
                }

                {hasChildren
                    ? <div className="w-10 flex justify-center ">
                        <div className=" text-text-subtle bg-surface relative z-1 hover:text-text-strong hover:bg-background rounded-full"
                            onClick={onOpen}>

                            {isOpen
                                ? <MdKeyboardArrowDown size={20} />
                                : <MdKeyboardArrowRight size={20} />
                            }
                        </div>
                    </div>
                    : <span className="w-5 "> </span>
                }
            </div>

            <div className={clsx("flex-1 flex items-center rounded-lg  px-2 h-10 border ",
                (!allowSelectingAll && hasChildren)
                    ? "text-text-muted"
                    : `text-text transition-colors  cursor-pointer ${!isSelected && "hover:bg-hover"}`,
                isSelected ? "bg-bg-select border-border-select/50 " : "border-transparent",
            )}
                onClick={({ clientX, clientY }) => {
                    (allowSelectingAll || !hasChildren) && onSelect?.(selectedPaths)
                    onOpenFloatingMenu?.(selectedPaths, clientX, clientY)
                }
                }
            >


                <div className="flex-1 flex items-center truncate">
                    {hasChildren && <span className="w-5 text-primary"><FaRegFolder /></span>}
                    <span className="px-2 text-sm" >{ctg.name}</span>
                </div>

                <div className="w-40 flex justify-around">
                    <RecordStatusBadge status={ctg.recordStatus.name}
                    />

                    <span className=" text-center text-text-subtle font-mono text-sm">{ctg.level}</span>
                </div>

            </div>

        </div>
    )
}