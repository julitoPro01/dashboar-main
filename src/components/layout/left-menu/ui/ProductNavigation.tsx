"use client"
import { APP_ROUTES, withQueryParams } from "@/src/domains/routes";
import { serializeVerificationStatus } from "@/src/domains/verification-status";
import { VERIFICATION_STATUS_TYPE } from "@/src/interfaces/verification-status";
import { useStore } from "@/src/store/useStore";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineProduct, AiOutlineArrowDown } from "react-icons/ai"

export const ProductNavigation = () => {

    const pag = useStore(v=>v.productPagination.pagination);
    const [open, setOpen] = useState(false);


     const urlQuery = (state?: VERIFICATION_STATUS_TYPE) => {
            const { page, pageSize, order, sortBy } = pag;
            return withQueryParams(APP_ROUTES.PRODUCTS.INDEX, { page, pageSize, order, sortBy, state: serializeVerificationStatus(state) ?? "" })
        }
    

    return (
        <li >
            <button
                onClick={() => setOpen(!open)}
                className={clsx("relative flex w-full items-center h-11 px-4 transition-colors cursor-pointer",
                    {
                        "bg-blue-100 text-gray-700": open,
                        "hover:bg-blue-100 hover:text-gray-700": !open
                    }
                )}
            >
                {/* Ícono principal */}
                <span className="flex justify-center items-center">
                    <AiOutlineProduct size={22} />
                </span>

                {/* Texto */}
                <span className="ml-3 flex-1 text-left text-sm font-medium">
                    Mis productos
                </span>

                {/* Flecha */}
                <span
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                >
                    <AiOutlineArrowDown size={18} />
                </span>
            </button>

            {/* Submenú */}
            <ul
                className={`overflow-hidden transition-all duration-300 ml-10 mt-1
                ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <li>
                    <Link href={urlQuery()} className=" block py-1.5 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                        Todos
                    </Link>
                </li>
                <li>
                    <Link href={urlQuery("APPROVED")} className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                        Activos
                    </Link>
                </li>
                <li>
                    <Link href={urlQuery("PENDING_REVIEW")} className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                        Pendientes
                    </Link>
                </li>
                <li>
                    <Link href={urlQuery("REJECTED")} className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                        Rechazados
                    </Link>
                </li>

                <li>
                    <Link href={urlQuery("DRAFT")} className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                        ✎ Borradores
                    </Link>
                </li>

                <li>
                    <Link
                        href={APP_ROUTES.PRODUCTS.NEW}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        ➕ Crear nuevo
                    </Link>
                </li>
            </ul>
        </li>
    )
}
