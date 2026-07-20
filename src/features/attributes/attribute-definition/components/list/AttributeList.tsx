"use client";

import { useCallback, useMemo } from "react";
import { BodyRow, DynamicReactTable, HeaderRow, OpenPanelPayload, type PaginationBasic, TablePagination, TableProvider, useStableUrlPagination, useTableContext } from "@/src/shared/table";
import { useStore } from "@/src/store/useStore";
import { useDelayedFetchState } from "@/src/shared/hooks";
import { APP_ROUTES } from "@/src/shared/routes";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { columnDef } from "./table/ColumnDef";
import { useAttributes } from "../../hook/useAttributes";
import { AttributeDefinitionResponse } from "../../types";

interface Props { pagination: PaginationBasic }

export const AttributeList = ({ pagination }: Props) => {

  const filters = useStore(v => v.attributeFilter);
  const setFetchStatus = useStore(v => v.setFetchStatus)

  const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.ATTRIBUTES.INDEX);

  const { data, isFetching, isError } = useAttributes(pag, filters);
  const attributes = data?.data?.attributes ?? [];
  const meta = data?.data?.meta;

  useDelayedFetchState({
    isFetching, errorMsg: isError || (data ? !data.ok : false), setState: setFetchStatus, delay: 1000,
  });


  return (
    <TableProvider columns={columnDef} data={attributes}
      meta={{
        pagination: pag, metaPagination: meta, onSelect(params) {
          console.log(params)
        },
      }}
      options={{ columnResizeMode: "onChange", enableColumnResizing: true }}
    >
      <RenderList />
    </TableProvider>
  );
};


const RenderList = () => {

  const table = useTableContext().table!;

  const setFloatingPanel = useStore(v => v.setFloatingPanel);
  const setSelect = useStore(v => v.setSelectAttribute)
  const selected = useStore(v => v.selectedAttribute);


  const onOpenPanel = useCallback(({ cx, cy, original }: OpenPanelPayload<AttributeDefinitionResponse>) => {

    setFloatingPanel({
      type: FLOATING_PANEL_TYPE.ATTRIBUTE, cx, cy, open: true
    });
    setSelect({ id: original.id, name: original.name })
  }, []);

  const columnSizing = table.getState().columnSizing;
  const headerList = useMemo(
    () => table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />),
    [table, columnSizing]
  );

  const meta = table.options.meta?.metaPagination;
  const pag = table.options.meta?.pagination;

  return (
    <>
      <DynamicReactTable
        roundedTop={false}
        totalSize={table.getCenterTotalSize()}
        HeaderRows={headerList} >
        {
          table.getRowModel().rows.map(row => <BodyRow
            key={row.id}
            row={row}
            onOpenPanel={onOpenPanel}
            isSelected={row.original.id === selected?.id}
          />)
        }
      </DynamicReactTable>

      {
        (meta && pag) &&
        <TablePagination pagination={pag} metaPagination={meta} />
      }
    </>
  )
}
