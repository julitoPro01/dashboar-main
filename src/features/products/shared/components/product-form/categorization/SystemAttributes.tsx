import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form"

import Masonry from 'react-masonry-css';

import { MultiSelect } from "@/src/shared/form";
import { CATEGORY_ATTR_GROUP_LABEL } from "@/src/features/attributes/category-attributes/constants";
import { MdOutlineInfo } from "react-icons/md";
import { CategorizationForm } from "@/src/features/products/types";
import { ATTRIBUTE_INPUT_CONFIG } from "@/src/features/products/constants";
import { AttributeField } from '../attribute-field/AttributeField';



export const SystemAttributes = () => {


    const { register,control } = useFormContext<CategorizationForm>()
    const systemAttributes = useWatch({ control, name: "categorization.systemAttributes" }) ?? [];
    const { errors } = useFormState({ control })

    const hasNotAttributes = systemAttributes?.length < 1;

    if(hasNotAttributes)
        return null;

    return (
        <>

            <div className=" flex items-start gap-2.5 rounded-md border border-primary/20 bg-primary-light/10 px-3 py-2.5">
                <MdOutlineInfo
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                />

                <p className="text-sm leading-5 text-text-muted">
                    Completa las{" "}
                    <strong className="font-semibold text-text">
                        propiedades definidas para la categoría
                    </strong>{" "}
                    de este producto.
                </p>
            </div>

            <Masonry
                breakpointCols={breakpointColumns}
                className="flex gap-4 "
                columnClassName="masonry-column">
                {
                    systemAttributes?.map((group, gi) => {
                        return (
                            <section key={group.group} className={`px-8 py-6 flex flex-col space-y-5`}>

                                <div className="flex items-center gap-3 pb-3 border-b border-border text-primary">
                                    <div className="w-full">
                                        <p className="flex-1 text-text-muted font-semibold text-sm">
                                            {CATEGORY_ATTR_GROUP_LABEL[group.group]}
                                        </p>
                                    </div>
                                </div>


                                {
                                    group.attributes.map((attr, i) => {
                                        const type = ATTRIBUTE_INPUT_CONFIG[attr.dataType].input;
                                        if (type !== "multiselect")
                                            return <AttributeField key={attr.attributeDefinitionId}
                                                inputType={ATTRIBUTE_INPUT_CONFIG[attr.dataType].input}
                                                attr={attr}
                                                register={register}
                                                error={errors.categorization?.systemAttributes?.[gi]?.attributes?.[i]}
                                                index={i}
                                                groupIndex={gi}
                                            />
                                        else
                                            return <Controller key={attr.attributeDefinitionId}
                                                control={control}
                                                name={`categorization.systemAttributes.${gi}.attributes.${i}.valueOptionIds`}
                                                render={({ field, fieldState }) => (
                                                    <MultiSelect
                                                        id={attr.attributeDefinitionId.toString()}
                                                        label={attr.name}
                                                        labelOption={{ type: "top", required: attr.isRequired }}
                                                        options={attr.systemAttributeValues?.map(v => ({
                                                            id: v.id,
                                                            label: v.value,
                                                        })) ?? []}
                                                        value={field.value ?? []}
                                                        onChange={field.onChange}
                                                        error={fieldState.error?.message}
                                                        fieldSize="sm"
                                                    />
                                                )}
                                            />

                                    })
                                }
                            </section>
                        )
                    })
                }
            </Masonry>

        </>


    )
}


const breakpointColumns = {
    default: 2,    // 4 columnas en desktop
    1024: 2,       // 3 columnas en tablets grandes
    768: 2,        // 2 columnas en tablets
    640: 1         // 1 columna en móviles
};
