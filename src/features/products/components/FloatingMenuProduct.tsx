"use client";
import { FloatingPanel } from "@/src/components/ui";
import { useStore } from "@/src/store/useStore";
import Link from "next/link";

export const FloatingMenuProduct = () => {

  const { cx, cy, open } = useStore(v => v.floatingPanel);

  const setSelectedProduct = useStore(v => v.setSelectedProduct);

  const selectedProduct = useStore(v => v.selectedProduct);
  const deselectProduct = () => setSelectedProduct(undefined);

  const { details, edit, variant } = linKNavig;



  return (
    <FloatingPanel onClick={deselectProduct} cx={cx} cy={cy} open={open} >
      {
        selectedProduct ?
          <div className="py-1" role="none">
            <Link href={details.to(selectedProduct.publicId)} className={linkStyle} role="menuitem" id="menu-item-0">{details.label}</Link>
            <Link href={edit.to(selectedProduct.publicId)} className={linkStyle} role="menuitem" id="menu-item-1">{edit.label}</Link>
            <Link href={variant.to(selectedProduct.publicId)} className={linkStyle} role="menuitem" id="menu-item-1">{variant.label}</Link>
          </div>
          : <div className="p-4 text-gray-500"> Contenido no disponible </div>
      }
    </FloatingPanel>
  )
}

const linkStyle = `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all`

const linKNavig = {
  details: {
    label: "Ver detalles",
    to: (publicId: string) => `/product/${publicId}`
  },
  edit: {
    label: "Editar",
    to: (publicId: string) => `/product/${publicId}/edit`
  },
  variant: {
    label: "Gestionar variantes",
    to: (publicId: string) => `/product/${publicId}/variant`
  }
}

