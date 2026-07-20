import { Badge } from "@/src/shared/components/badge"
import { RecordStatusBadge } from "@/src/shared/domains/status"
import { DateColumn } from "@/src/shared/table"
import { ATTRIBUTE_DATATYPE_LABEL } from "../../../constants/dataTypeLabel"
import { AttributeDataTypeDb } from "../../../types"

export const BodyCells = {
    Index: (i: number) => <span className={" "}> {i < 10 ? 0 + "" + i : i}</span>,
    Name: (name: string, values: { value: string, displayOrder: number | null }[]) => <div className=" flex flex-col">
        <span className="font-semibold" >{name}</span>
        <div className="flex gap-3">
            {values.map(v =>
                <span key={v.displayOrder} className="text-xs">{v.displayOrder}: {v.value}</span>
            )}
        </div>
    </div>,
    DataType: (dataType: AttributeDataTypeDb) => <Badge variant="darkInfo"> {ATTRIBUTE_DATATYPE_LABEL[dataType]} </Badge>,
    isActive: (isActive: boolean) => <RecordStatusBadge status={isActive ? "ACTIVE" : "INACTIVE"} />,
    Date: (createdAt: Date, updatedAt: Date | null) => <DateColumn createdAt={createdAt} updatedAt={updatedAt} />
}