import { Control, Controller, FieldPath, useFormContext, UseFormRegister, useFormState, useWatch } from "react-hook-form"

import { FIELD_STYLE, MultiSelect } from "@/src/shared/form";
import { CATEGORY_ATTR_GROUP_LABEL } from "@/src/features/attributes/category-attributes/constants";
import { CategorizationForm } from "@/src/features/products/types";
import { ATTRIBUTE_INPUT_CONFIG } from "@/src/features/products/constants";
import { CheckboxField, NumberField, SelectField, TextareaField, TextField } from '../../SystemAttributeField';
import { useEffect } from "react";
import { useStore } from "@/src/store/useStore";
import { useDebounced } from "@/src/shared/hooks";
import { SystemaAttributeItemCard } from "../../SystemaAttributeItemCard";
import { mapSystemAttributesToView } from "../../../helpers";

export const SystemProperties = () => {


    const { register, control } = useFormContext<CategorizationForm>()

    const systemAttributes = useWatch({ control, name: "categorization.systemAttributes" });

    const setProperties = useStore(v => v.setProductProperties);


    const debounce = useDebounced({
        delay: 1000,
        onAction(systemAttributes) {
            const systemProps = mapSystemAttributesToView(systemAttributes)
            setProperties(systemProps)
        }
    })

    useEffect(() => {
        debounce(systemAttributes)
    }, [systemAttributes])


    const hasNotAttributes = systemAttributes ? systemAttributes?.length < 1 : 0;
    if (hasNotAttributes)
        return null;


    return (
        <>

            <div className=" rounded-md   border border-border-input">
                {/* Header */}
                <div className=" gap-2 border-b border-border-input bg-bg-soft-blue px-4 py-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                            Propiedades del producto
                        </span>

                        <span className="ml-auto text-xs text-text-muted">
                            Definidas por el sistema
                        </span>
                    </div>

                    <p className="text-[13.5px] mt-2 leading-5 text-text-muted">

                        Completa las{" "}
                        <strong >
                            propiedades definidas para la categoría
                        </strong>{" "}
                        de este producto.
                    </p>
                </div>

                {/* Groups */}
                <Properties control={control} register={register} attrs={systemAttributes} />
            </div>


        </>

    )
}


interface AttrsProps {
    register: UseFormRegister<CategorizationForm>;
    attrs: CategorizationForm["categorization"]["systemAttributes"];
    control: Control<CategorizationForm>
}

const Properties = ({ attrs, register, control }: AttrsProps) => {

    const { errors, dirtyFields } = useFormState({ control, name: "categorization.systemAttributes" })


    return (
        <div>

            {
                attrs?.map((group, gi) => {

                    return (
                        <SystemaAttributeItemCard key={group.group} groupName={CATEGORY_ATTR_GROUP_LABEL[group.group]}>

                            {
                                group.attributes.map((attr, i) => {

                                    const type = ATTRIBUTE_INPUT_CONFIG[attr.dataType].input;
                                    const id = attr.attributeDefinitionId.toString();
                                    const error = errors.categorization?.systemAttributes?.[gi]?.attributes?.[i];
                                    const dirty = dirtyFields.categorization?.systemAttributes?.[gi]?.attributes?.[i];
                                    const nameField: FieldPath<CategorizationForm> = `categorization.systemAttributes.${gi}.attributes.${i}`;

                                    if (type === "text")
                                        return <TextField
                                            key={id}
                                            id={id}
                                            error={error?.valueText?.message}
                                            isDirty={dirty?.valueText}
                                            isRequired={attr.isRequired}
                                            label={attr.name}
                                            dataType={attr.dataType}
                                            {...register(`${nameField}.valueText`)}
                                        />

                                    else if (type === "number")
                                        return <NumberField
                                            key={id}
                                            id={id}
                                            error={error?.valueNumber?.message}
                                            isDirty={dirty?.valueNumber}
                                            isRequired={attr.isRequired}
                                            label={attr.name}
                                            dataType={attr.dataType}
                                            {...register(`${nameField}.valueNumber`,{valueAsNumber:true})}
                                        />

                                    else if (type === "checkbox")
                                        return <CheckboxField
                                            key={id}
                                            id={id}
                                            error={error?.valueBoolean?.message}
                                            isDirty={dirty?.valueBoolean}
                                            isRequired={attr.isRequired}
                                            label={attr.name}
                                            dataType={attr.dataType}
                                            {...register(`${nameField}.valueBoolean`)}
                                        />

                                    else if (type === "textarea")
                                        return <TextareaField
                                            key={id}
                                            id={id}
                                            error={error?.valueText?.message}
                                            isDirty={dirty?.valueText}
                                            isRequired={attr.isRequired}
                                            label={attr.name}
                                            dataType={attr.dataType}
                                            {...register(`${nameField}.valueText`)}
                                        />

                                    else if (type === "select")
                                        return <SelectField
                                            key={id}
                                            id={id}
                                            error={error?.valueNumber?.message}
                                            isDirty={dirty?.valueNumber}
                                            isRequired={attr.isRequired}
                                            label={attr.name}
                                            dataType={attr.dataType}
                                            systemAttributeValues={attr.systemAttributeValues?.map(v => ({ value: v.id, label: v.value }))}
                                            valueNumber={attr.valueNumber}
                                            {...register(`${nameField}.valueNumber`,{valueAsNumber:true})}
                                        />

                                    else if (type === "multiselect")
                                        return <div key={attr.attributeDefinitionId} >
                                            <Controller
                                                control={control}
                                                name={`categorization.systemAttributes.${gi}.attributes.${i}.valueOptionIds`}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <div className="flex items-center px-4 py-1.5 min-h-10">
                                                        <span
                                                            className={` w-1/3 shrink-0
                                                                        text-sm font-medium text-text
                                                                        ${attr.isRequired && FIELD_STYLE.validation["*"]}
                                                                    `}
                                                        >
                                                            {attr.name}
                                                        </span>
                                                        <MultiSelect
                                                            id={attr.attributeDefinitionId.toString()}
                                                            isDirty={fieldState.isDirty}
                                                            options={
                                                                attr.systemAttributeValues?.map(
                                                                    (v) => ({
                                                                        id: v.id,
                                                                        label: v.value,
                                                                    })
                                                                ) ?? []
                                                            }
                                                            value={field.value ?? []}
                                                            onChange={field.onChange}
                                                            error={
                                                                fieldState.error?.message
                                                            }
                                                            fieldSize="sm"
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                })
                            }
                        </SystemaAttributeItemCard>
                    )
                })
            }
        </div>
    )
}

