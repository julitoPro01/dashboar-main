import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES } from "@/src/shared/domains/status";
import { CategoryTreeNode } from "../../types";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface ItemProps {
    category: CategoryTreeNode;
    selectedId?: number;
    selectedItems: CategoryTreeNode[];
    onOpenFloatingMenu: (selectedItems: CategoryTreeNode[], cx: number, cy: number) => void;

}


// COMPONENTE CATEGORÍA HIJO
export const ItemChild = ({ selectedItems, category, selectedId, onOpenFloatingMenu }: ItemProps) => {

    const style = RECORD_STATUS_STYLES[category.recordStatus.name];
    const isSelected = category.id === selectedId;

    return (
        <div className="px-2 group/child select-none py-0.5">
            <div className={`flex items-center justify-between gap-3 py-2 px-2 rounded-lg transition-colors
                                ${isSelected ? "bg-bg-select text-text" : "hover:bg-hover text-text-muted"}`}
                onClick={({ clientX, clientY }) => onOpenFloatingMenu(selectedItems, clientX, clientY)}>

                <div className="flex items-center gap-2">
                    <span className="text-lg text-text-subtle"><MdOutlineSubdirectoryArrowRight size={16} /></span>
                    <span className="text-sm whitespace-nowrap">{category.name}</span>
                    <span className={`text-[9px] ml-2 px-2 py-0.5 ${style.colorBg50} ${style.colorTxt500} rounded-full tracking-wider font-semibold uppercase`}>
                        {RECORD_STATUS_LABEL[category.recordStatus.name]}
                    </span>
                </div>

            </div>
        </div>
    )
}
