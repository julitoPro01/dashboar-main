
export const FLOATING_PANEL_TYPE = {
    CATEGORY: "category", // pagina

    PRODUCT: "product", // pagina
    PRODUCT_STAT_CARD: "product_stat_card",

    SUPPLIER: "supplier",// pagina

    ATTRIBUTE: "attribute",//pagina
    CATG_ATTR_SELECTED_ROWS: "catg_attr_selected_rows"// pagina -> panel para filtrar attributos seleccionados;

} as const;


export const SIDE_MODAL_TYPE ={
    PRODUCT_VARIANT_CREATE:"product_variant_CREATE",
    PRODUCT_VARIANT_EDIT:"product_variant_EDIT",

} as  const;

export type FloatingPanelType =
    typeof FLOATING_PANEL_TYPE[keyof typeof FLOATING_PANEL_TYPE];

export type SideModalType = typeof SIDE_MODAL_TYPE[keyof typeof SIDE_MODAL_TYPE];

export type ControlsFloatingState = { cx: number, cy: number, open: boolean, status: "loading" | "success", type: FloatingPanelType | null };

export type FetchStatus = { status: "idle" | "loading" | "success" | "error", titleMsg?: string; descMsg?: string };

 type SideModalState = {open:boolean, type:SideModalType | null};

export interface StateUi {
    leftNavBarOpen: boolean;
    floatingPanel: ControlsFloatingState;
    fetchStatus: FetchStatus;
    sideModal:SideModalState;
}

export interface ActionUi {
    setLeftNavBarOpen: (_: boolean) => void;
    
    setFloatingPanel: (_: Partial<ControlsFloatingState>) => void;
    setCloseFloatingPanel:()=>void;

    setFetchStatus: (_: FetchStatus) => void;

    setSideModal:(_:SideModalState)=>void;
}

export type UiSlice = StateUi & ActionUi;