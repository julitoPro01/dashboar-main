import { Button } from "@/src/shared/components/btn"
import { useFieldArray, useFormContext, useFormState } from "react-hook-form"
import { MdPostAdd, MdTune } from "react-icons/md"
import { ProductFormData } from "../../../types"
import { CustomAttributeField } from './...attribute/CustomAttributeField';
import { FormCard } from "@/src/shared/form";

export const CustomAttributes = () => {

    const { register, control } = useFormContext<ProductFormData>();

    const { append, remove, fields } = useFieldArray({ control, name: "customAttributes" });

    const { errors, dirtyFields } = useFormState({ control, name: "customAttributes" });

    const customLength = fields.length;

    const handleAddCustomAttribute = () => {
        if (customLength >= 10) return

        append({
            customName: "",
            valueText: "",
        });
    };


    return (
        <FormCard
            description="Agrega una propiedad personalizada exclusiva para este producto cuando no encuentres una propiedad adecuada en su categoría."
            titleIcon={<MdTune />}
            title={
                <div className="inline-flex items-center gap-4 justify-between w-full">
                    <span className="block"> Propiedades personalizados

                    </span>
                    <span className="rounded-full bg-bg-soft-blue mx-2 px-3 py-1 text-xs font-medium text-primary">
                        {customLength} / 10
                    </span>
                </div>
            }>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {
                    fields.map((v, i) => {

                        return <CustomAttributeField
                            key={v.id}
                            index={i}
                            register={register}
                            onRemove={() => remove(i)}
                            error={errors.customAttributes?.[i]}
                            dirty={dirtyFields.customAttributes?.[i]}
                        />
                    }
                    )
                }
                <div>
                    <Button variant="secondary" disabled={customLength >= 10}
                        onClick={handleAddCustomAttribute}>
                        <MdPostAdd size={22} />
                    </Button>
                </div>
            </div>
        </FormCard>
    )
}
