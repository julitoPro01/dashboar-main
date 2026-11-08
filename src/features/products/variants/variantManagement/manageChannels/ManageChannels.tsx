"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateVariantChannels } from "@/src/action/variant";
import type { VariantListItemResponse } from "@/src/features/products/types";
import { CHANNEL_LABEL, CHANNEL_MANAGEMENT_STATUS_OPTIONS, PUBLICATION_STATUS } from "@/src/features/products/shared/catalog";
import { Button } from "@/src/shared/components/btn";
import { MenuItem } from "@/src/shared/components/items";
import { DynamicModal } from "@/src/shared/components/modal";
import { Select } from "@/src/shared/form";
import { useStore } from "@/src/store/useStore";
import type { SelectedVariant } from "@/src/store/variantSlice";
import type { DistributionChannelDb, PublicationStatusTypeDb } from "@/src/features/products/shared/catalog";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuSave } from "react-icons/lu";
import { useUpdateChannels } from "../../../shared/hooks";

type ChannelState = Record<DistributionChannelDb, PublicationStatusTypeDb>;

interface Props {
    selected: SelectedVariant;
}

const getChannelStates = (channels: VariantListItemResponse["variantChannel"]): ChannelState => {

    return channels.reduce((p, c) => {
        p[c.channel] = c.publicationStatus;
        return p;
    }, {} as ChannelState)
};

export const ManageChannels = ({ selected }: Props) => {

    const product = useStore((state) => state.variantBaseProduct);

    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const initialStates = getChannelStates(selected.variantChannel);

    const [states, setStates] = useState<ChannelState>(initialStates);

    const { isPending, saveChange } = useUpdateChannels();

    const changedChannels = (Object.keys(states) as DistributionChannelDb[])
        .filter((channel) => states[channel] !== initialStates[channel]);

    const openModal = () => {
        setStates(initialStates)
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        if (!product) return;

        const result = await saveChange({
            productId: product.id,
            variantId: selected.id,
            channels: changedChannels.map((channel) => ({
                channel,
                publicationStatus: states[channel] as Exclude<PublicationStatusTypeDb, "DRAFT">,
            })),
        });

        if (!result.ok) return;

        setOpen(false);
        closeFloatingPanel();

        router.refresh();

    };


    return (
        <>
            <MenuItem
                icon={<IoStorefrontOutline />}
                label="Gestionar canales"
                disabled={!product}
                onClick={openModal}
            />

            <DynamicModal
                open={open}
                onClose={closeModal}
                title="Gestionar canales"
                description={`${selected.sku} · ${product?.name ?? "Producto"}`}
                size="lg"
                inactiveClose={isPending}
            >
                <div className="space-y-5 p-6">
                    <p className="text-sm text-text-muted">
                        Activa o pausa la publicación de esta variante en cada canal. Los canales en borrador se habilitan al completar su configuración.
                    </p>

                    <div className="space-y-3">

                        {
                            selected.variantChannel.map(v => {
                                const isNoAvailable = v.publicationStatus === PUBLICATION_STATUS.DRAFT;

                                return (
                                    <Select
                                        key={v.id}
                                        custom={{
                                            label: CHANNEL_LABEL[v.channel],
                                            fieldSize: "sm",
                                            isValueSelected: true,
                                            fieldClass: "bg-surface",
                                            disabledPlaceholder:true,
                                            options: isNoAvailable
                                                ? [{ value: v.publicationStatus, label: "No disponible" }]
                                                : CHANNEL_MANAGEMENT_STATUS_OPTIONS
                                        }}
                                        value={states[v.channel]}
                                        disabled={isPending || isNoAvailable}
                                        onChange={(event) => setStates((current) => ({
                                            ...current,
                                            [v.channel]: event.target.value as PublicationStatusTypeDb,
                                        }))}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="basic" disabled={isPending} onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button variant="confirm" loading={isPending} disabled={changedChannels.length === 0} onClick={handleSave}>
                            <LuSave size={16} aria-hidden="true" />
                            Guardar cambios
                        </Button>
                    </div>
                </div>
            </DynamicModal>
        </>
    );
};
