import { LuArrowDownUp } from "react-icons/lu";
import { FloatingActionButton } from "./FloatingActionButton";
import { useStore } from "@/src/store/useStore";
import { VARIANT_TABLE_ACTION } from "@/src/store/variantSlice";

interface Props { isCollapsed: boolean }
export const ReorderVariantsButton = ({ isCollapsed }: Props) => {

    const setTableActionType = useStore(v => v.setVariantTableAction);
    const tableActionType = useStore(v => v.variantTableAction.type);

    const isReorder = tableActionType === VARIANT_TABLE_ACTION.reorder;

    const title = isReorder ? "Cancelar reordenamiento" : "Reordenar";

    const handleSetAction = () => {
        setTableActionType(isReorder ? VARIANT_TABLE_ACTION.list : VARIANT_TABLE_ACTION.reorder)
    }

    return (
        <FloatingActionButton
            title={title}
            isCollapsed={isCollapsed}
            onAction={handleSetAction}
            icon={<LuArrowDownUp />}
            active={isReorder}
        />
    )
}
