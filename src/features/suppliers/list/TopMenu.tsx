import { APP_ROUTES } from "@/src/shared/routes"
import Link from "next/link"
import { CiExport } from "react-icons/ci"
import { FaPlus } from "react-icons/fa"

export const TopMenu = () => {
    return (
        <div className="flex flex-wrap gap-4 py-6">

            <h1 className="flex-1 text-2xl font-black tracking-tight text-text-strong">Proveedor de gestión</h1>
            <div className="flex items-end gap-2">

                <button className="inline-flex items-center gap-2
    px-4 py-2 rounded-md
    text-sm font-medium

    border border-border-strong
    text-text

    hover:bg-hover

    transition-colors duration-200">
                    <CiExport />
                    Exportar
                </button>

                {/* Acción principal */}
                <Link
                    href={APP_ROUTES.SUPPLIERS.CREATE}
                    className=" inline-flex items-center gap-2
    px-4 py-2 rounded-md
    text-sm font-medium

    border border-border-strong
    text-text

    hover:bg-hover

    transition-colors duration-200">
                    <FaPlus />
                    Nuevo proveedor
                </Link>
            </div>

        </div>
    )
}