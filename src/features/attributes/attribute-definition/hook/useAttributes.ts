import { PaginationBasic } from "@/src/shared/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { getAttrDefinitions } from "@/src/action/attribute";
import { AttributeTableFilter } from "../types";

export const useAttributes =(pag: PaginationBasic, fil: AttributeTableFilter,enabled?:boolean)=>{

    return  useQuery({
        queryKey: QUERY_KEYS.attributes.list(pag, fil),
        queryFn: () => getAttrDefinitions(pag, fil),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
        enabled
    });
}