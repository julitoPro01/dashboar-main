"use client";

import { Button } from "@/src/shared/components/btn";
import { useTableContext } from "@/src/shared/table/core";
import { useStore } from "@/src/store/useStore";
import type { VariantListItemResponse } from "@/src/features/products/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuSave, LuStar } from "react-icons/lu";
import { useSetMainVariant } from "../../../shared/hooks";
import { SetMainInfo } from "./SetMainInfo";
import { Select } from "@/src/shared/form";

interface VariantSelectProps {
    variants: VariantListItemResponse[];
    value: string;
    disabled: boolean;
    onChange: (value: string) => void;
}

interface ActionButtonsProps {
    disabled: boolean;
    isPending: boolean;
    onCancel: () => void;
    onSave: () => void;
}

export const SetMainAction = () => {

    const router = useRouter();

    const setVariantTableAction = useStore(v => v.setVariantTableAction);
    const productId = useStore(v => v.variantBaseProduct?.id);


    const { saveChange, isPending } = useSetMainVariant();

    const table = useTableContext().table!

    // Variante principal
    const currentMain = table.getRowModel().rows.map(v => v.original as VariantListItemResponse).find((variant) => variant.isMainVariant);

    const selectedVariant = table.getSelectedRowModel().rows[0]?.original as VariantListItemResponse | undefined;

    const handleSave = async () => {
        if (!productId || !selectedVariant || selectedVariant.isMainVariant) return;

        const result = await saveChange({ productId, variantId: selectedVariant.id });
        if (!result.ok) return;

        router.refresh();
        setVariantTableAction("list");
    };

    return (
        <div className="flex  gap-4 w-full">
            <div className="flex-1 flex flex-wrap gap-4">

                <SetMainHeader currentSku={currentMain?.sku} selectedSku={selectedVariant?.sku}/>

                <div className="flex flex-wrap items-end justify-between gap-4">

                    <SetMainActionButtons
                        disabled={isPending || !selectedVariant || selectedVariant.isMainVariant}
                        isPending={isPending}
                        onCancel={() => setVariantTableAction("list")}
                        onSave={handleSave}
                    />
                </div>
            </div>
            <SetMainInfo />

        </div>
    );
};

const SetMainHeader = ({ currentSku, selectedSku }: { currentSku?: string, selectedSku?: string }) => (
    <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <LuStar size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <h2 className="font-semibold text-text">
                    Establecer variante principal

                </h2>
                <p className="mt-0.5 text-sm text-text-muted">

                    Selecciona una variante que representará visualmente al producto base.
                </p>
                <p className="text-text-muted p-2 px-4 bg-bg-soft-blue rounded-md mt-1">
                    {currentSku
                        ? <>
                            Principal actual: <span className="font-mono font-semibold"> {currentSku} </span>
                        </>
                        : <>Aún no hay una variante principal.</>
                    }
                    {" - "}
                    {selectedSku && (selectedSku !== currentSku) &&
                        
                        <span >
                            Nueva selección: <span className="font-mono font-semibold"> {selectedSku} </span>
                        </span>
                    }

                </p>
            </div>

        </div>
    </div>
);


const SetMainActionButtons = ({ disabled, isPending, onCancel, onSave }: ActionButtonsProps) => (
    <div className="flex flex-wrap items-center gap-2">
        <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isPending}
            onClick={onCancel}
        >
            Cancelar
        </Button>
        <Button
            type="button"
            variant="confirm"
            size="sm"
            disabled={disabled}
            loading={isPending}
            onClick={onSave}
        >
            <LuSave size={16} aria-hidden="true" />
            {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
    </div>
);
