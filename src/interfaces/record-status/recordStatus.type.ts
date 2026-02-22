import { RecordStatusType } from "@/src/generated/prisma/enums";

//-----TYPE--------
export type RECORD_STATUS_TYPE = RecordStatusType;

export type RECORD_STATUS_TYPE_QUERY_LABEL = "active" | "inactive" | "archived" | "deleted"

export type RECORD_STATUS_TYPE_LABEL = "Activo" | "Inactivo" | "Archivado" | "Eliminado"
