import { LuArrowDownUp } from "react-icons/lu";
import { LayoutButton } from "./LayoutButton";
import { useStore } from "@/src/store/useStore";

interface Props { isCollapsed: boolean }
export const DisplayOrderButton = ({ isCollapsed }: Props) => {

    const setTableActionType = useStore(v => v.setVariantTableAction);
    const tableActionType = useStore(v => v.variantTableAction.type);

    const isReorder = tableActionType === "reorder";

    const title = isReorder ? "Cancelar reordenamiento" : "Reordenar";

    const handleSetAction = () => {
        setTableActionType(isReorder ? "list" : "reorder")
    }

    return (
        <LayoutButton
            title={title}
            isCollapsed={isCollapsed}
            onAction={handleSetAction}
            icon={<LuArrowDownUp />}
            active={isReorder}
        />
    )
}
