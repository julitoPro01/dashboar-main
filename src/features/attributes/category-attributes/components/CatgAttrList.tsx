"use client"
import { TableProvider, type PaginationBasic } from "@/src/shared/table";
import { useDataQuery } from "../hook/useActionsQuery";
import { columnDef, visibilityByAction } from "./list/table/ColumnDef";
import { ManagerAttribute } from "./ManagerAttribute";
import { useEffect } from "react";
import { useStore } from "@/src/store/useStore";
import { List } from "./list/List";

interface Props { pagination: PaginationBasic }

export const CatgAttrList = ({ pagination }: Props) => {


    const { data, pag, metaPagination, updateData, actionType } = useDataQuery(pagination);


    const cleanSelectionFilter = useStore(v => v.setCategoryAttrFilter);
    const cleanSelectionIds = useStore(v => v.resetCategoryAttrSelectedIds);

    //Limpiamos los ides seleccionados al desmontar
    useEffect(() => {
        return () => {
            cleanSelectionIds();
            cleanSelectionFilter({ fil: { selection: { type: "all" } } })
        }
    }, [])


    return (
        <TableProvider
            columns={columnDef}
            data={data}
            meta={{
                pagination: pag,
                metaPagination,
                updateData
            }}
            options={{
                columnResizeMode: "onChange",
                enableColumnResizing: true,
                enableRowSelection: actionType !== "view"
            }}
            initColumnVisibility={visibilityByAction[actionType]}
        >
            <ManagerAttribute />
            <List actionType={actionType} />
        </TableProvider>
    )
}
