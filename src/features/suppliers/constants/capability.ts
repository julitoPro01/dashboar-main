import { SupplierCapabilityDb, SupplierCapabilityLabel } from "../types";

export const SUPPLIER_CAPABILITIES_LABELS: Record<SupplierCapabilityDb, SupplierCapabilityLabel> = {
    PRODUCT_DISTRIBUTION: "Distribuidor",
    PRODUCT_MANUFACTURING: "Fabricante",
    WHOLESALE: "Mayorista",
    SERVICE_PROVISION: "Servicio",
    RETAIL: "Minorista"
} as const;
