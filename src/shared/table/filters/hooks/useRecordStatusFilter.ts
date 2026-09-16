"use client";
import { RecordStatusDb, serializeRecordStatus } from "@/src/shared/domains/recordStatus";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createURLPaginationParams, parsePaginationParams } from "../../pagination/utils";

export const useRecordStatusFilter = () => {

    const [status, setStatus] = useState<{ value?: RecordStatusDb, isActive: boolean }>({ isActive: false });

    const searchPar = useSearchParams();
    const state = searchPar.get("state");
    const router = useRouter();


    const handleChange = (value?: RecordStatusDb, call?: () => void) => {
        
        setStatus(v => ({ ...v, value }));

        const par = serializeRecordStatus(value);

        const u = createURLPaginationParams({
            basePath: "",
            searchParams: searchPar,
            query: { state: par, page: 1 }
        }, { deleteState: !value, includeState: true })

        router.replace(u, { scroll: false });

        call?.();
    }

    const handleOpen = () => setStatus(v => ({ ...v, isActive: true }));
    const handleClose = () => setStatus(v => ({ ...v, isActive: false }))

    useEffect(() => {

        const state = parsePaginationParams(searchPar, { includeState: true }).state
        setStatus(v => ({ ...v, value: state }))

    }, [state]);

    const { value, isActive } = status

    return {
        handleChange, handleClose, handleOpen,
        value, isActive
    }
}
