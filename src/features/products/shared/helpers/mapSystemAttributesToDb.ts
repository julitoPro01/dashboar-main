import { getHasValues } from "@/src/shared/utils/getHasValues";
import { ATTRIBUTE_INPUT_CONFIG } from "../../constants";
import { CategorizationForm } from "../../types";

export const mapSystemAttributesToDb = (system: CategorizationForm["categorization"]["systemAttributes"]) =>
    system
        ?.flatMap(v => v.attributes)
        .map(curr => {
            const { field } = ATTRIBUTE_INPUT_CONFIG[curr.dataType];

            const value: Record<string, any> = {
                valueText: undefined,
                valueNumber: undefined,
                valueBoolean: undefined,
                valueDate: undefined,
                valueOptionIds: undefined,
            };

            switch (field) {
                case "valueText":
                    value.valueText = curr.valueText?.trim() || undefined;
                    break;

                case "valueNumber":
                    value.valueNumber = curr.valueNumber ?? undefined;
                    break;

                case "valueBoolean":
                    value.valueBoolean = curr.valueBoolean ?? undefined;
                    break;

                case "valueDate":
                    value.valueDate = curr.valueDate?.trim() || undefined;
                    break;

                case "valueOptionIds":
                    value.valueOptionIds = curr.valueOptionIds?.length
                        ? curr.valueOptionIds
                        : undefined;
                    break;
            }

            const data = {
                attributeDefinitionId: Object.values(getHasValues(value)).length ? curr.attributeDefinitionId : undefined,
                ...value,
            };
            if (data.attributeDefinitionId)
                return data;
            else return undefined;
        }).filter(Boolean) as [];