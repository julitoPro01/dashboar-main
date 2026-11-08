import { RecordStatusLabel, RecordStatusDb, RecordStatusValue } from "./type";

// -- ESTADO CON LABEL
export const RECORD_STATUS: Record<RecordStatusDb, RecordStatusValue> = {
    DRAFT: "draft",
    ACTIVE: "active",
    INACTIVE: "inactive",
    ARCHIVED: "archived",
    DELETED: "deleted",
} as const;

//--------------
export const RECORD_STATUS_LABEL: Record<RecordStatusDb, RecordStatusLabel> = {
    DRAFT: "Borrador",
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    ARCHIVED: "Archivado",
    DELETED: "Eliminado",
} as const;

export const RECORD_STATUS_VALUE = {
    DRAFT: "DRAFT",
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    ARCHIVED: "ARCHIVED",
    DELETED: "DELETED",
} as const satisfies Record<RecordStatusDb, RecordStatusDb>;

export const RECORD_STATUS_STYLE: Record<RecordStatusDb, string> = {
    DRAFT:
        "bg-slate-100 text-slate-700 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-500/30",

    ACTIVE:
        "bg-green-100 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30",

    INACTIVE:
        "bg-gray-100 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30",

    ARCHIVED:
        "bg-purple-100 text-purple-700 ring-purple-600/20 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500/30",

    DELETED:
        "bg-red-100 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30",
};

//-----------------------
/**
 * POR DEFECTO Y EN DB
 */
export const RECORD_STATUS_ID: Record<RecordStatusDb, number> = {
    DRAFT: 1,
    ACTIVE: 2,
    INACTIVE: 3,
    ARCHIVED: 4,
    DELETED: 5
} as const;

export const RECORD_STATUS_OPTIONS = Object.entries(RECORD_STATUS_LABEL).map(([value, label]) => ({
    value, label, id: RECORD_STATUS_ID[value as RecordStatusDb]
})) as { value: RecordStatusDb, label: RecordStatusLabel, id: number }[];


//--------------------------

export const PARENT_RESTRICTED_STATUS: Partial<Record<RecordStatusDb, RecordStatusDb[]>> = {
    DRAFT: ["DRAFT", "DELETED"],
    ARCHIVED: ["ARCHIVED"],
    DELETED: ["DELETED", "DRAFT"],
};

export const RECORD_STATUS_TRANSITIONS: Record<RecordStatusDb, RecordStatusDb[]> = {
    DRAFT: ["DRAFT", "ACTIVE"],
    ACTIVE: ["ACTIVE", "INACTIVE", "ARCHIVED", "DELETED"],
    INACTIVE: ["ACTIVE", "INACTIVE", "ARCHIVED", "DELETED"],
    ARCHIVED: ["INACTIVE", "ARCHIVED", "DELETED"],
    DELETED: ["DRAFT", "DELETED"],
};


type StatusOption = {
    id:number,
    value: RecordStatusDb,
    label: string;
    desc: string;
};

// Para cada estado actual, las opciones (estados destino) a las que puede ir
export const RECORD_STATUS_TRANSITIONS_OPTIONS: Record<
    RecordStatusDb,
    StatusOption[]
> = {
    DRAFT: [
        {id:RECORD_STATUS_ID.DRAFT, value: "DRAFT", label: 'Sin publicar', desc: 'Estado en borrador' }, // check
        {id:RECORD_STATUS_ID.ACTIVE, value: "ACTIVE", label: 'Publicar', desc: 'Visible y disponible para los clientes' },
    ],
    ACTIVE: [
        {id:RECORD_STATUS_ID.ACTIVE, value: "ACTIVE", label: 'Publicado', desc: 'Se está comercializando' }, // check
        {id:RECORD_STATUS_ID.INACTIVE, value: "INACTIVE", label: 'Ocultar', desc: 'Oculto temporalmente, no disponible' },
        {id:RECORD_STATUS_ID.ARCHIVED, value: "ARCHIVED", label: 'Archivar', desc: 'Guardar fuera del catálogo' },
        {id:RECORD_STATUS_ID.DELETED, value: "DELETED", label: 'Eliminar', desc: 'Mover a la papelera' },
    ],
    INACTIVE: [
        {id:RECORD_STATUS_ID.ACTIVE, value: "ACTIVE", label: 'Publicar', desc: 'Visible y disponible para los clientes' },
        {id:RECORD_STATUS_ID.INACTIVE, value: "INACTIVE", label: 'Oculto', desc: 'Ocultado temporalmente, no disponible' }, // check
        {id:RECORD_STATUS_ID.ARCHIVED, value: "ARCHIVED", label: 'Archivar', desc: 'Guardar fuera del catálogo' },
        {id:RECORD_STATUS_ID.DELETED, value: "DELETED", label: 'Eliminar', desc: 'Mover a la papelera' },
    ],
    ARCHIVED: [
        {id:RECORD_STATUS_ID.INACTIVE, value: "INACTIVE", label: 'Restaurar', desc: 'Recuperar para revisar antes de activarla' },
        {id:RECORD_STATUS_ID.ARCHIVED, value: "ARCHIVED", label: 'Archivado', desc: 'Fuera del catálogo, puedes recuperarlo' }, // check
        {id:RECORD_STATUS_ID.DELETED, value: "DELETED", label: 'Eliminar', desc: 'Mover a la papelera' },
    ],
    DELETED: [
        {id:RECORD_STATUS_ID.DRAFT, value: "DRAFT", label: 'Restaurar', desc: 'Recuperar de la papelera como borrador' },
        {id:RECORD_STATUS_ID.DELETED, value: "DELETED", label: 'En papelera', desc: 'Eliminado, puedes restaurarlo' }, // check
    ]
}
