import { useFormContext, useFormState, useWatch } from "react-hook-form"

import Masonry from 'react-masonry-css';

import { CATEGORY_ATTR_GROUP_LABEL } from "@/src/features/attributes/category-attributes/constants";

import { ProductFormData } from "../../../types";
import { ATTRIBUTE_INPUT_CONFIG } from "../../../constants";

import { AttributeField } from "./...attribute/AttributeField";


// TODO: APLICAR VALIDACIONES
export const SystemAttributes = () => {

    const { register, control } = useFormContext<ProductFormData>();

    const { errors, dirtyFields } = useFormState({ control, name: "systemAttributes" })

    const attributes = useWatch({ control, name: "systemAttributes" });

    console.log(attributes)
    // Attributos personalizados
    // const customLength = attributes.filter(v => !v.data).length;
   

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumns}
                className="flex gap-4 "
                columnClassName="masonry-column">
                {

                    attributes.map((group, gi) => {
                        return (
                            <section key={group.group} className={`px-8 py-6 flex flex-col space-y-5`}>

                                <div className="flex items-center gap-3 pb-3 border-b border-border text-primary">
                                    <div className="w-full">
                                        <h3 className="flex-1 text-lg font-semibold text-text">
                                            {CATEGORY_ATTR_GROUP_LABEL[group.group]}
                                        </h3>
                                    </div>
                                </div>

                                {
                                    group.data.map((attr, i) => {

                                        return <AttributeField key={attr.attributeDefinitionId}
                                            inputType={ATTRIBUTE_INPUT_CONFIG[attr.dataType].input}
                                            attr={attr}
                                            register={register}
                                            error={errors.systemAttributes?.[gi]?.data?.[i]}
                                            dirty={dirtyFields.systemAttributes?.[gi]?.data?.[i]}
                                            index={i}
                                            groupIndex={gi}
                                        />


                                    })
                                }
                            </section>
                        )
                    })
                }
            </Masonry>

            {/* ATRIBUTOS PERSONALIZADOS */}
           
        </>

    )
}


const breakpointColumns = {
    default: 3,    // 4 columnas en desktop
    1024: 2,       // 3 columnas en tablets grandes
    768: 2,        // 2 columnas en tablets
    640: 1         // 1 columna en móviles
};
const skeleton = [1, 2, 3]
