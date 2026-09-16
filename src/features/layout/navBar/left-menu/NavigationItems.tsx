"use client"
import { SidebarLink } from "@/src/shared/components/navigation"
import { APP_ROUTES } from "@/src/shared/routes"
import { IoHome } from "react-icons/io5"
import { AttributeNavigation } from "./navigation/AttributeNavigation"
import { ProductNavigation } from "./navigation/ProductNavigation"
import { CiSettings, CiUser } from "react-icons/ci"
import { usePathname, useSearchParams } from "next/navigation"
import { SupplierNavigation } from "./navigation/SupplierNavigation"
import { useEffect, useState } from "react"
import { parseRecordStatus } from "@/src/shared/domains/recordStatus"

export const NavigationItems = () => {

  const pathName = usePathname();
  const search = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const recordstatus = parseRecordStatus(search.get("state") as any);


  useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  return (
    <>
      <li className="px-3 pt-6 pb-2 sidebar-section">
        Dashboard
      </li>

      <li>
        <SidebarLink
          href="/product/sldfs-sdfls12-21/variant"
          label="Variante test"
          pathName={pathName}
          icon={<IoHome />}
        />
      </li>

      <li>
        <SidebarLink
          href={APP_ROUTES.CATEGORIES.INDEX}
          label="Category test"
          pathName={pathName}
          icon={<IoHome />}
        />
      </li>

      <li>
        <SidebarLink
          href="/product/create"
          label="Product add test"
          icon={<IoHome />}
        />
      </li>

      <li>
        <SidebarLink
          href="/"
          label="Home"
          pathName={pathName}
          icon={<IoHome />}
        />
      </li>

      <AttributeNavigation pathName={pathName} recordStatus={recordstatus} />
      <ProductNavigation pathName={pathName} recordStatus={recordstatus} />
      <SupplierNavigation pathName={pathName} recordStatus={recordstatus} />

      <li>
        <SidebarLink
          href="/products"
          label="Variantes del producto"
          icon={<IoHome />}
        />
      </li>

      {/* Settings */}
      <li className="px-3 pt-6 pb-2 sidebar-section">
        Settings
      </li>

      <li>
        <SidebarLink
          href="/profile"
          label="Profile"
          icon={<CiUser />}
        />
      </li>

      <li>
        <SidebarLink
          href="/settings"
          label="Settings"
          icon={<CiSettings />}
        />
      </li>
    </>
  )
}

