import { VariantForm } from "@/src/features/products/types";
import { Input } from "@/src/shared/form";
import { useFormContext } from "react-hook-form"

export const IdentifiersFields = () => {

    const { register } = useFormContext<VariantForm>();

    return (
        <>
            <Input
                custom={{
                    label: "SKU",
                    roundedSize: "sm",
                    labelPosition: "top-floating",
                    description: "Identificador universal único",
                    descrPosition:"bottom",
                    labelBg:"bg-surface"
                }}
                readOnly
                // placeholder="PRD-8KL783"
                placeholder=" "
                {...register("commercialInfo.sku")}
            />

            <Input
                custom={{
                    label: "Código de barras",
                    disabledLabel: true,
                    roundedSize: "sm",
                    labelPosition: "top-floating",
                    description: "Opcional · EAN / UPC / GTIN ",
                    labelBg:"bg-surface",
                    descrPosition:"bottom"
                }}
                readOnly
                placeholder=" "
                id="codigo-de-barras"
                {...register("commercialInfo.barCode")}
            />
        </>
    )
}
