import { RecordStatusBadge } from "@/src/shared/domains/recordStatus";
import { VariantListItemResponse } from "../types";

interface Props {
    variants: VariantListItemResponse[];
}

const formatPrice = (value: unknown) => {
    const amount = Number(value);

    if (!Number.isFinite(amount)) return "—";

    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

const getAttributeValue = (attribute: VariantListItemResponse["varianAttributesValue"][number]) => {
    if (attribute.valueText !== null) return attribute.valueText;
    if (attribute.valueNumber !== null) return String(attribute.valueNumber);
    if (attribute.valueBoolean !== null) return attribute.valueBoolean ? "Sí" : "No";
    if (attribute.valueDate !== null) return new Date(attribute.valueDate).toLocaleDateString("es-PE");

    if (attribute.valueOptionIds.length) {
        const options = new Map(
            (attribute.attributeDefinition?.systemAttributeValue ?? []).map(option => [option.id, option.value])
        );
        return attribute.valueOptionIds.map(id => options.get(id) ?? `#${id}`).join(", ");
    }

    return null;
};

export const ListVariant = ({ variants }: Props) => {
    if (variants.length === 0) {
        return (
            <div className="rounded-lg border border-border bg-surface-container-lowest px-6 py-12 text-center">
                <p className="font-medium text-on-surface">No hay variantes para mostrar</p>
                <p className="mt-1 text-sm text-on-surface-variant">Las variantes de este producto aparecerán aquí.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface-container-lowest">
            <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                <thead className="bg-surface-container-low text-xs uppercase tracking-wide text-on-surface-variant">
                    <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Variante</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Atributos</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Precio</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Stock</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {variants.map(variant => {
                        const price = Number(variant.price);
                        const discount = Number(variant.discount ?? 0);
                        const hasDiscount = Number.isFinite(price) && Number.isFinite(discount) && discount > 0;
                        const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

                        return (
                            <tr key={variant.id} className="align-top hover:bg-surface-container-low/60">
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono font-semibold text-on-surface">{variant.sku}</span>
                                        {variant.isMainVariant && (
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                Principal
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    {variant.varianAttributesValue.length ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {variant.varianAttributesValue.map(attribute => {
                                                const value = getAttributeValue(attribute);
                                                if (!value) return null;

                                                return (
                                                    <span key={attribute.id} className="rounded-md bg-surface-container px-2 py-1 text-xs text-on-surface-variant">
                                                        <span className="font-medium text-on-surface">{attribute.attributeDefinition?.name ?? "Atributo"}:</span> {value}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <span className="text-on-surface-variant">Sin atributos</span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <span className="font-medium text-on-surface">{formatPrice(finalPrice)}</span>
                                    {hasDiscount && (
                                        <span className="ml-2 text-xs text-on-surface-variant line-through">{formatPrice(price)}</span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <span className="font-medium text-on-surface">{variant.stockQuantity}</span>
                                    <span className="ml-1 text-xs text-on-surface-variant">un.</span>
                                    {variant.minStock !== null && (
                                        <div className="mt-1 text-xs text-on-surface-variant">Mínimo: {variant.minStock}</div>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <RecordStatusBadge status={variant.recordStatus.name} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
