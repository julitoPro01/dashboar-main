export const SURFACE_VARIANTS = {
    default:
        "rounded-lg border border-border bg-surface shadow-dropdown",
    // para componentes de filtros
    filter:
        "mt-1 rounded-xl border border-border bg-surface-overlay text-sm font-normal shadow-xl",
    // para menú desplegable general
    dropdown:
        "rounded-lg border border-border bg-surface shadow-dropdown",
    // Para acciones de un fila de la tabla
    tableActionMenu:
        "w-52 rounded-lg border border-border bg-surface-black p-1 shadow-dropdown",
    // Menú contextual general
    contextMenu:
        "rounded-lg border border-border bg-surface shadow-dropdown",
} as const;