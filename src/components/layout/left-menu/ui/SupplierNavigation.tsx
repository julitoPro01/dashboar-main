"use client";

import { serializeRecordStatus } from '@/src/domains/record-status';
import { RECORD_STATUS_TYPE } from '@/src/interfaces/record-status';
import { useStore } from '@/src/store/useStore';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineArrowDown } from "react-icons/ai"
import { MdOutlineAddBusiness } from 'react-icons/md';
import { APP_ROUTES, withQueryParams } from '@/src/domains/routes';

export const SupplierNavigation = () => {

    const [open, setOpen] = useState(false);
    const pagination = useStore(v => v.supplierPagination.pagination);

    const urlQuery = (state?: RECORD_STATUS_TYPE) => {
        const { page, pageSize, order, sortBy } = pagination;
        return withQueryParams(APP_ROUTES.SUPPLIERS.INDEX, { page, pageSize, order, sortBy, state: serializeRecordStatus(state) ?? "" })
    }

    return (
        <li >
            <button
                onClick={() => setOpen(!open)}
                className={clsx("relative flex w-full items-center h-11 px-4 transition-colors",
                    {
                        "bg-blue-100 text-gray-700": open,
                        "hover:bg-blue-100 hover:text-gray-700": !open
                    }
                )}
            >
                {/* Ícono principal */}
                <span className="flex justify-center items-center">
                    <MdOutlineAddBusiness size={22} />
                </span>

                {/* Texto */}
                <span className="ml-3 flex-1 text-left text-sm font-medium">
                    Proveedores
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
                    <Link
                        href={urlQuery()}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Todos
                    </Link>
                </li>
                <li>
                    <Link
                        href={urlQuery("ACTIVE")}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Activos
                    </Link>
                </li>
                <li>
                    <Link
                        href={urlQuery("INACTIVE")}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Inactivos
                    </Link>
                </li>
                <li>
                    <Link
                        href={urlQuery("DELETED")}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Eliminados
                    </Link>
                </li>
                <li>
                    <Link
                        href={urlQuery("ARCHIVED")}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Archivados
                    </Link>
                </li>
                <li>
                    <Link
                        href={APP_ROUTES.SUPPLIERS.REGISTER}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ➕ Registrar negocio
                    </Link>
                </li>
                <li>
                    <Link
                        href={APP_ROUTES.SUPPLIERS.REGISTER_USER}
                        className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ➕ Registrar usuario
                    </Link>
                </li>
            </ul>
        </li>)
}
