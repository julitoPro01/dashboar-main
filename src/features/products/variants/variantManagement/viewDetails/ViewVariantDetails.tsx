"use client";

import Image from "next/image";
import { useVariantFormQuery } from "../../../shared/hooks";
import type { VariantForm } from "../../../types";
import { CHANNEL_LABEL, INVENTORY_POLICY_OPTIONS, PUBLICATION_STATUS_LABEL, PublicationStatusTypeDb, SALE_STATUS_LABEL } from "../../../shared/catalog";
import { RECORD_STATUS_ID, RecordStatusBadge } from "@/src/shared/domains/recordStatus";
import type { RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { formatPrice } from "@/src/shared/utils";
import { dateFormatter, parsePeruDateTime } from "@/src/shared/utils/date";
import { mapSystemAttributesToView } from "../../../shared/helpers";

interface Props {
    variantId: number;
}

export const ViewVariantDetails = ({ variantId }: Props) => {
    const { data, isPending, isError } = useVariantFormQuery(variantId);

    if (isPending) {
        return <p className="p-6 text-sm text-text-muted">Cargando detalles de la variante…</p>;
    }

    if (isError || !data?.ok) {
        return <p className="p-6 text-sm text-text-muted">No se pudieron cargar los detalles de la variante.</p>;
    }

    const variant = data.data;
    const recordStatus = Object.entries(RECORD_STATUS_ID)
        .find(([, id]) => id === variant.operationStatus.recordStatusId)?.[0] as RecordStatusDb | undefined;
    const basePrice = variant.commercialInfo?.basePrice ?? 0;
    const discount = variant.commercialInfo?.discount ?? 0;
    const discountStartsAt = parseOptionalDate(variant.commercialInfo?.discountStartsAt);
    const discountEndsAt = parseOptionalDate(variant.commercialInfo?.discountEndsAt);
    const now = Date.now();
    const discountExpired = discount > 0 && !!discountEndsAt && discountEndsAt.getTime() <= now;
    const discountScheduled = discount > 0
        && !discountExpired
        && !!discountStartsAt
        && discountStartsAt.getTime() > now;
    const discountActive = discount > 0 && !discountExpired && !discountScheduled;
    const currentPrice = discountActive ? basePrice * (1 - discount / 100) : basePrice;
    const attributes = variant.categorization.systemAttributes ?? [];

    const channels: {
        key: keyof VariantForm["distributionChannels"];
        channel: keyof typeof CHANNEL_LABEL;
    }[] = [
            { key: "storeFront", channel: "STOREFRONT" },
            { key: "marketplace", channel: "MARKETPLACE" },
            { key: "physicalStore", channel: "PHYSICAL_STORE" },
            { key: "wholesale", channel: "WHOLESALE" },
        ];

    const properties = mapSystemAttributesToView(variant.categorization.systemAttributes);

    return (
        <div className="space-y-6 p-5 text-sm">
            <section className="space-y-3">
                <SectionTitle>Identificación</SectionTitle>
                <DetailRow label="SKU"><span className="font-mono">{variant.commercialInfo?.sku ?? "—"}</span></DetailRow>
                <DetailRow label="Código de barras">{variant.commercialInfo?.barCode || "—"}</DetailRow>
                <DetailRow label="Categoría">{variant.categorization.category.name ?? "—"}</DetailRow>
                <DetailRow label="Registro">
                    {recordStatus ? <RecordStatusBadge status={recordStatus} /> : "—"}
                </DetailRow>
                <DetailRow label="Estado de venta">
                    {SALE_STATUS_LABEL[variant.operationStatus.saleStatus]}
                </DetailRow>
            </section>

            <section className="space-y-3">
                <SectionTitle>Precio</SectionTitle>
                <DetailRow label="Precio base">{formatPrice(basePrice)}</DetailRow>
                <DetailRow label="Descuento">
                    {discount > 0
                        ? `${discount}% · ${discountExpired ? "Vencido" : discountScheduled ? "Programado" : "Activo"}`
                        : "Sin descuento"}
                </DetailRow>
                <DetailRow label="Precio vigente">{formatPrice(currentPrice)}</DetailRow>
                {discountStartsAt && (
                    <DetailRow label="Inicio del descuento">
                        {dateFormatter.format(discountStartsAt, "dateTime")}
                    </DetailRow>
                )}
                {discountEndsAt && (
                    <DetailRow label="Fin del descuento">
                        {dateFormatter.format(discountEndsAt, "dateTime")}
                    </DetailRow>
                )}
            </section>

            <section className="space-y-3">
                <SectionTitle>Inventario</SectionTitle>
                <DetailRow label="Política">
                    {INVENTORY_POLICY_OPTIONS.find((option) => option.value === variant.operationStatus.inventoryPolicy.type)?.label ?? "—"}
                </DetailRow>
                <DetailRow label="Stock">
                    {variant.operationStatus.inventoryPolicy.type === "AUTO_DECREMENT"
                        ? `${variant.operationStatus.inventoryPolicy.stockQuantity} unidades`
                        : "Sin límite de stock"}
                </DetailRow>
                {variant.operationStatus.inventoryPolicy.minStock !== null
                    && variant.operationStatus.inventoryPolicy.minStock !== undefined && (
                        <DetailRow label="Stock mínimo">
                            {variant.operationStatus.inventoryPolicy.minStock} unidades
                        </DetailRow>
                    )}
            </section>

            <section className="space-y-3">
                <SectionTitle>Canales de venta</SectionTitle>

                {channels.map(({ key, channel }) => {
                    const publicationStatus = variant.distributionChannels[key].publicationStatus;
                    return (
                        <DetailRow key={key} label={CHANNEL_LABEL[channel]}>
                            {PUBLICATION_STATUS_LABEL[publicationStatus] ?? publicationStatus}
                        </DetailRow>
                    );
                })}
            </section>

            <section className="space-y-3">
                <SectionTitle>Propiedades</SectionTitle>
                {properties.map(v => (
                    <DetailRow key={v.id} label={v.label}>
                        {v.value}
                    </DetailRow>)
                )}

                {!attributes.some((group) => group.attributes.length > 0) && (
                    <p className="text-text-muted">Esta variante no tiene propiedades configuradas.</p>
                )}
            </section>

            <section className="space-y-3">
                <SectionTitle>Imágenes</SectionTitle>
                {variant.images.length ? (
                    <div className="grid grid-cols-3 gap-3">
                        {variant.images.map((image) => (
                            <div key={image.id ?? image.mediaFile.filePath} className="space-y-1">
                                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface-light">
                                    <Image
                                        src={image.mediaFile.filePath || "/assets/notfound.jpg"}
                                        alt={image.mediaFile.fileName}
                                        fill
                                        sizes="120px"
                                        className="object-cover"
                                    />
                                </div>
                                {image.isPrimary && <span className="text-xs text-primary">Imagen principal</span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-text-muted">No hay imágenes para esta variante.</p>
                )}
            </section>
        </div>
    );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="border-b border-border-subtle pb-2 font-semibold text-text">{children}</h3>
);

const DetailRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-start justify-between gap-4">
        <span className="text-text-muted">{label}</span>
        <span className="text-right text-text">{children}</span>
    </div>
);

const parseOptionalDate = (value?: string | null) => {
    if (!value) return null;

    try {
        return parsePeruDateTime(value);
    } catch {
        return null;
    }
};

type VariantAttributeForm = NonNullable<VariantForm["categorization"]["systemAttributes"]>[number]["attributes"][number];

