import { useFormContext, useWatch } from "react-hook-form";
import { CategorizationForm } from "../../../types";
import { useSystemAttributes } from "./useSystemAttributes";
import { useEffect, useRef } from "react";


type Props = { isEdit?: boolean, entity: "product" | "variant", id?:number }

export const useRegisterSystemAttributes = (props: Props) => {

    const { setValue, control } = useFormContext<CategorizationForm>();

    const originalRef = useRef<CategorizationForm["categorization"]["systemAttributes"]>([]);

    const categoryId = useWatch({ control, name: "categorization.category.id" });

    const { getAttributes } = useSystemAttributes({
        categoryId: categoryId,
        entity: props.entity,
        id: props.id

    });

    const handleLoadAttributes = async () => {

        const attributes = await getAttributes();

        const mapped = attributes.map(v => ({
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

        if (props.isEdit)
            originalRef.current = mapped;

        setValue("categorization.systemAttributes", mapped, {
            shouldDirty: false,
            shouldValidate: false
        })

    };


    useEffect(() => {
        if (categoryId)
            handleLoadAttributes()
        else
            setValue("categorization.systemAttributes", [], {
                shouldDirty: false,
                shouldValidate: false
            })

    }, [categoryId])

    return {
        original: originalRef
    }
}
