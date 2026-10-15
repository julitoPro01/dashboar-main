import { useStore } from "@/src/store/useStore";
import { VariantForm } from "../../../shared/components/variant-form"
import { useCreateVariant, useSystemAttributes } from "../../../shared/hooks";
import { useForm } from "react-hook-form";
import { VariantForm as VForm, variantFormSchema } from "../../../types"
import { zodResolver } from "@hookform/resolvers/zod";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { INVENTORY_POLICY, PUBLICATION_STATUS, SALE_STATUS, setInventoryStatusByInventoryPolicy } from "../../../constants";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { mapImagesToDb, mapSystemAttributesToDb } from "../../../shared/helpers";

export const CreateVariant = () => {

    const user = useBootDataStore(v => v.user);

    const { category, id } = useStore(v => v.variantBaseProduct)!;

    const { getAttributes } = useSystemAttributes({ categoryId: category.id, entity: "variant", id: undefined });

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
                },
                catalogRules: { isMainVariant: false }
            }
        }

    });

    const { mutateAsync } = useCreateVariant();

    const handleSubmit = async (val: VForm) => {
        if (!user) return;
        //---
        const { recordStatusId, inventoryPolicy, saleStatus } = val.operationStatus;
        const inventoryStatus = setInventoryStatusByInventoryPolicy({ inventoryPolicy: inventoryPolicy.type, stockQuantity: inventoryPolicy.stockQuantity })
        //---
        const { basePrice, discount } = val.commercialInfo!;
        //--- 
        const { isMainVariant } = val.catalogRules;

        const res = await mutateAsync({
            productId: id,
            recordStatusId,
            inventoryPolicy: inventoryPolicy.type,
            saleStatus,
            inventoryStatus,

            stockQuantity: inventoryPolicy.stockQuantity,
            minStock: inventoryPolicy.minStock,

            price: basePrice,
            discount: discount,

            isMainVariant,
            tags: undefined,

            images: mapImagesToDb(val.images),

            systemAttributes:mapSystemAttributesToDb(val.categorization.systemAttributes),
            // Auditoría
            createdBy: user.name,
            createdById: user.id
        });

        if (res.ok) {
            form.reset();
        }

    }

    return (
        <VariantForm form={form} onSubmit={handleSubmit} />
    )
}
