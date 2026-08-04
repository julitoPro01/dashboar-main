"use client";

import { Button } from "@/src/shared/components/btn";
import { ListDropDownMemo } from "@/src/shared/components/navigation";
import { serializeRecordStatus, type RecordStatusDb } from "@/src/shared/domains/status";
import { APP_ROUTES } from "@/src/shared/routes";
import { createURLPaginationParams } from "@/src/shared/table/pagination/utils";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";

interface Props { pathName: string, recordStatus?: RecordStatusDb }
export const AttributeNavigation = ({ pathName, recordStatus }: Props) => {

    const isActive = pathName.startsWith(APP_ROUTES.ATTRIBUTES.INDEX);
    const state = isActive ? recordStatus : undefined;

    const params = useMemo(() => ({ pathName, state }), [state, pathName])

    return (<ListDropDownMemo isActiveModule={isActive}
        params={params}
        values={values}
    />)
}

const Items = ({ pathName, state }: { pathName: string, state?: RecordStatusDb }) => {

    const [record, setState] = useState<RecordStatusDb | undefined>();

    const isBasePath = pathName === APP_ROUTES.ATTRIBUTES.INDEX;

    const active = {
        all: () => isBasePath && !record,
        active: () => isBasePath && (record === "ACTIVE"),
        inactive: () => isBasePath && (record === "INACTIVE")
    }

    useEffect(() => setState(state), [state])


    return (
        <>
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

        </>
    )
}

const urlQuery = (state?: RecordStatusDb) => {

    const currentSearch =  window.location.search ;

    return createURLPaginationParams({
        basePath:APP_ROUTES.ATTRIBUTES.INDEX,
        searchParams:currentSearch,
        query:{state:serializeRecordStatus(state),page:1}
    },{deleteState:!state, includeState:true})
}

const values = {
    icon: <AiOutlineProduct />,
    title: "Attributos",
    content: (par: any) => <Items pathName={par.pathName} state={par.state} />
}