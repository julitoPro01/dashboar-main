import { Checkbox, ToggleSwitch } from "@/src/shared/components/btn"
import { useSortableItemContext } from "@/src/shared/sortable";
import { FaCheck } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { RxDragHandleDots2 } from "react-icons/rx";
import { CategoryAttrDisplayGroupDb } from "../../../types";
import { CATEGORY_ATTR_GROUP_LABEL, CATEGORY_ATTR_GROUP_OPTIONS } from "../../../constants/displayGroup";

export const BodyCells = {
    Selection: (checked: boolean, disabled: boolean, indeterminate: boolean, onChange: () => void) =>
        <div className="w-full flex items-center text-start ps-0.5">
            <Checkbox
                disabled={disabled}
                checked={checked}
                indeterminate={indeterminate}
                onChange={onChange}
                size="sm"
            />
        </div>,
    Index: (index: string) => <span>{index}</span>,
    OrderEdit: (order: number, disabled: boolean) => {
        const { attributes, listeners } = useSortableItemContext();
        return (<button
            className={`flex items-center justify-center gap-2 not-disabled:cursor-grab active:cursor-grabbing disabled:cursor-no-drop not-disabled:hover:text-text-strong w-full h-full`}
            {...(!disabled && attributes)} {...(!disabled && listeners)}
            disabled={disabled}
        >
            <RxDragHandleDots2 size={20} /> <span>{order}</span>
        </button>)
    },
    Order: (order: number) => <div className="w-full text-center">{order}</div>,
    Name: (name: string) => <span>{name}</span>,

    ToggleSwitch: (disabled: boolean, checked: boolean, onChange: (val: boolean) => void, canSelected: boolean) => {
        return (
            <div className="flex justify-center">
                {canSelected
                    ? <ToggleSwitch
                        disabled={disabled}
                        checked={checked}
                        onChange={(val) => onChange(val)} />
                    : checked ? <FaCheck /> : <GrClose />}
            </div>
        )
    },

    Group: (disabled: boolean, displayGroup: CategoryAttrDisplayGroupDb | null, onChange: (val: string) => void, canSelected: boolean) => {
        const init = CATEGORY_ATTR_GROUP_OPTIONS.find(v=>v.value==="GENERAL")!.value;
        if (canSelected)
            return (
                <select
                    className="disabled:cursor-not-allowed cursor-pointer bg-surface rounded-sm px-1 py-0.5"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => { onChange(e.target.value) }}
                    disabled={disabled}
                    value={displayGroup ?? init} >
                    {CATEGORY_ATTR_GROUP_OPTIONS.map(v =>
                        <option key={v.value} value={v.value} >{v.label}</option>
                    )}
                </select>
            )
        else
            return <span> {displayGroup ? CATEGORY_ATTR_GROUP_LABEL[displayGroup] : CATEGORY_ATTR_GROUP_LABEL.GENERAL} </span>
    }
}
