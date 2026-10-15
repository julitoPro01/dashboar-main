import { VariantForm } from "@/src/features/products/types";
import { Input } from "@/src/shared/form";
import { useFormContext } from "react-hook-form"

export const IdentifiersFields = () => {

    const { register } = useFormContext<VariantForm>();

    return (
        <>
            <Input
                readOnly
                // placeholder="PRD-8KL783"
                placeholder=" "
                label="SKU"
                roundedSize="sm"
                labelOption={{ type: "top-floating", description: "Identificador universal único" }}
                {...register("commercialInfo.sku")}
            />

            <Input
                readOnly
                disabledLabel
                placeholder=" "
                label="Código de barras"
                id="codigo-de-barras"
                roundedSize="sm"
                labelOption={{ type: "top-floating", description: "Opcional · EAN / UPC / GTIN " }}
                {...register("commercialInfo.barCode")}
            />
        </>
    )
}
