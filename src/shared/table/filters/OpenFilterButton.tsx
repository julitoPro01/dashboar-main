import clsx from "clsx"
import { MouseEvent } from "react"
import { MdFilterList } from "react-icons/md"

export const OpenFilterButton = ({ active, onClick, icon }: { active: boolean, onClick?: (e:MouseEvent) => void, icon?: React.ReactNode }) => {
    return (
        // "text-blue-500 bg-blue-50 border-blue-200": active,
        <button
            type="button"
            className={clsx(" p-1 rounded-md transition-colors border ", {
                "text-primary bg-hover border-hover": active,
                "text-text-subtle hover:text-primary hover:border-hover hover:bg-hover border-transparent": !active,
            })}
            onClick={onClick}
        >
            {icon ?? <MdFilterList size={16} />}
        </button>
    )
}
