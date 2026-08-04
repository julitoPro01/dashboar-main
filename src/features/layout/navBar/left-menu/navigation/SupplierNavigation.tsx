"use client";

import { useEffect, useMemo, useState, } from 'react';
import { APP_ROUTES } from '@/src/shared/routes';
import { serializeRecordStatus, type RecordStatusDb } from '@/src/shared/domains/status';
import { Button } from '@/src/shared/components/btn';
import { AiOutlineProduct } from 'react-icons/ai';
import { ListDropDownMemo } from '@/src/shared/components/navigation';
import { createURLPaginationParams } from '@/src/shared/table/pagination/utils';

interface Props { pathName: string, recordStatus?: RecordStatusDb }
export const SupplierNavigation = ({ pathName, recordStatus }: Props) => {

    const isActive = pathName.startsWith(APP_ROUTES.SUPPLIERS.INDEX);
    const state = isActive ? recordStatus : undefined;

    const params = useMemo(() => ({ pathName, state }), [state, pathName])

    return <ListDropDownMemo
        isActiveModule={isActive}
        values={supplierItems}
        params={params}
    />
}

const Items = ({ pathName, state }: { pathName: string, state?: RecordStatusDb }) => {

    const isBasePath = pathName === APP_ROUTES.SUPPLIERS.INDEX;
    const isCreatePath = pathName === APP_ROUTES.SUPPLIERS.CREATE;
    const isCreateUserPath = pathName === APP_ROUTES.SUPPLIERS.CREATE_USER("");

    const [record, setState] = useState<RecordStatusDb | undefined>();

    const active = {
        all: () => isBasePath && !record,
        active: () => isBasePath && (record === "ACTIVE"),
        inactive: () => isBasePath && (record === "INACTIVE"),
        del: () => isBasePath && (record === "DELETED"),
        archived: () => isBasePath && (record === "ARCHIVED"),
    }

    useEffect(() => setState(state), [state])

    return <>
        <li>
            <Button href={urlQuery()} onClick={() => setState(undefined)}
                variant="basic" select="basic" size="sm"
                className={`py-1.5 ${active.all() ? "font-semibold" : ""}`} active={active.all()} >
                Todos
            </Button>
        </li>
        <li>
            <Button href={urlQuery("ACTIVE")} onClick={() => setState("ACTIVE")}
                variant="basic" select="basic" size="sm"
                className={`py-1.5 ${active.active() ? "font-semibold" : ""}`} active={active.active()} >
                Activos
            </Button>
        </li>
        <li>
            <Button href={urlQuery("INACTIVE")} onClick={() => setState("INACTIVE")}
                variant="basic" select="basic" size="sm"
                className={`py-1.5 ${active.inactive() ? "font-semibold" : ""}`} active={active.inactive()} >
                Inactivos
            </Button>
        </li>
        <li>
            <Button href={urlQuery("DELETED")} onClick={() => setState("DELETED")}
                variant="basic" select="basic" size="sm"
                className={`py-1.5 ${active.del() ? "font-semibold" : ""}`} active={active.del()} >
                Eliminados
            </Button>
        </li>
        <li>

            <Button href={urlQuery("ARCHIVED")} onClick={() => setState("ARCHIVED")}
                variant="basic" select="basic" size="sm"
                className={`py-1.5 ${active.archived() ? "font-semibold" : ""}`} active={active.archived()} >
                Archivados
            </Button>
        </li>
        <li>
            <Button href={APP_ROUTES.SUPPLIERS.CREATE} variant="basic" select="basic" size="sm"
                className={`py-1.5 ${isCreatePath ? "font-semibold" : ""}`} active={isCreatePath} >
                ➕ Registrar negocio
            </Button>
        </li>
        <li>
            <Button href={APP_ROUTES.SUPPLIERS.CREATE_USER("sfsds")} variant="basic" select="basic" size="sm"
                className={`py-1.5 ${isCreateUserPath ? "font-semibold" : ""}`} active={isCreateUserPath} >
                ➕ Registrar usuario
            </Button>
        </li>
    </>
}

const urlQuery = (state?: RecordStatusDb) => {
    const currentSearch = typeof window !== "undefined" ? window.location.search : "";

    return createURLPaginationParams({
        basePath: APP_ROUTES.SUPPLIERS.INDEX,
        searchParams: currentSearch,
        query: { state: serializeRecordStatus(state), page: 1 }
    }, { deleteState: !state, includeState: true })

}


const supplierItems = {
    icon: <AiOutlineProduct />,
    title: "Proveedores",
    content: (par: any) => <Items pathName={par.pathName} state={par.state} />
}
