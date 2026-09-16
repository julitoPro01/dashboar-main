
"use client";

import { Select } from "@/src/shared/form";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

interface VariantOperationalStatusProps {
    recordStatus?: string;
    salesChannel?: string;
    inventoryPolicy?: string;
}

export const OperationalStatus = ({
    recordStatus = "Activo",
    salesChannel = "Disponible en canal web",
    inventoryPolicy = "Descontar stock automático",
}: VariantOperationalStatusProps) => {

    return (
        <section className="space-y-3">

            {/* Section header */}
            <h3 className="flex items-center gap-3 text-text font-semibold">
                <IoShieldCheckmarkOutline
                    size={18}
                    className="text-primary"
                />

                <span>
                    5. Estados operativos independientes
                </span>
            </h3>

            <div className="space-y-2 text-sm">

                {/* Record status */}
                <div className="flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
                    <div className="min-w-0">
                        <span className="block text-sm font-semibold text-primary">
                            Estado del registro
                        </span>

                        <span className="block text-xs text-text-muted">
                            Control de ciclo de vida interno
                        </span>
                    </div>

                    <Select
                        fieldSize="sm"
                        options={[]}
                        roundedSize="sm"
                    />
                </div>

                {/* Sales channel */}
                <div className="flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
                    <div className="min-w-0">
                        <span className="block text-sm font-semibold text-primary">
                            Canal de comercialización
                        </span>

                        <span className="block text-xs text-text-muted">
                            Visibilidad storefront
                        </span>
                    </div>

                    <Select
                        fieldSize="sm"
                        options={[]}
                        roundedSize="sm"
                    />
                </div>


                {/* Inventory policy */}
                <div className="flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
                    <div className="min-w-0">
                        <span className="block text-sm font-semibold text-primary">
                            Régimen de inventario
                        </span>

                        <span className="block text-xs text-text-muted">
                            Política de stock
                        </span>
                    </div>

                    <Select
                        fieldSize="sm"
                        options={[]}
                        roundedSize="sm"
                    />
                </div>
             

            </div>

        </section>
    );
};
