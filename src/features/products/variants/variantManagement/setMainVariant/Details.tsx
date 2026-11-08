import { SelectedVariant } from "@/src/store/variantSlice";

interface Props{sku:string, properties:SelectedVariant["properties"]}

export const Details = ({ properties,sku }: Props) => (
    <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
            <span className="text-text-muted">SKU</span>
            <strong className="font-mono text-text">{sku}</strong>
        </div>

        {properties.map((property) => {
            const value = getVariantPropertyValue(property);
            if (!value) return null;

            return (
                <div key={property.id} className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">
                        {property.attributeDefinition?.name ?? "Opción"}
                    </span>
                    <strong className="text-right text-text">{value}</strong>
                </div>
            );
        })}
    </div>
);



const getVariantPropertyValue = (property: SelectedVariant["properties"][number]) => {
    if (property.valueText !== null) return property.valueText;
    if (property.valueNumber !== null) return String(property.valueNumber);
    if (property.valueBoolean !== null) return property.valueBoolean ? "Sí" : "No";
    if (property.valueDate !== null) {
        return new Date(property.valueDate).toLocaleDateString("es-PE");
    }

    if (property.valueOptionIds.length) {
        const options = new Map(
            (property.attributeDefinition?.systemAttributeValue ?? []).map((option) => [option.id, option.value]),
        );

        return property.valueOptionIds.map((id) => options.get(id) ?? `#${id}`).join(", ");
    }

    return null;
};
