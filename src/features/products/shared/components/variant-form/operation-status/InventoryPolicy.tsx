import { INVENTORY_POLICY, INVENTORY_POLICY_OPTIONS } from "@/src/features/products/constants";
import { VariantForm } from "@/src/features/products/types";
import { Overlay } from "@/src/shared/components/floating";
import { Input, Select } from "@/src/shared/form"
import { useEffect } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form"

export const InventoryPocily = () => {

    const { register, control, setValue } = useFormContext<VariantForm>();

    const { errors, dirtyFields } = useFormState({ control, name: "operationStatus.inventoryPolicy" });

    const inventoryPolicyType = useWatch({ control, name: "operationStatus.inventoryPolicy.type" });

    const notIncludeInventory = inventoryPolicyType !== INVENTORY_POLICY.AUTO_DECREMENT;

    useEffect(() => {

        setValue("operationStatus.inventoryPolicy.stockQuantity", 0, {
            shouldDirty: true,
            shouldValidate: true
        });

        setValue("operationStatus.inventoryPolicy.minStock", 0, {
            shouldDirty: true,
            shouldValidate: true
        })


    }, [notIncludeInventory])


    return (
        <div>

            <div className="grid grid-cols-3 items-center gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">

                <div className="col-span-3">
                    <span className="block text-sm font-semibold text-primary">
                        Régimen de inventario
                    </span>

                    <span className="block text-xs text-text-muted">
                         Define cómo se gestionan las existencias de la variante
                    </span>
                </div>

                <div className="col-span-2 pb-1">
                    <Select
                        fieldSize="sm"
                        options={INVENTORY_POLICY_OPTIONS}
                        isValueSelected
                        roundedSize="sm"
                        fieldClass="bg-surface-black"
                        positionError="floating"
                        error={errors.operationStatus?.inventoryPolicy?.type?.message}
                        isDirty={dirtyFields.operationStatus?.inventoryPolicy?.type}
                        {...register("operationStatus.inventoryPolicy.type", {

                            // Asignamos la validación dependiente simepre que useForm este en mode:onChange
                            // saleStatus necesita ser validado si el valor en 
                            // inventoryPolicy.type no corresponde.
                            deps: ["operationStatus.saleStatus"]
                        })}
                    />
                </div>

                <div className="relative col-span-3 bg-surface-black px-4 py-1 rounded">


                    < div className="grid grid-cols-2 gap-4 py-4 text-am">

                        {/* Initial stock */}

                        <Input
                            max={1000000}
                            min={0}
                            disabled={notIncludeInventory}
                            type="number"
                            placeholder="10"
                            label="Stock inicial disponible"
                            labelBg="bg-surface-black"
                            labelOption={{ type: "top-floating", required: true, description: " Unidades física listas" }}
                            roundedSize="sm"
                            error={errors.operationStatus?.inventoryPolicy?.stockQuantity?.message}
                            isDirty={dirtyFields.operationStatus?.inventoryPolicy?.stockQuantity}
                            {...register("operationStatus.inventoryPolicy.stockQuantity", { valueAsNumber: true })}
                        />

                        {/* Minimum stock */}
                        <div>

                            <Input
                                type="number"
                                max={1000}
                                min={0}
                                disabled={notIncludeInventory}
                                placeholder="0"
                                label="Umbral mínimo de alerta"
                                labelBg="bg-surface-black"
                                labelOption={{ type: "top-floating" }}
                                roundedSize="sm"
                                error={errors.operationStatus?.inventoryPolicy?.minStock?.message}
                                isDirty={dirtyFields.operationStatus?.inventoryPolicy?.minStock}

                                {...register("operationStatus.inventoryPolicy.minStock", {
                                    setValueAs: (value) => {
                                        if (value === "") return undefined;

                                        const number = Number(value);

                                        return Number.isNaN(number) ? undefined : number;
                                    },
                                })}
                            />
                            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 block" >
                                Dispara aviso de reposición
                            </p>
                        </div>

                    </div>


                    <Overlay
                        open={notIncludeInventory}
                        description="No aplica para esta política"
                    />

                </div>
            </div>


        </div >
    )
}
