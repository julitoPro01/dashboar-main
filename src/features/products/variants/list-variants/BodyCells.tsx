import { RecordStatusBadge, RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { IMAGE_STYLE } from "@/src/shared/theme/image";
import Image from "next/image";
import { formatPrice } from "@/src/shared/utils";
import { LuArrowDownUp, LuStar } from "react-icons/lu";
import { useSortableItemContext } from "@/src/shared/sortable";
import { INVENTORY_POLICY, InventoryPolicyTypeDb, InventoryStatusTypeDb, SaleStatusBadge, SaleStatusTypeDb } from "../../shared/catalog";
import { VariantListItemResponse } from "../../types";

type Property = VariantListItemResponse["properties"];

export const BodyCells = {

    DisplayOrder: (order: number) => {
        const { handleRef } = useSortableItemContext();
        return (

            <button
                className={`flex items-center justify-center gap-2 not-disabled:cursor-grab active:cursor-grabbing disabled:cursor-no-drop not-disabled:hover:text-text-strong w-full h-full`}
                ref={handleRef}
            >
                <LuArrowDownUp size={20} /> <span>{order}</span>
            </button>

        )
    },

    Image: (img: { name: string, path: string } | undefined, priority: boolean) =>
        <div className={`${IMAGE_STYLE.list} rounded-lg`}>
            <Image
                src={img?.path ? img.path : "/assets/notfound.jpg"}
                alt={img?.name ?? ""}
                fill
                priority={priority} sizes={IMAGE_STYLE.size_list}
                className={`${IMAGE_STYLE.image}`}
            />
        </div>,

    Variant: ({
        sku, isMainVariant, stockQuantity, minStock, inventoryPolicy
    }: { sku: string, isMainVariant: boolean, stockQuantity: number, minStock: number | null, inventoryPolicy: InventoryPolicyTypeDb }) => {
        return (
            <div className="flex flex-col  gap-2">
                <div className="flex gap-4 whitespace-nowrap">
                    <span className="font-mono font-semibold ">{sku}</span>
                    {isMainVariant && <span className="text-primary"><LuStar /></span>}

                </div>
                <span className="text-xs whitespace-nowrap">
                    {
                        inventoryPolicy === INVENTORY_POLICY.AUTO_DECREMENT
                            ? <>
                                Stock: <span className="text-sm">{stockQuantity}</span>  un. {""}
                                {minStock !== null && `Mínimo: ${minStock}`}

                            </>
                            : <span>Stock ilimitado</span>
                    }
                </span>
            </div>
        )
    },

    Sku: (sku: string, isMainVariant: boolean) => {
        return (
            <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-semibold ">{sku}</span>
                {isMainVariant && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Principal
                    </span>
                )}

            </div>
        )
    },

    Properties: (properties: Property) => {

        return <>
            {properties.length ? (
                <div className="flex flex-wrap gap-1.5">
                    {properties.map(property => {
                        const value = getAttributeValue(property);
                        if (!value) return null;

                        return (
                            <span key={property.id} className="rounded-md bg-surface-container px-2 py-1 text-xs text-on-surface-variant">
                                <span className="font-medium text-on-surface">{property.attributeDefinition?.name ?? "Atributo"}:</span> {value}
                            </span>
                        );
                    })}
                </div>
            ) : (
                <span className="text-on-surface-variant">Sin atributos</span>
            )}
        </>
    },

    Price: (basePrice: string, discount: number) => {

        const price = Number(basePrice);
        const hasDiscount = Number.isFinite(price) && Number.isFinite(discount) && discount > 0;
        const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

        return (
            <>
                <span className="font-medium text-on-surface">{formatPrice(finalPrice)}</span>
                {hasDiscount && (
                    <span className="ml-2 text-xs line-through">{formatPrice(price)}</span>
                )}
            </>
        )
    },

    // Stock: (stockQuantity: number, minStock: number | null) => {



    //     return (
    //         <>
    //             <span className="font-medium text-on-surface">{stockQuantity}</span>
    //             <span className="ml-1 text-xs ">un.</span>
    //             {minStock !== null && (
    //                 <div className="mt-1 text-xs">Mínimo: {minStock}</div>
    //             )}
    //         </>
    //     )
    // },

    Status: (recordStatus: RecordStatusDb, inventoryStatus: InventoryStatusTypeDb, saleStatus: SaleStatusTypeDb) => {

            return (
            <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-1.5">
                    <span className="text-text-muted">Registro:</span>
                    <RecordStatusBadge status={recordStatus} />
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="text-text-muted">Inventario:</span>
                    {/* Badge de inventario */}
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="text-text-muted">Comercial:</span>
                    <SaleStatusBadge status={saleStatus} />
                </div>
            </div>
        );
        
    }
}

const getAttributeValue = (property: Property[number]) => {
    if (property.valueText !== null) return property.valueText;
    if (property.valueNumber !== null) return String(property.valueNumber);
    if (property.valueBoolean !== null) return property.valueBoolean ? "Sí" : "No";
    if (property.valueDate !== null) return new Date(property.valueDate).toLocaleDateString("es-PE");

    if (property.valueOptionIds.length) {
        const options = new Map(
            (property.attributeDefinition?.systemAttributeValue ?? []).map(option => [option.id, option.value])
        );
        return property.valueOptionIds.map(id => options.get(id) ?? `#${id}`).join(", ");
    }

    return null;
};
