import { useStore } from "@/src/store/useStore";
import { LayoutButton } from "./LayoutButton";
import { LuStar } from "react-icons/lu";

interface Props { isCollapsed: boolean }
export const SetMainButton = ({ isCollapsed }: Props) => {

    const setTableActionType = useStore(v => v.setVariantTableAction);
    const tableActionType = useStore(v => v.variantTableAction.type);

    const isSetMain = tableActionType === "setMain";

    const title = isSetMain ? "Cancelar asignación principal" : "Asignar principal";

    const handleSetAction = () => {
        setTableActionType(isSetMain ? "list" : "setMain")
    }

    return (
        <LayoutButton
            title={title}
            isCollapsed={isCollapsed}
            onAction={handleSetAction}
            icon={<LuStar />}
            active={isSetMain}
        />
    )
}
