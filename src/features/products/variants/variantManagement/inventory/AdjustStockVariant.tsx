"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdjustVariantStock } from "@/src/features/products/shared/hooks";
import { Button } from "@/src/shared/components/btn";
import { MenuItem } from "@/src/shared/components/items";
import { DynamicModal } from "@/src/shared/components/modal";
import { Input, Textarea, useBasicForm } from "@/src/shared/form";
import { dateFormatter } from "@/src/shared/utils/date";
import { useStore } from "@/src/store/useStore";
import type { SelectedVariant } from "@/src/store/variantSlice";
import { LuPackage, LuSave } from "react-icons/lu";
import { INVENTORY_POLICY } from "../../../shared/catalog";

interface AdjustStockActionProps {
    selected: SelectedVariant;
}

export const AdjustStock = ({ selected }: AdjustStockActionProps) => {

    const product = useStore((state) => state.variantBaseProduct);

    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);

    const router = useRouter();

    const { saveChange, isPending } = useAdjustVariantStock();

    const [open, setOpen] = useState(false);

    const { handleChange, state, isError, isValidate, resetForm } = useBasicForm<{
        newStock: number | null;
        reason: string;
    }>({
        newStock: selected.stockQuantity,
        reason: "",
    }, {
        newStock: (stock) => {
            if (stock === null) return "El conteo físico es requerido.";
            if (!Number.isInteger(stock)) return "Ingresa una cantidad entera.";
            if (stock < 0 || stock > 1_000_000) {
                return "Ingresa una cantidad entre 0 y 1,000,000.";
            }
            return true;
        },
        reason: (value) => {
            const length = value.trim().length;
            if (length < 3) return "Escribe un motivo de al menos 3 caracteres.";
            if (length > 500) return "El motivo no puede superar los 500 caracteres.";
            return true;
        },
    });


    const difference = isError.newStock || state.newStock === null
        ? null
        : state.newStock - selected.stockQuantity;

    const handleSave = async () => {
        const newStock = state.newStock;
        if (!isValidate() || !product || newStock === null) return;

        const result = await saveChange({
            productId: product.id,
            variantId: selected.id,
            newStock,
            reason: state.reason.trim(),
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
                label="Ajustar inventario"
                disabled={!isStockManaged || !product}
                onClick={()=>setOpen(true)}
            />

            <DynamicModal
                open={open}
                onClose={() => setOpen(false)}
                title="Ajustar inventario"
                description={`${selected.sku} · ${product?.name ?? "Producto"}`}
                size="lg"
                inactiveClose
            >
                <div className="space-y-5 p-6">
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <LuPackage size={18} aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="font-semibold text-text">Conteo físico de inventario</h2>
                            <p className="mt-0.5 text-sm text-text-muted">
                                Registra la cantidad real. Se guardará la diferencia, el motivo, la fecha y el usuario.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-end gap-3">
                            <p className="mb-3 whitespace-nowrap text-sm text-text-muted">
                                Stock actual: <strong className="text-text">{selected.stockQuantity}</strong>
                            </p>
                            <Input
                                custom={{
                                    label: "Conteo físico",
                                    error: isError.newStock,
                                }}
                                type="number"
                                placeholder="0"
                                min={0}
                                max={1_000_000}
                                step={1}
                                value={state.newStock ?? ""}
                                disabled={isPending}
                                onChange={({ target }) => handleChange("newStock", target.value ? +target.value : null)}
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm">
                            <span className="text-text-muted">Diferencia:</span>
                            <strong className={difference === null
                                ? "text-text-muted"
                                : difference > 0
                                    ? "text-success"
                                    : difference < 0
                                        ? "text-error"
                                        : "text-text"}>
                                {difference === null
                                    ? "—"
                                    : difference > 0
                                        ? `+${difference}`
                                        : difference}
                            </strong>
                        </div>

                        <div className="sm:col-span-2">
                            <Textarea
                                custom={{
                                    label: "Motivo del ajuste",
                                    description: "Por ejemplo: conteo físico, producto dañado o corrección de registro.",
                                    descrPosition: "bottom",
                                    error: isError.reason,
                                }}
                                placeholder="Corrección de registro"
                                rows={3}
                                maxLength={500}
                                value={state.reason}
                                disabled={isPending}
                                onChange={(event) => handleChange("reason", event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <StockAdjustmentHistory selected={selected} />

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
                            <LuSave size={16} aria-hidden="true" />
                            Guardar ajuste
                        </Button>
                    </div>
                </div>
            </DynamicModal>
        </>
    );
};

const StockAdjustmentHistory = ({ selected }: { selected: SelectedVariant }) => (
    <section className="rounded-md border border-border bg-surface px-3 py-2.5">
        <h3 className="text-sm font-semibold text-text">Últimos ajustes</h3>
        {selected.stockAdjustments.length ? (
            <ul className="mt-2 divide-y divide-border-subtle">
                {selected.stockAdjustments.map((movement) => (
                    <li key={movement.id} className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 py-2 text-xs">
                        <span className="min-w-0 flex-1 text-text-muted">
                            {movement.reason || "Sin motivo registrado"}
                        </span>
                        <span className={movement.quantity > 0 ? "font-semibold text-success" : "font-semibold text-error"}>
                            {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                        </span>
                        <span className="text-text-secondary">
                            {movement.createdBy ?? "Usuario desconocido"} · {dateFormatter.format(movement.date, "dateTimeShort")}
                        </span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="mt-1 text-xs text-text-muted">Esta variante aún no tiene ajustes registrados.</p>
        )}
    </section>
);
