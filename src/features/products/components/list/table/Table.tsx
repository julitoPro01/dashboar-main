import { BodyRow, DynamicReactTable, HeaderRow, TablePagination, useTableContext } from "@/src/shared/table"
import { useMemo } from "react"

export const Table = () => {

    const table = useTableContext().table!;

    const columnSizing = table.getState().columnSizing;

    const headerList = useMemo(() => table.getHeaderGroups().map(group =>
        <HeaderRow key={group.id} group={group} />
    ), [table, columnSizing]);

    const meta = table.options.meta?.metaPagination;
    const pag = table.options.meta?.pagination;

    return (
        <>
            <DynamicReactTable totalSize={table.getCenterTotalSize()} HeaderRows={headerList}>
                {
                    table.getRowModel().rows.map(row => <BodyRow
                        key={row.id}
                        // isSelected={row.original.id === selected.id}
                        isSelected={row.original.id === 0}
                        row={row}
                    // onOpenPanel={onOpenMenu}
                    />
                    )
                }
            </DynamicReactTable>

            {
                (meta && pag) &&
                <TablePagination pagination={pag} metaPagination={meta} />
            }
        </>
    )
}
