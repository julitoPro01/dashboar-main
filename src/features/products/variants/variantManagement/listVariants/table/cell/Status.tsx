import { RecordStatusBadge, RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { CellObjs } from "../Columns"
import { InventoryStatusBadge, InventoryStatusTypeDb, SaleStatusBadge, SaleStatusTypeDb } from "@/src/features/products/shared/catalog";

interface Props extends CellObjs {
    data: {
        recordStatus: RecordStatusDb,
        inventoryStatus: InventoryStatusTypeDb,
        saleStatus: SaleStatusTypeDb
    }
}

export const StatusCell = ({ data}: Props) => {
    return (
        <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Registro:</span>
                <RecordStatusBadge status={data.recordStatus} />
            </div>

            <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Inventario:</span>
                <InventoryStatusBadge status={data.inventoryStatus} />
            </div>

            <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Comercial:</span>
                <SaleStatusBadge status={data.saleStatus} />
            </div>
        </div>
    );
}
