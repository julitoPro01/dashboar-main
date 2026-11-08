"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetMainVariant } from "@/src/features/products/shared/hooks";
import { ConfirmDialog, DynamicModal } from "@/src/shared/components/modal";
import { MenuItem } from "@/src/shared/components/items";
import type { SelectedVariant } from "@/src/store/variantSlice";
import { useStore } from "@/src/store/useStore";
import { RECORD_STATUS_VALUE } from "@/src/shared/domains/recordStatus";
import { IoStarOutline } from "react-icons/io5";
import { Details } from "./Details";

interface SetMainVariantActionProps {
    selected: SelectedVariant;
}

export const SetMainVariant = ({ selected }: SetMainVariantActionProps) => {

    const product = useStore((state) => state.variantBaseProduct);

    const clearSelection = useStore((state) => state.setVariantSelect);
    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const router = useRouter();

    const { saveChange, isPending } = useSetMainVariant();

    const handleConfirm = async () => {
        if (!product) return;

        const result = await saveChange({
            productId: product.id,
            variantId: selected.id,
        });

        if (!result.ok) return;

        setConfirmOpen(false);
        closeFloatingPanel();
        clearSelection();
        router.refresh();
    };

    return (
        <>
            <MenuItem
                icon={<IoStarOutline />}
                label="Establecer como principal"
                disabled={selected.isMainVariant || !product || selected.recordStatus.name !== RECORD_STATUS_VALUE.ACTIVE}
                onClick={() => setConfirmOpen(true)}
            />

            <DynamicModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                size="md"
                inactiveClose
            >
                <ConfirmDialog
                    title="Establecer variante principal"
                    description={
                        <>
                            La variante <strong>{selected.sku}</strong> será la representación visual
                            del producto base <strong>{product?.name}</strong>. Si ya existe otra variante
                            principal, dejará de serlo.
                        </>
                    }
                    details={<Details properties={selected.properties} sku={selected.sku} />}
                    variant="info"
                    variantBtn="info"
                    confirmText="Establecer como principal"
                    loadingText="Actualizando..."
                    loading={isPending}
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={handleConfirm}
                />
            </DynamicModal>
        </>
    );
};

