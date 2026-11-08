"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRestockVariantStock } from "@/src/features/products/shared/hooks";
import { Button } from "@/src/shared/components/btn";
import { MenuItem } from "@/src/shared/components/items";
import { DynamicModal } from "@/src/shared/components/modal";
import { Input, Textarea, useBasicForm } from "@/src/shared/form";
import { useStore } from "@/src/store/useStore";
import type { SelectedVariant } from "@/src/store/variantSlice";
import { LuPackagePlus } from "react-icons/lu";
import { INVENTORY_POLICY } from "../../../shared/catalog";

interface RestockVariantProps {
    selected: SelectedVariant;
}

export const RestockVariant = ({ selected }: RestockVariantProps) => {
    const product = useStore((state) => state.variantBaseProduct);
    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);
    const router = useRouter();
    const { saveChange, isPending } = useRestockVariantStock();
    const [open, setOpen] = useState(false);

    const { handleChange, state, isError, isValidate, resetForm } = useBasicForm<{
        quantity: number | null;
        minStock: number | null;
        reason: string;
    }>({
        quantity: null,
        minStock: selected.minStock,
        reason: "",
    }, {
        quantity: (quantity) => {
            if (quantity === null) return "Ingresa la cantidad recibida.";
            if (!Number.isInteger(quantity)) return "La cantidad debe ser un número entero.";
            if (quantity <= 0) return "La reposición debe ser mayor que cero.";
            if (quantity > 1_000_000 - selected.stockQuantity) {
                return `El stock total no puede superar 1,000,000 unidades.`;
            }
            return true;
        },
        reason: (reason) => reason.trim().length > 500
            ? "La referencia no puede superar los 500 caracteres."
            : true,
        minStock: (minStock) => minStock === null
            || (Number.isInteger(minStock) && minStock >= 0 && minStock <= 1_000)
            ? true
            : "El stock mínimo debe ser un entero entre 0 y 1,000.",
    });

    const resultingStock = state.quantity === null
        ? null
        : selected.stockQuantity + state.quantity;

    const handleOpen = () => {
        resetForm({ quantity: null, minStock: selected.minStock, reason: "" });
        setOpen(true);
    };

    const handleSave = async () => {
        const quantity = state.quantity;
        if (!isValidate() || !product || quantity === null) return;

        const result = await saveChange({
            productId: product.id,
            variantId: selected.id,
            quantity,
            minStock: state.minStock,
            reason: state.reason.trim() || undefined,
        });

        if (!result.ok) return;

        setOpen(false);
        closeFloatingPanel();
        router.refresh();
    };

    const isStockManaged = selected.inventoryPolicy === INVENTORY_POLICY.AUTO_DECREMENT;

    return (
        <>
            <MenuItem
                label="Reponer inventario"
                disabled={!isStockManaged || !product}
                onClick={handleOpen}
            />

            <DynamicModal
                open={open}
                onClose={() => setOpen(false)}
                title="Reponer inventario"
                description={`${selected.sku} · ${product?.name ?? "Producto"}`}
                size="lg"
                inactiveClose
            >
                <div className="space-y-5 p-6">
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <LuPackagePlus size={18} aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="font-semibold text-text">Registrar entrada de unidades</h2>
                            <p className="mt-0.5 text-sm text-text-muted">
                                Ingresa las unidades recibidas. La reposición solo aumenta el inventario.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <p className="self-end pb-2 text-sm text-text-muted">
                            Stock actual: <strong className="text-text">{selected.stockQuantity}</strong>
                        </p>

                        <Input
                            custom={{
                                label: "Unidades recibidas",
                                error: isError.quantity,
                            }}
                            type="number"
                            placeholder="0"
                            min={1}
                            max={1_000_000 - selected.stockQuantity}
                            step={1}
                            value={state.quantity ?? ""}
                            disabled={isPending}
                            onChange={({ target }) => handleChange(
                                "quantity",
                                target.value === "" ? null : Number(target.value),
                            )}
                            required
                        />

                        <Input
                            custom={{
                                label: "Stock mínimo",
                                description: "Dispara aviso de reposición.",
                                descrPosition: "bottom",
                                error: isError.minStock,
                            }}
                            type="number"
                            placeholder="0"
                            min={0}
                            max={1_000}
                            step={1}
                            value={state.minStock ?? ""}
                            disabled={isPending}
                            onChange={({ target }) => handleChange(
                                "minStock",
                                target.value === "" ? null : Number(target.value),
                            )}
                        />

                        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm sm:col-span-2">
                            <span className="text-text-muted">Stock después de reponer:</span>
                            <strong className="text-text">
                                {resultingStock === null ? "—" : resultingStock}
                            </strong>
                        </div>

                        <div className="sm:col-span-2">
                            <Textarea
                                custom={{
                                    label: "Referencia o nota",
                                    description: "Por ejemplo: recepción de compra o número de orden.",
                                    descrPosition: "bottom",
                                    error: isError.reason,
                                }}
                                placeholder="Recepción de compra"
                                rows={3}
                                maxLength={500}
                                value={state.reason}
                                disabled={isPending}
                                onChange={(event) => handleChange("reason", event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <Button
                            variant="basic"
                            disabled={isPending}
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="confirm"
                            disabled={isPending}
                            loading={isPending}
                            onClick={handleSave}
                        >
                            <LuPackagePlus size={16} aria-hidden="true" />
                            Registrar reposición
                        </Button>
                    </div>
                </div>
            </DynamicModal>
        </>
    );
};
