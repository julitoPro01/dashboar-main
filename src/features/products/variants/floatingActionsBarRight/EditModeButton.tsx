import { FaRegEdit } from "react-icons/fa"
import { FloatingActionButton } from "./FloatingActionButton"
import { useStore } from "@/src/store/useStore";
import { VARIANT_TABLE_ACTION } from "@/src/store/variantSlice";

type Props = { isCollapsed: boolean }

export const EditModeButton = ({ isCollapsed }: Props) => {

    const setTableActionType = useStore(v => v.setVariantTableAction);
    const tableActionType = useStore(v => v.variantTableAction.type);

    const isEditMode = tableActionType ===VARIANT_TABLE_ACTION.editMode;

    const handle = () => {
        setTableActionType(isEditMode ? VARIANT_TABLE_ACTION.list : VARIANT_TABLE_ACTION.editMode)

    }

    return (
        <FloatingActionButton
            title={isEditMode ? "Cancelar edición" : "Modo de edición"}
            icon={<FaRegEdit />}
            isCollapsed={isCollapsed}
            onAction={handle}
            active={isEditMode}
        />
    )
}
