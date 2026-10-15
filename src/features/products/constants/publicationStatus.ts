import { PublicationStatusTypeDb } from "../types";

export const PUBLICATION_STATUS: Record<PublicationStatusTypeDb, PublicationStatusTypeDb> = {
    ACTIVE: "ACTIVE",
    DRAFT: "DRAFT",
    INACTIVE: "INACTIVE"
} as const;

export const PUBLICATION_STATUS_OPTIONS:
    { value: PublicationStatusTypeDb, label: string }[] = [
        {
            value: "ACTIVE",
            label: "Activo",
        },
        {
            value: "DRAFT",
            label: "Borrador",
        },
        {
            value: "INACTIVE",
            label: "Inactivo",
        },
    ] as const;