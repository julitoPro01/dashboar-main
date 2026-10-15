
"use client";

import { Checkbox } from "@/src/shared/form";
import { useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { IoToggleOutline } from "react-icons/io5";

export const CatalogRules = () => {


    const hasOtherVariants = false;

    useEffect(() => {

        // Establecer isPrimary= true

    }, [hasOtherVariants])



    if (!hasOtherVariants)
        return null

    return (
        <section className="space-y-3">
            <h3 className="flex items-center gap-3 font-semibold text-text">
                <IoToggleOutline
                    size={18}
                    className="text-primary"
                />
                <span>6. Configuración de variantes</span>
            </h3>

            {/* Variante principal */}
            <div className="flex  items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
                <div className="min-w-0 ">
                    <span className="block text-sm font-semibold text-primary">
                        Variante principal del producto
                    </span>

                    <span className="mt-0.5 block text-xs text-text-muted">
                        Define esta variante como referencia predeterminada del producto en el catálogo,
                        utilizando su imagen y precio.
                    </span>

                    <div className="text-amber-500 text-xs inline-flex gap-1 items-center mt-1">
                        <CiWarning size={18} className=" shrink-0" />
                        <span> Ya existe otra variante principal. Al seleccionar esta opción,
                            será reemplazada.
                        </span>
                    </div>

                    <span className=" block text-xs text-text-muted">Solo una variante puede ser la principal por producto.</span>
                </div>

                <Checkbox aria-label="Definir variante principal" />
            </div>

            {/* TODO: Desarrollar en una sección independiente */}
            {/* Bloquear combinaciones */}
            {/* <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
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
            </label> */}
        </section>
    );
};
