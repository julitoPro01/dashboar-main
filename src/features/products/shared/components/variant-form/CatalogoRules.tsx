
"use client";

import { Checkbox } from "@/src/shared/form";
import { useState } from "react";
import { IoToggleOutline } from "react-icons/io5";

interface VariantCatalogRulesProps {
    isPrimary?: boolean;
    blockAdditionalCombinations?: boolean;
    onPrimaryChange?: (value: boolean) => void;
    onBlockCombinationsChange?: (value: boolean) => void;
}

export const CatalogRules = ({
    isPrimary = true,
    blockAdditionalCombinations = false,
    onPrimaryChange,
    onBlockCombinationsChange,
}: VariantCatalogRulesProps) => {

    const [primary, setPrimary] = useState(isPrimary);
    const [blockCombinations, setBlockCombinations] = useState(
        blockAdditionalCombinations
    );

    const handlePrimaryChange = (value: boolean) => {
        setPrimary(value);
        onPrimaryChange?.(value);
    };

    const handleBlockCombinationsChange = (value: boolean) => {
        setBlockCombinations(value);
        onBlockCombinationsChange?.(value);
    };

    return (
        <section className="space-y-3">
            <h3 className="flex items-center gap-3 font-semibold text-text">
                <IoToggleOutline
                    size={18}
                    className="text-primary"
                />
                <span>6. Reglas de visualización del catálogo</span>
            </h3>

            {/* Variante principal */}
            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
                <div className="min-w-0">
                    <span className="block text-sm font-semibold text-primary">
                        Variante principal del producto
                    </span>

                    <span className="mt-0.5 block text-xs text-text-muted">
                        Define esta variante como la principal para mostrar su imagen y
                        precio predeterminados en resultados de búsqueda y landings.
                    </span>
                </div>

                <Checkbox />
            </label>

            {/* Bloquear combinaciones */}
            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
                <div className="min-w-0">
                    <span className="block text-sm font-semibold text-primary">
                        Bloquear combinaciones adicionales
                    </span>

                    <span className="mt-0.5 block text-xs text-text-muted">
                        Impide la creación automática de otras variantes con los mismos
                        atributos combinados.
                    </span>
                </div>

                <Checkbox />
            </label>
        </section>
    );
};
