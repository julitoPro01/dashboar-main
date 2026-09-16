
"use client";

import { Input } from "@/src/shared/form";
import { IoCubeOutline } from "react-icons/io5";

interface VariantInventoryProps {
    stock?: number;
    minimumStock?: number;
    warehouse?: string;
}

export const Inventory = ({
    stock = 42,
    minimumStock = 10,
    warehouse = "Almacén Central Lima - Estante B4 (Rack 02)",
}: VariantInventoryProps) => {

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

                <span className="rounded px-2 py-0.5 font-medium text-secondary text-xs bg-bg-select text-primary">
                    {healthy ? "Saludable" : "Stock bajo"}
                </span>

            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4">

                {/* Initial stock */}

                <Input
                    readOnly
                    value={""}
                    placeholder="42"
                    label="Stock inicial disponible"
                    labelOption={{ type: "top-floating", description: " Unidades física listas" }}
                    roundedSize="sm"

                />

                {/* Minimum stock */}

                <Input
                    readOnly
                    value={""}
                    placeholder="10"
                    label="Umbral mínimo de alerta"
                    labelOption={{ type: "top-floating", description: "Dispara aviso de reposición" }}
                    roundedSize="sm"
                />

            </div>

            {/* Warehouse */}
            {/* //-------- */}

        </section>
    );
};
