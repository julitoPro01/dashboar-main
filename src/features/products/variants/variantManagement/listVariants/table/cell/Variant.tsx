import { CHANNEL_LABEL, channelIcons, INVENTORY_POLICY, InventoryPolicyTypeDb, PUBLICATION_STATUS } from "@/src/features/products/shared/catalog"
import { CellObjs } from "../Columns"
import { VariantListItemResponse } from "@/src/features/products/types"
import { useSelectedCell } from "../useSelectedCell"
import { Tooltip } from "@/src/shared/components/floating"
import { LuStar } from "react-icons/lu"


interface Props extends CellObjs {
    data: {
        sku: string,
        isMainVariant: boolean,
        stockQuantity: number,
        minStock: number | null,
        inventoryPolicy: InventoryPolicyTypeDb,
        channels: VariantListItemResponse["variantChannel"]
    }
}

export const VariantCell = ({ data, columnId, originalId, styleBody, editable }: Props) => {


    const { isDirty, handleSelectCell, selectedCell } = useSelectedCell({
        columnId,
        editable: editable,
        originalId: originalId,
        dirtyData: {}
    })

    return (
        <div className={`h-full flex flex-col gap-2 ring-1 ${styleBody}
                    ${isDirty ? "ring-amber-500 bg-amber-50" : selectedCell ? "ring-border-select" : "ring-transparent"}`}
            onClick={({ clientX, clientY }) => handleSelectCell({ cx: clientX, cy: clientY })}
        >
            <span className="font-mono font-semibold ">{data.sku}</span>

            <span className="text-xs whitespace-nowrap">
                {
                    data.inventoryPolicy === INVENTORY_POLICY.AUTO_DECREMENT
                        ? <>
                            Stock: <span className="text-sm">{data.stockQuantity}</span>  un. {""}
                            {data.minStock !== null && `Mínimo: ${data.minStock}`}

                        </>
                        : <span>Stock ilimitado</span>
                }
            </span>
            <div className="flex gap-4 flex-nowrap">

                {data.channels.map(({ id, channel, publicationStatus }) => {
                    const chan = channelIcons[channel];
                    if (publicationStatus === PUBLICATION_STATUS.ACTIVE)
                        return (
                            <Tooltip text={CHANNEL_LABEL[channel]} key={id}>
                                <chan.icon className={chan.color} />
                            </Tooltip>
                        )
                    else return null;
                })}

                {data.isMainVariant &&
                    <Tooltip text="Variante principal" >
                        <span className="text-primary"><LuStar /></span>
                    </Tooltip>
                }
            </div>
        </div>

    )
}
