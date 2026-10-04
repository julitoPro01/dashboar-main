"use client";

import { useCallback, useState } from "react";
import { BodyRowMemo, DynamicReactTable, HeaderRow, OpenPanelParams, TableProvider, useTableContext } from "@/src/shared/table/core";
import { useStore } from "@/src/store/useStore";
import { APP_ROUTES } from "@/src/shared/routes";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { AttributeDefinitionResponse } from "../types";
import { PaginationState, TablePaginationUrl, useStableUrlPagination } from "@/src/shared/table/pagination";
import { useAttributes } from "../shared/hook";
import { columnDef } from "./list-attribute/ColumnDef";
import { ColumnSizingState } from "@tanstack/react-table";

interface Props { pagination: PaginationState }

export const ListAttributes = ({ pagination }: Props) => {

  const filters = useStore(v => v.attributeFilters);

  const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.ATTRIBUTES.INDEX);

  const { attributes, meta } = useAttributes(pag, filters);


  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});


  return (
    <TableProvider columns={columnDef} data={attributes}
      meta={{ pagination: pag, metaPagination: meta }}
      stateOptions={{ enableColumnResizing: true, columnResizeMode: "onChange" }}
      state={{ columnSizing }}
      stateAction={{ setColumnSizing }}
    >
      <Table />
    </TableProvider>
  );
};


const Table = () => {

  const table = useTableContext().table!;

  const setFloatingPanel = useStore(v => v.setFloatingPanel);
  const setSelect = useStore(v => v.setAttributeSelect)
  const selected = useStore(v => v.attributeSelected);


  const onOpenPanel = useCallback(({ cx, cy, original }: OpenPanelParams<AttributeDefinitionResponse>) => {

    setFloatingPanel({
      type: FLOATING_PANEL_TYPE.ATTRIBUTE, cx, cy, open: true
    });
    setSelect({ id: original.id, name: original.name })
  }, []);


  const meta = table.options.meta?.metaPagination;
  const pag = table.options.meta?.pagination;

  return (
    <>
      <DynamicReactTable
        roundedTop={false}
        totalSize={table.getCenterTotalSize()}
        HeaderRows={table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />)} >
        {
          table.getRowModel().rows.map(row => <BodyRowMemo
            key={row.id}
            row={row}
            onOpenPanel={onOpenPanel}
            isSelected={row.original.id === selected?.id}
          />)
        }
      </DynamicReactTable>

      {
        (meta && pag) &&
        <TablePaginationUrl pagination={pag} metaPagination={meta} />
      }
    </>
  )
}
