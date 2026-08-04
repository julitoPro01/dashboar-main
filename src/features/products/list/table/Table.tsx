import { BodyRowMemo, DynamicReactTable, HeaderRow, useTableContext } from "@/src/shared/table/core";
import { TablePaginationUrl } from "@/src/shared/table/pagination";

export const Table = () => {

    const table = useTableContext().table!;

    const meta = table.options.meta?.metaPagination;
    const pag = table.options.meta?.pagination;

    return (
        <>
            <DynamicReactTable totalSize={table.getCenterTotalSize()}
                HeaderRows={table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />)}>

                {
                    table.getRowModel().rows.map(row => <BodyRowMemo
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
                <TablePaginationUrl pagination={pag} metaPagination={meta} />
            }
        </>
    )
}
