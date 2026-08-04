import { SupplierCapability } from "@/src/generated/prisma/enums";

export type SupplierCapabilityDb = SupplierCapability;

export type SupplierCapabilityLabel =
    "Fabricante" |
    "Distribuidor" |
    "Mayorista" |
    "Minorista" |
    "Servicio" 