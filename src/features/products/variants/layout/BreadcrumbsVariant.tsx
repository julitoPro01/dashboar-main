import { Breadcrumbs } from "@/src/shared/components/navigation"



export const BreadcrumbsVariant = () => {
  return (
    <Breadcrumbs items={navs} />
  )
}

const navs = [
  { href: "Catalogo", label: "Catalogo" },
  { href: "Products", label: "Producto" },
  { href: "main", label: "Camiseta básica" },
  { href: "variants", label: "Variantes" },
]