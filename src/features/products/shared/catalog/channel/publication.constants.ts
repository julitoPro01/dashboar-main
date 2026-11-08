import { PublicationStatusTypeDb } from "./type";

export const PUBLICATION_STATUS: Record<PublicationStatusTypeDb, PublicationStatusTypeDb> = {
    ACTIVE: "ACTIVE",
    DRAFT: "DRAFT",
    INACTIVE: "INACTIVE",
} as const;

export const PUBLICATION_STATUS_LABEL:Record<PublicationStatusTypeDb,string>={
    ACTIVE:"Activo",
    INACTIVE:"Inactivo",
    DRAFT:"No disponible"
}

export const PUBLICATION_STATUS_OPTIONS: { value: PublicationStatusTypeDb; label: string }[] = [
    { value: "ACTIVE", label: "Activo" },
    { value: "DRAFT", label: "Borrador" },
    { value: "INACTIVE", label: "Inactivo" },
];

/** Estados disponibles al gestionar la publicación de un canal ya configurado. */
export const CHANNEL_MANAGEMENT_STATUS_OPTIONS = [
    { value: "ACTIVE", label: "Activo" },
    { value: "INACTIVE", label: "Inactivo" },
] as const;
