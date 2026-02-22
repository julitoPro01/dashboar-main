import { ProductStatusType } from "@/src/generated/prisma/enums"

export const productStatusUi: Record<ProductStatusType, {
    label: string
}> = {
    [ProductStatusType.AVAILABLE]: {
        label: "Disponible"
    },
    [ProductStatusType.OUT_OF_STOCK]: { label: "Agotado" },
    [ProductStatusType.COMING_SOON]: { label: "Próximamente" },
    [ProductStatusType.DISCONTINUED]: { label: "Descontinuado" },
    [ProductStatusType.PENDING_RESTOCK]: { label: "Pendiente de reabastecimiento" },
    [ProductStatusType.MADE_TO_ORDER]: { label: "Bajo pedido" },
    [ProductStatusType.IN_TRANSIT]: { label: "En tránsito" },
    [ProductStatusType.RESERVED]: { label: "Reserva" }

}