import { INVENTORY_POLICY, SALE_STATUS_BY_INVENTORY_POLICY, SALE_STATUS_OPTIONS } from "@/src/features/products/constants"
import { VariantForm } from "@/src/features/products/types"
import { Select } from "@/src/shared/form"
import { useFormContext, useFormState, useWatch } from "react-hook-form"
import { getSaleStatusOptionsByInventoryPolicy, SALE_STATUS } from '../../../../constants/saleStatus';
import { useEffect } from "react";

export const SaleStatus = () => {

    const { register, control, trigger } = useFormContext<VariantForm>()
    const { errors, dirtyFields, } = useFormState({ control, name: "operationStatus.saleStatus" });

    const inventoryPolicy = useWatch({ control, name: "operationStatus.inventoryPolicy.type" })


    return (
        <div className="grid grid-cols-3 items-center gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
            <div className="col-span-1">
                <span className="block text-sm font-semibold text-primary">
                    Estado de venta
                </span>

                <span className="block text-xs text-text-muted">
                    Indica la disponibilidad comercial de la variante
                </span>
            </div>
            <div className="col-span-2">
                <Select
                    isValueSelected
                    fieldSize="sm"
                    options={getSaleStatusOptionsByInventoryPolicy(inventoryPolicy)}
                    roundedSize="sm"
                    fieldClass="bg-surface-black"
                    positionError="floating"
                    error={errors.operationStatus?.saleStatus?.message}
                    isDirty={dirtyFields.operationStatus?.saleStatus}
                    {...register("operationStatus.saleStatus")}
                />
            </div>
        </div>
    )
}
