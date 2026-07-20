"use client"
import { NavItem } from "@/src/shared/components/navigation"
import { APP_ROUTES } from "@/src/shared/routes"
import { IoHome } from "react-icons/io5"
import { AttributeNavigation } from "./navigation/AttributeNavigation"
import { ProductNavigation } from "./navigation/ProductNavigation"
import { CiSettings, CiUser } from "react-icons/ci"
import { usePathname, useSearchParams } from "next/navigation"
import { SupplierNavigation } from "./navigation/SupplierNavigation"
import { parseRecordStatus } from "@/src/shared/domains/status"
import { useEffect, useState } from "react"

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
        <NavItem
          href="/product/sldfs-sdfls12-21/variant"
          label="Variante test"
          icon={<IoHome />}
        />
      </li>

      <li>
        <NavItem
          href={APP_ROUTES.CATEGORIES.INDEX}
          label="Category test"
          icon={<IoHome />}
        />
      </li>

      <li>
        <NavItem
          href="/product/create"
          label="Product add test"
          icon={<IoHome />}
        />
      </li>

      <li>
        <NavItem
          href="/"
          label="Home"
          icon={<IoHome />}
        />
      </li>

      <AttributeNavigation pathName={pathName} recordStatus={recordstatus} />
      <ProductNavigation pathName={pathName} recordStatus={recordstatus} />
      <SupplierNavigation pathName={pathName} recordStatus={recordstatus} />

      <li>
        <NavItem
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
        <NavItem
          href="/profile"
          label="Profile"
          icon={<CiUser />}
        />
      </li>

      <li>
        <NavItem
          href="/settings"
          label="Settings"
          icon={<CiSettings />}
        />
      </li>
    </>
  )
}

