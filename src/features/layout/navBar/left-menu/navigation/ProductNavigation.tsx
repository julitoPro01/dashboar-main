"use client"
import { Button } from "@/src/shared/components/btn";
import { ListDropDownMemo } from "@/src/shared/components/navigation";
import { type RecordStatusDb, serializeRecordStatus } from "@/src/shared/domains/status";
import { APP_ROUTES } from "@/src/shared/routes";
import { createURLPaginationParams } from "@/src/shared/table/pagination/utils";

import { useEffect, useMemo, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai"


interface Props { pathName: string, recordStatus?: RecordStatusDb }
export const ProductNavigation = ({ pathName, recordStatus }: Props) => {

    const isActive = pathName.startsWith(APP_ROUTES.PRODUCTS.INDEX);
    const state = isActive ? recordStatus : undefined;

    const params = useMemo(() => ({ pathName, state }), [state, pathName]);

    return <ListDropDownMemo
        isActiveModule={isActive}
        values={productItems}
        params={params}
    />
}

const Items = ({ pathName, state }: { pathName: string, state?: RecordStatusDb }) => {

    const isBasePath = pathName === APP_ROUTES.PRODUCTS.INDEX;
    const isCreatePath = pathName === APP_ROUTES.PRODUCTS.CREATE;

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
            <Button href={APP_ROUTES.PRODUCTS.CREATE} variant="basic" select="basic" size="sm"
                className={`py-1.5 ${isCreatePath ? "font-semibold" : ""}`} active={isCreatePath} >
                ➕ Agregar
            </Button>
        </li>

    </>
}

const urlQuery = (state?: RecordStatusDb) => {
    const currentSearch = typeof window !== "undefined" ? window.location.search : "";

    return createURLPaginationParams({
        basePath: APP_ROUTES.PRODUCTS.INDEX,
        searchParams: currentSearch,
        query: { state: serializeRecordStatus(state), page: 1 }
    }, { deleteState: !state, includeState: true })

}


const productItems = {
    icon: <AiOutlineProduct />,
    title: "Productos",
    content: (par: any) => <Items pathName={par.pathName} state={par.state} />
}

