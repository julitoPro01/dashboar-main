
import { Controller, FieldPath, useFormContext, useFormState } from "react-hook-form";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { VariantForm } from "../../../types";
import { SystemaAttributeItemCard } from "../SystemaAttributeItemCard";
import { CATEGORY_ATTR_GROUP_LABEL } from "@/src/features/attributes/category-attributes/constants";
import { ATTRIBUTE_INPUT_CONFIG } from "../../../constants";
import { CheckboxField, NumberField, SelectField, TextareaField, TextField } from "../SystemAttributeField";
import { FIELD_STYLE, MultiSelect } from "@/src/shared/form";
import { VariantTaxonomyContext } from "./system-properties/VariantTaxonomyContext";


export const SystemProperties = () => {

    return (
        <section className="space-y-3 w-full">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-3 font-semibold text-text">
                    <HiOutlineColorSwatch
                        size={18}
                        className="text-primary"
                    />
                    <span>
                        1. Propiedades de la variante
                    </span>
                </h3>

            </div>

            {/* Taxonomy context */}
            <VariantTaxonomyContext />
            {/* Properties  */}
            <Properties />

        </section>
    );
};


const Properties = () => {

    const { control, getValues, register } = useFormContext<VariantForm>();

    const { errors, dirtyFields } = useFormState({ control, name: "categorization.systemAttributes" });

    const attrs = getValues("categorization.systemAttributes");


    return (
        <div className="rounded-md border border-border-input">

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
                                    const nameField: FieldPath<VariantForm> = `categorization.systemAttributes.${gi}.attributes.${i}`;

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
                                            {...register(`${nameField}.valueNumber`, { valueAsNumber: true })}
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
                                            {...register(`${nameField}.valueNumber`, { valueAsNumber: true })}
                                        />

                                    else if (type === "multiselect")
                                        return <div key={attr.attributeDefinitionId}>

                                            <Controller
                                                control={control}
                                                name={`categorization.systemAttributes.${gi}.attributes.${i}.valueOptionIds`}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <div className="flex items-center px-4 py-1.5 min-h-10">
                                                        <span className={` w-1/3 shrink-0 text-sm font-medium text-text
                                                                        ${attr.isRequired && FIELD_STYLE.validation["*"]} `}
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