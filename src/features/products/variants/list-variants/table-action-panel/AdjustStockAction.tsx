"use client";

import type { VariantListItemResponse } from "@/src/features/products/types";
import { Button } from "@/src/shared/components/btn";
import { Input, Select, Textarea } from "@/src/shared/form";
import { useTableContext } from "@/src/shared/table/core";
import { useStore } from "@/src/store/useStore";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuPackage, LuSave } from "react-icons/lu";
import { useAdjustVariantStock } from "../../../shared/hooks";
import { INVENTORY_POLICY } from "../../../shared/catalog";

export const AdjustStockAction = () => {
    const router = useRouter();
    const setTableAction = useStore(v => v.setVariantTableAction);
    const productId = useStore(v => v.variantBaseProduct?.id);

    const rows = useTableContext().table!.getRowModel().rows;

    const variants = useMemo(
        () => rows.map(row => row.original as VariantListItemResponse),
        [rows]);

    const stockManagedVariants = variants.filter(variant => variant.inventoryPolicy === INVENTORY_POLICY.AUTO_DECREMENT);

    const [variantId, setVariantId] = useState("");
    const [newStock, setNewStock] = useState("");
    const [reason, setReason] = useState("");
    const { saveChange, isPending } = useAdjustVariantStock();


    const selectedVariant = stockManagedVariants.find(variant => variant.id === Number(variantId));
    const parsedStock = newStock === "" ? undefined : Number(newStock);
    const difference = parsedStock === undefined || !selectedVariant
        ? 0
        : parsedStock - selectedVariant.stockQuantity;
    const isValid = !!productId
        && !!selectedVariant
        && parsedStock !== undefined
        && Number.isInteger(parsedStock)
        && parsedStock >= 0
        && parsedStock <= 1_000_000
        && difference !== 0
        && reason.trim().length >= 3
        && reason.trim().length <= 500;

    const handleVariantChange = (id: string) => {
        setVariantId(id);
        const variant = stockManagedVariants.find(item => item.id === Number(id));
        setNewStock(variant ? String(variant.stockQuantity) : "");
    };

    const handleSave = async () => {
        if (!isValid || !productId || !selectedVariant || parsedStock === undefined) return;

        const result = await saveChange({
            productId,
            variantId: selectedVariant.id,
            newStock: parsedStock,
            reason: reason.trim(),
        });

        if (!result.ok) return;

        router.refresh();
        setTableAction("list");
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <LuPackage size={18} aria-hidden="true" />
                </span>
                <div>
                    <h2 className="font-semibold text-text">Ajustar inventario</h2>
                    <p className="mt-0.5 text-sm text-text-muted">
                        Registra el conteo físico de una variante. El sistema guardará la diferencia, el motivo, la fecha y el usuario.
                    </p>
                </div>
            </div>

            {stockManagedVariants.length === 0 ? (
                <div className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-muted">
                    No hay variantes con inventario controlado para ajustar.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    <Select
                        custom={{
                            label: "Variante",
                            labelPosition: "top",
                            placeholder: "Selecciona un SKU",
                            isValueSelected: !!variantId,
                        }}
                        value={variantId}
                        disabled={isPending}
                        onChange={event => handleVariantChange(event.target.value)}
                    >
                        {stockManagedVariants.map(variant => (
                            <option key={variant.id} value={variant.id}>{variant.sku}</option>
                        ))}
                    </Select>

                    <div className="flex items-end gap-3">
                        {selectedVariant && (
                            <p className="mb-3 whitespace-nowrap text-sm text-text-muted">
                                Stock actual: <strong className="text-text">{selectedVariant.stockQuantity}</strong>
                            </p>
                        )}
                        <Input
                            custom={{
                                label: "Conteo físico",
                                labelPosition: "top",
                                error: parsedStock !== undefined && (!Number.isInteger(parsedStock) || parsedStock < 0 || parsedStock > 1_000_000)
                                    ? "Ingresa una cantidad entera entre 0 y 1,000,000."
                                    : undefined,
                            }}
                            type="number"
                            min={0}
                            max={1_000_000}
                            step={1}
                            value={newStock}
                            disabled={isPending || !selectedVariant}
                            onChange={event => setNewStock(event.target.value)}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Textarea
                            custom={{
                                label: "Motivo del ajuste",
                                labelPosition: "top",
                                description: "Por ejemplo: conteo físico, producto dañado o corrección de registro.",
                                descrPosition: "bottom",
                            }}
                            rows={3}
                            maxLength={500}
                            value={reason}
                            disabled={isPending}
                            onChange={event => setReason(event.target.value)}
                            required
                        />
                    </div>

                    {selectedVariant && parsedStock !== undefined && difference !== 0 && (
                        <p className="text-sm text-text-muted md:col-span-2">
                            Diferencia que se registrará: <strong className={difference > 0 ? "text-success" : "text-error"}>
                                {difference > 0 ? `+${difference}` : difference}
                            </strong>
                        </p>
                    )}

                    {selectedVariant && (
                        <section className="md:col-span-2 rounded-md border border-border bg-surface px-3 py-2.5">
                            <h3 className="text-sm font-semibold text-text">Últimos ajustes</h3>
                            {selectedVariant.stockAdjustments.length ? (
                                <ul className="mt-2 divide-y divide-border-subtle">
                                    {selectedVariant.stockAdjustments.map(movement => (
                                        <li key={movement.id} className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 py-2 text-xs">
                                            <span className="min-w-0 flex-1 text-text-muted">{movement.reason || "Sin motivo registrado"}</span>
                                            <span className={movement.quantity > 0 ? "font-semibold text-success" : "font-semibold text-error"}>
                                                {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                                            </span>
                                            <span className="text-text-secondary">
                                                {movement.createdBy ?? "Usuario desconocido"} · {new Intl.DateTimeFormat("es-PE", {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                }).format(new Date(movement.date))}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-1 text-xs text-text-muted">Esta variante aún no tiene ajustes registrados.</p>
                            )}
                        </section>
                    )}
                </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={isPending}
                    onClick={() => setTableAction("list")}
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    variant="confirm"
                    size="sm"
                    disabled={isPending || !isValid}
                    loading={isPending}
                    onClick={handleSave}
                >
                    <LuSave size={16} aria-hidden="true" />
                    Guardar ajuste
                </Button>
            </div>
        </div>
    );
};
