
export const FLOATING_PANEL_TYPE = {
    CATEGORY: "category", // pagina

    PRODUCT: "product", // pagina
    PRODUCT_STAT_CARD: "product_stat_card",

    SUPPLIER: "supplier",// pagina

    ATTRIBUTE: "attribute",//pagina
    CATG_ATTR_SELECTED_ROWS: "catg_attr_selected_rows"// pagina -> panel para filtrar attributos seleccionados;

} as const;

export type FloatingPanelType =
    typeof FLOATING_PANEL_TYPE[keyof typeof FLOATING_PANEL_TYPE];

export type ControlsFloating = { cx: number, cy: number, open: boolean, status: "loading" | "success", type: FloatingPanelType | null };

export type FetchStatus = { status: "idle" | "loading" | "success" | "error", titleMsg?: string; descMsg?: string };

export interface StateUi {
    leftNavBarOpen: boolean;
    floatingPanel: ControlsFloating;
    fetchStatus: FetchStatus;
}

export interface ActionUi {
    setLeftNavBarOpen: (_: boolean) => void;
    
    setFloatingPanel: (_: Partial<ControlsFloating>) => void;
    setCloseFloatingPanel:()=>void;

    setFetchStatus: (_: FetchStatus) => void;
}

export type UiSlice = StateUi & ActionUi;