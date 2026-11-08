import { useStore } from "@/src/store/useStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { useRouter } from "next/navigation";
import { useCreateVariant, useSystemAttributes } from "../../../shared/hooks";
import { variantFormSchema, VariantForm as VForm } from "../../../types";
import { VariantForm } from "../../../shared/components/variant-form";
import { INVENTORY_POLICY, PUBLICATION_STATUS, SALE_STATUS } from "../../../shared/catalog";
import { mapSystemAttributesToDb } from "../../../shared/helpers";

export const CreateVariant = () => {

    const router = useRouter();

    const user = useBootDataStore(v => v.user);

    const { category, id } = useStore(v => v.variantBaseProduct)!;

    const { getAttributes, isLoading } = useSystemAttributes({ categoryId: category.id, entity: "variant", id: undefined });


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
                    recordStatusId:  RECORD_STATUS_ID.DRAFT,
                    saleStatus: SALE_STATUS.COMING_SOON,
                    inventoryPolicy: {
                        type: INVENTORY_POLICY.AUTO_DECREMENT,
                        stockQuantity: 0,
                        minStock: undefined
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

        const { basePrice, discount, discountStartsAt,discountEndsAt } = val.commercialInfo!;
        //---
        const { storeFront, physicalStore, wholesale, marketplace } = val.distributionChannels;
        

        const res = await mutateAsync({
            productId: id,

            recordStatusId,
            inventoryPolicy: inventoryPolicy.type,
            saleStatus,

            stockQuantity: inventoryPolicy.stockQuantity,
            minStock: inventoryPolicy.minStock,
            discountStartsAt:discountStartsAt,
            discountEndsAt:discountEndsAt,

            price: basePrice,
            discount: discount,

            tags: undefined,

            images: val.images,

            systemAttributes: mapSystemAttributesToDb(val.categorization.systemAttributes),

            distributionChannels: { storeFront, physicalStore, wholesale, marketplace },
            
        });

        if (!res.ok) return;

        form.reset();

        router.refresh();
    }

    return (
        <VariantForm form={form} onSubmit={handleSubmit} isLoading={isLoading}/>
    )
}
