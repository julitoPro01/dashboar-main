import { combine } from "zustand/middleware";
import { ActionUi, StateUi } from "./interface";

export const uiSlice = combine<StateUi, ActionUi>(
    {
        leftNavBarOpen:true,
        floatingPanel:{cx:0,cy:0, open:false}
    },
    (set,_)=>({
        setLeftNavBarOpen:(open)=>(set({leftNavBarOpen:open})),
        setFloatingPanel:(state)=>(set({floatingPanel:state}))
    })
)