
type ControlsFloating ={cx:number, cy:number, open:boolean};

export interface StateUi{
    leftNavBarOpen:boolean;
    floatingPanel:ControlsFloating
}

export interface ActionUi{
    setLeftNavBarOpen:(_:boolean)=>void;
    setFloatingPanel:(_:ControlsFloating)=>void;
}

export type UiSlice = StateUi & ActionUi;