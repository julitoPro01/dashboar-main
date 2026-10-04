
"use client";

import { Input } from "@/src/shared/form";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { IoCubeOutline } from "react-icons/io5";
import { VariantForm } from "../../../types";

interface VariantInventoryProps {
    stock?: number;
    minimumStock?: number;
    warehouse?: string;
}

export const Inventory = ({
    warehouse = "Almacén Central Lima - Estante B4 (Rack 02)",
}: VariantInventoryProps) => {

    const { control, register } = useFormContext<VariantForm>();
    const { errors } = useFormState({ control, name: "inventory" });
    const inventory = useWatch({ control, name: "inventory" });

    const stock = Number.isFinite(inventory?.stockQuantity) ? inventory?.stockQuantity! : 0;
    const minimumStock = Number.isFinite(inventory?.minStock) ? inventory?.minStock! : 0;

    const healthy = stock > minimumStock;

    return (
        <section className="space-y-6">

            {/* Section header */}
            <div className="flex items-center justify-between">

                <h3 className="flex items-center gap-3 text-text font-semibold">
                    <IoCubeOutline
                        size={18}
                        className="text-primary"
                    />

                    <span>
                        3. Inventario y control de existencias
                    </span>
                </h3>

                <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium
                             ${healthy
                            ? "border-border-select  text-primary"
                            : "border-amber-200  text-amber-600 dark:text-amber-500"
                        }`}
                >
                    {healthy ? "Saludable" : "Stock bajo"}
                </span>

            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4">

                {/* Initial stock */}

                <Input
                    max={1000000}
                    min={0}

                    type="number"
                    placeholder="10"
                    label="Stock inicial disponible"
                    labelOption={{ type: "top-floating", required:true, description: " Unidades física listas" }}
                    roundedSize="sm"
                    error={errors.inventory?.stockQuantity?.message}
                    {...register("inventory.stockQuantity", { valueAsNumber: true })}
                />

                {/* Minimum stock */}
                <div>

                    <Input
                        type="number"
                        max={1000}
                        min={0}
                        placeholder="0"
                        label="Umbral mínimo de alerta"
                        labelOption={{ type: "top-floating" }}
                        roundedSize="sm"
                        error={errors.inventory?.minStock?.message}
                        {...register("inventory.minStock", {
                            setValueAs: (value) => {
                                if (value === "") return undefined;

                                const number = Number(value);

                                return Number.isNaN(number) ? undefined : number;
                            },
                        })}
                    />
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 block" >Dispara aviso de reposición</p>
                </div>

            </div>

            {/* Warehouse */}
            {/* //-------- */}

        </section>
    );
};
