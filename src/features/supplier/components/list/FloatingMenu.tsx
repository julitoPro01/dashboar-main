"use client";
import { FloatingPanel } from "@/src/components/ui"
import { APP_ROUTES } from "@/src/domains/routes";
import { useStore } from "@/src/store/useStore"
import Link from "next/link"

// Activamos el menu flotante
// Cerramos el menu flotante deseleccionando al proveedor

export const FloatingMenu = () => {

  const { cx, cy, open } = useStore(v => v.floatingPanel);
  const selected = useStore(v => v.selectedSupplier);
  const setDeselect = useStore(v => v.setSelectSupplier);
  const setViewDetails = useStore(v => v.setViewSupplierDetails);

  return (
    <FloatingPanel onClick={() => setDeselect(undefined, undefined)} cx={cx} cy={cy} open={open} >
      <div className="p-2 flex flex-col " >
        <button className={iStyle}
          onClick={() => setViewDetails(true, selected.id)}>{"details.label"}</button>
        <Link href={APP_ROUTES.SUPPLIERS.EDIT(selected.publicId ?? "")} className={iStyle} id="menu-item-1">{"edit.label helo e lslds"}</Link>
        <Link href={``} className={iStyle} id="menu-item-1">{"variant.label"}</Link>
      </div>
    </FloatingPanel>
  )
}

const iStyle = `block px-4 py-2 text-start text-sm text-text rounded-md hover:bg-hover transition-all`

