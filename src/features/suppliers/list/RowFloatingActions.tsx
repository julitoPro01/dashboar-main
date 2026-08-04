"use client";
import { FloatingPanel } from "@/src/shared/components/floating";
import { APP_ROUTES } from "@/src/shared/routes";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore"
import Link from "next/link"

// Activamos el menu flotante
// Cerramos el menu flotante deseleccionando al proveedor

export const RowFloatingActions = () => {

  const selected = useStore(v => v.selectedSupplier);
  const setDeselect = useStore(v => v.setSelectSupplier);
  const setViewDetails = useStore(v => v.setViewSupplierDetails);


  return (
    <FloatingPanel panelType={FLOATING_PANEL_TYPE.SUPPLIER} placement="right-start"
      
      onEffectClose={() => setDeselect()}>
      <div className="p-2 flex flex-col " >

        <button className={iStyle}
          onClick={() => setViewDetails(true, selected.id)}>{"details.label"}
        </button>

        <Link href={APP_ROUTES.SUPPLIERS.EDIT(selected.publicId ?? "")} className={iStyle} id="menu-item-1">{"edit.label helo e lslds"}</Link>
        <Link href={``} className={iStyle} id="menu-item-1">{"variant.label"}</Link>

      </div>
    </FloatingPanel >
  )

  // return (
  //   <FloatingPanelOld onEffectClose={() => setDeselect(undefined, undefined)} panelType={FLOATING_PANEL_TYPE.SUPPLIER} >
  //     <div className="p-2 flex flex-col " >
  //       <button className={iStyle}
  //         onClick={() => setViewDetails(true, selected.id)}>{"details.label"}</button>
  //       <Link href={APP_ROUTES.SUPPLIERS.EDIT(selected.publicId ?? "")} className={iStyle} id="menu-item-1">{"edit.label helo e lslds"}</Link>
  //       <Link href={``} className={iStyle} id="menu-item-1">{"variant.label"}</Link>
  //     </div>
  //   </FloatingPanelOld>
  // )
}

const iStyle = `block px-4 py-2 text-start text-sm text-text rounded-md hover:bg-hover transition-all`

