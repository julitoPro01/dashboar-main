
export type SelectionFilter =
    | "all"
    | "selected-first"
    | "selected-only"
    | "unselected";

export const SELECTION_FILTERS: {
    value: SelectionFilter;
    label: string;
}[] = [
        { value: "all", label: "Todos" },
        { value: "selected-first", label: "Seleccionados primero" },
        { value: "selected-only", label: "Solo seleccionados" },
        { value: "unselected", label: "No seleccionados" },
    ];