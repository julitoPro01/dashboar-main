import { RecordStatusType } from "@/src/generated/prisma/enums";

export type RecordStatusDb = RecordStatusType;

export type RecordStatusValue =
    | "draft"
    | "active"
    | "inactive"
    | "archived"
    | "deleted";

export type RecordStatusLabel =
    | "Borrador"
    | "Activo"
    | "Inactivo"
    | "Archivado"
    | "Eliminado";

// export type RecordStatusEntity = RecordStatus;