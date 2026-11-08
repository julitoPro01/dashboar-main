import { VariantListItemResponse } from "@/src/features/products/types"
import { CellObjs } from "../Columns"

interface Props extends CellObjs {
    data: VariantListItemResponse["attributes"]
}

export const AttributeCell = ({data}:Props) => {
  return <>
            {data.length ? (
                <div className="flex flex-wrap gap-1.5">
                    {data.map(attr => {
                        const value = getAttributeValue(attr);
                        if (!value) return null;

                        return (
                            <span key={attr.id} className="rounded-md bg-surface-container px-2 py-1 text-xs text-on-surface-variant">
                                <span className="font-medium text-on-surface">{attr.attributeDefinition?.name ?? "Atributo"}:</span> {value}
                            </span>
                        );
                    })}
                </div>
            ) : (
                <span className="text-on-surface-variant">Sin atributos</span>
            )}
        </>
}


const getAttributeValue = (attr: VariantListItemResponse["attributes"][number]) => {
    if (attr.valueText !== null) return attr.valueText;
    if (attr.valueNumber !== null) return String(attr.valueNumber);
    if (attr.valueBoolean !== null) return attr.valueBoolean ? "Sí" : "No";
    if (attr.valueDate !== null) return new Date(attr.valueDate).toLocaleDateString("es-PE");

    if (attr.valueOptionIds.length) {
        const options = new Map(
            (attr.attributeDefinition?.systemAttributeValue ?? []).map(option => [option.id, option.value])
        );
        return attr.valueOptionIds.map(id => options.get(id) ?? `#${id}`).join(", ");
    }

    return null;
};
