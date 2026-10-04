// Función para MAPPEAR a un solo modelo todos los tipos de propiedades

import { ProductProperty } from "@/src/store/productSlice";
import { ATTRIBUTE_INPUT_CONFIG } from "../../constants";
import { CategorizationForm } from "../../types";

export const mapSystemAttributesToView = (
    groups: CategorizationForm["categorization"]["systemAttributes"] = []
): ProductProperty[] => {

    return groups.flatMap((group) =>

        group.attributes.map((attribute) => {
            let value: any = null;

            const { field } = ATTRIBUTE_INPUT_CONFIG[attribute.dataType];

            switch (field) {
                case "valueText":
                    value = attribute.valueText;
                    break;

                case "valueNumber":
                    value = attribute.valueNumber;
                    break;

                case "valueBoolean": {
                    value = attribute.valueBoolean === null ||
                        attribute.valueBoolean === undefined
                        ? null
                        : attribute.valueBoolean
                            ? "Sí"
                            : "No";
                    break;
                }

                case "valueDate": {

                    value = attribute.valueDate
                        ? new Date(attribute.valueDate).toLocaleDateString(
                            "es-PE"
                        )
                        : null; break;
                }

                case "valueOptionIds": {
                    const options = new Map(
                        (attribute.systemAttributeValues ?? []).map(
                            (option) => [option.id, option.value]
                        )
                    );

                    value = attribute.valueOptionIds
                        ?.map((id) => options.get(id))
                        .filter(Boolean)
                        .join(", ") || null;
                    break;
                }
            }

            return {
                id: attribute.attributeDefinitionId,
                label: attribute.name,
                value,
            };
        })
    ).filter(v => !!v.value);
};
