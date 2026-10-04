import { BodyRowMemo, DynamicReactTable, HeaderRow, OpenPanelParams, useTableContext } from "@/src/shared/table/core";
import { TablePaginationUrl } from "@/src/shared/table/pagination";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { useCallback } from "react";
import { ProductListItemResponse } from "../../types";

export const Table = () => {

    const table = useTableContext().table!;

    const setFloatingMenu = useStore(v => v.setFloatingPanel);

    const setSelect = useStore(v => v.setProductSelect);
    const selected = useStore(v => v.productSelected);

    const onOpenMenu = useCallback(({ cx, cy, original: { id, publicId } }: OpenPanelParams<ProductListItemResponse>) => {
        setFloatingMenu({ cx, cy, open: true, type: FLOATING_PANEL_TYPE.PRODUCT });
        setSelect({ id, publicId });
    }, [setFloatingMenu, setSelect])

    const meta = table.options.meta?.metaPagination;
    const pag = table.options.meta?.pagination;

    return (
        <>
            <DynamicReactTable totalSize={table.getCenterTotalSize()}
                HeaderRows={table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />)}>

                {
                    table.getRowModel().rows.map(row => <BodyRowMemo
                        key={row.id}
                        isSelected={row.original.id === selected?.id}
                        row={row}
                        onOpenPanel={onOpenMenu}
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
