import { VariantForm } from "@/src/features/products/types";
import { Input } from "@/src/shared/form";
import { useFormContext, useFormState } from "react-hook-form"

export const PricingFields = () => {

    const { register, control } = useFormContext<VariantForm>();
    const { errors, dirtyFields } = useFormState({ control, name: "commercialInfo" });

    return (
        <>
            <Input
                custom={{
                    label: "Precio base regular",
                    labelPosition: "top-floating",
                    roundedSize: "sm",
                    fieldIcon: "S/",
                    fieldClass: "ps-8",
                    error: errors.commercialInfo?.basePrice?.message,
                    isDirty: dirtyFields.commercialInfo?.basePrice,
                    labelBg:"bg-surface"
                }}
                
                required
                type="number"
                min={0}
                step={0.01}

                placeholder="50.00"
                {...register("commercialInfo.basePrice", { valueAsNumber: true })}
            />

            <Input
                custom={{
                    label: "Descuento aplicado",
                    iconPosition: "right",
                    fieldIcon: "%",
                    roundedSize: "sm",
                    labelPosition: "top-floating",
                    error: errors.commercialInfo?.discount?.message,
                    isDirty: dirtyFields.commercialInfo?.discount,
                    labelBg:"bg-surface"

                }}
                type="number"
                max={100}
                min={0}
                placeholder="0"
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
