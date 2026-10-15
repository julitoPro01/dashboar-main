import { VariantForm } from "@/src/features/products/types";
import { Input } from "@/src/shared/form";
import { useFormContext, useFormState } from "react-hook-form"

export const PricingFields = () => {

    const { register, control } = useFormContext<VariantForm>();
    const { errors, dirtyFields } = useFormState({ control, name: "commercialInfo" });

    return (
        <>
            <Input
                type="number"
                min={0}
                step={0.01}

                placeholder="50.00"
                label="Precio base regular"

                labelOption={{ type: "top-floating", required: true }}
                roundedSize="sm"
                fieldIcon={"S/"}
                fieldClass="ps-8"
                error={errors.commercialInfo?.basePrice?.message}
                isDirty={dirtyFields.commercialInfo?.basePrice}
                {...register("commercialInfo.basePrice", { valueAsNumber: true })}
            />

            <Input
                type="number"
                max={100}
                min={0}
                placeholder="0"
                label="Descuento aplicado"
                iconPosition="right"
                fieldIcon="%"
                roundedSize="sm"
                labelOption={{ type: "top-floating" }}
                error={errors.commercialInfo?.discount?.message}
                isDirty={dirtyFields.commercialInfo?.discount}
                {...register("commercialInfo.discount", {
                    setValueAs: (value) => {
                        if (value === "") return undefined;

                        const number = Number(value);

                        return Number.isNaN(number) ? undefined : number;
                    },
                })}
            />
        </>
    )
}
