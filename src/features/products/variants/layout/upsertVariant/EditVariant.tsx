import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { INVENTORY_POLICY, PUBLICATION_STATUS, SALE_STATUS } from "../../../constants";
import { VariantForm } from "../../../shared/components/variant-form";
import { useStore } from "@/src/store/useStore";
import { useSystemAttributes } from "../../../shared/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { variantFormSchema, VariantForm as VForm } from "../../../types";

interface Props {
    variantId: number
}

export const EditVariant = ({ variantId }: Props) => {

    const { category } = useStore(v => v.variantBaseProduct)!;

    const { getAttributes } = useSystemAttributes({ categoryId: category.id, entity: "variant", id: variantId });

    const form = useForm<VForm>({
        resolver: zodResolver(variantFormSchema),
        mode: "onChange",
        defaultValues: async () => {

            const data = await getAttributes();

            const mapped = data.map(v => ({
                group: v.group,
                attributes: v.attributes.map(v => ({
                    attributeDefinitionId: v.attributeDefinitionId,
                    dataType: v.dataType,
                    name: v.name,
                    systemAttributeValues: v.systemAttributeValues,

                    valueText: v.valueText,
                    valueNumber: v.valueNumber,
                    valueBoolean: v.valueBoolean,
                    valueDate: v.valueDate,
                    valueOptionIds: v.valueOptionIds,

                    isRequired: v.isRequired
                }))
            }))

            return {
                categorization: {
                    category,
                    systemAttributes: mapped
                },
                commercialInfo: undefined,
                images: [],
                operationStatus: {
                    recordStatusId: RECORD_STATUS_ID.DRAFT,
                    saleStatus: SALE_STATUS.COMING_SOON,
                    inventoryPolicy: {
                        type: INVENTORY_POLICY.AUTO_DECREMENT,
                        stockQuantity: 0,
                        minStock: 0
                    }
                },
                distributionChannels: {
                    storeFront: { publicationStatus: PUBLICATION_STATUS.ACTIVE },
                    marketplace: { publicationStatus: PUBLICATION_STATUS.DRAFT },
                    physicalStore: { publicationStatus: PUBLICATION_STATUS.DRAFT },
                    wholesale: { publicationStatus: PUBLICATION_STATUS.DRAFT },
                }
            }
        }

    });

    console.log("variant form")

    const handleSubmit = () => {

    }

    return (
        <VariantForm form={form} onSubmit={handleSubmit} />
    )
}
