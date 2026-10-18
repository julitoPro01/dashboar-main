import { useStore } from "@/src/store/useStore";
import { LuPackage } from "react-icons/lu";
import { LayoutButton } from "./LayoutButton";

interface Props { isCollapsed: boolean }

export const AdjustStockButton = ({ isCollapsed }: Props) => {
    
    const setTableAction = useStore(v => v.setVariantTableAction);
    const action = useStore(v => v.variantTableAction.type);
    const isActive = action === "adjustStock";

    return (
        <LayoutButton
            title={isActive ? "Cancelar ajuste de inventario" : "Ajustar inventario"}
            isCollapsed={isCollapsed}
            onAction={() => setTableAction(isActive ? "list" : "adjustStock")}
            icon={<LuPackage />}
            active={isActive}
        />
    );
};
