import { FaRegClock, FaRegEdit } from "react-icons/fa";
import { useSelectedCell } from "../useSelectedCell";
import { Checkbox } from "@/src/shared/form";
import { Tooltip } from "@/src/shared/components/floating";
import { VariantDiscountStatus } from "@/src/features/products/types";
import { CellObjs } from "../Columns";
import { dateFormatter } from "@/src/shared/utils/date";
import { formatPrice } from "@/src/shared/utils";
import { CellTitle, useTableContext } from "@/src/shared/table/core";
import { VARIANT_COLUMN_ID } from "../columnName";
import { useStore } from "@/src/store/useStore";

interface Props extends CellObjs {
    data: {
        basePrice: string,
        discount: number,
        discountStartsAt: Date | null,
        discountEndsAt: Date | null,
        discountStatus: VariantDiscountStatus
    }
}

export const PriceCell = ({ data, columnId, editable, originalId, styleBody }: Props) => {
    const { isDirty, handleSelectCell, selectedCell, isMultSelect } = useSelectedCell({
        columnId: columnId,
        editable: editable,
        originalId: originalId,
        dirtyData: {}
    })

    const price = Number(data.basePrice);
    const hasDiscount = data.discountStatus === "ACTIVE"
        && Number.isFinite(price)
        && Number.isFinite(data.discount)
        && data.discount > 0;
    const finalPrice = hasDiscount ? price * (1 - data.discount / 100) : price;

    const statusLabel = {
        NONE: "",
        SCHEDULED: "Descuento programado",
        ACTIVE: "Descuento activo",
        EXPIRED: "Descuento vencido",
    }[data.discountStatus];

    const endLabel = data.discountStatus === "EXPIRED" ? "Finalizó" : "Finaliza";

    const discountDetails = [
        `Descuento: ${data.discount}%`,
        data.discountStartsAt && `Inicia: ${dateFormatter.format(data.discountStartsAt, "dateTimeShort")}`,
        data.discountEndsAt && `${endLabel}: ${dateFormatter.format(data.discountEndsAt, "dateTimeShort")}`,
    ].filter(Boolean).join(" · ");

    return (
        <div className={`relative h-full flex items-center gap-2 ring-1 ${styleBody}
                  ${isDirty ? "ring-amber-500 bg-amber-50" : selectedCell ? "ring-border-select" : "ring-transparent"}
                  hover:bg-bg-select/50
                  `}
        >
            {/* Acciones para edición */}
            <div className="absolute top-0   flex items-center gap-3 pt-2">
                <Checkbox
                    size="md"
                    checked={selectedCell?.isSelected ?? false}
                    onChange={() => handleSelectCell({ cx: 0, cy: 0 }, true)}
                />

                {!isMultSelect && (
                    <Tooltip text={"Edición individual"}  >
                        <FaRegEdit
                            size={15}
                            className="text-text-muted"
                        />
                    </Tooltip>
                )}

            </div>

            <span className="font-medium text-on-surface">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
                <span className="ml-2 text-xs line-through">{formatPrice(price)}</span>
            )}
            {
                data.discountStatus !== "NONE" &&
                <div className="absolute top-0 right-0 p-2">
                    <Tooltip text={statusLabel} descrip={discountDetails}>
                        <span className={data.discountStatus === "ACTIVE" ? "text-primary-light" : "text-text-muted"}>
                            <FaRegClock />
                        </span>
                    </Tooltip>
                </div>
            }
        </div>
    )
}

export const PriceColumn = ({ columnId }: { columnId: string }) => {

    const setSelectCells = useStore(v => v.setVariantSelectCells);
    const selectedColumn = useStore(
        (v) => v.variantSelectedCells[columnId].cell ?? {}
    );

    const table = useTableContext().table!;
    const rows = table.getRowModel().rows;

    const selectedCount = rows.filter((row) => {
        return selectedColumn?.[row.original.id]?.isSelected;
    }).length;

    const checked = rows.length > 0 && selectedCount === rows.length;
    const indeterminate = selectedCount > 0 && !checked;

    const handleToogle = (checked: boolean) => {

        rows.forEach(v => {

            const selected = selectedColumn[v.original.id]
            if (checked) {

                if (!selected?.isSelected && !selected?.isDirty) {
                    setSelectCells(columnId, v.original.id, {
                        isSelected: true,
                        columnId,
                        mode: "multiSelect",
                        isDirty: false,
                        originalId: v.original.id,
                        dirtyData: {}
                    })
                }
            }
            else if (!selected?.isDirty) {
                setSelectCells(columnId, v.original.id, undefined)
            }
        })
    }

    return (
        <div className="flex gap-2">
            <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                onChange={(e) => {
                    handleToogle(e.target.checked)
                }}
            />
            <CellTitle title="Precio" />
        </div>
    );
};
