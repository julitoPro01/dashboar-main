import { useEffect, useState } from "react";
import { useSuppliers } from "../hooks/useSuppliers"
import { SupplierFilters, SupplierRelationModeDb, SupplierResponse } from "../../types";
import { BodyRow, DynamicTable, HeaderRow, useTable } from "@/src/shared/table/core";
import { columnDef } from "./supplier-selector/ColumnDef";
import { Button } from "@/src/shared/components/btn";
import { FloatingActionBar } from "@/src/shared/components/floating";
import { DEFAULT_PAGINATION } from "@/src/shared/table/pagination/constants";
import { TablePagination } from "@/src/shared/table/pagination";

interface Props {
  onConfirm: (par: { id: number, name: string, relationMode: SupplierRelationModeDb }) => void;
  filters?: SupplierFilters;
  id?: number;
}
export const SupplierSelector = ({ onConfirm, filters = {}, id }: Props) => {

  const [pagination, setPagination] = useState(initPagination);

  const { suppliers, meta } = useSuppliers(pagination, filters);

  const [rowSelection, setSelection] = useState<Record<number, boolean>>(id ? { [id]: true } : {});

  const table = useTable({
    data: suppliers,
    columns: columnDef,
    state: { rowSelection },
    stateAction: { setRowSelection: setSelection },
    stateOptions: { enableRowSelection: true, enableMultiRowSelection: false },
    meta: { pagination, metaPagination: meta }
  });

  const handleGoToPage = (page: number) => {
    setPagination(v => ({ ...v, page }))
  }

  const handlePageSizeChange = (page: number, pageSize: number) => {
    setPagination(v => ({ ...v, page, pageSize }))
  }

  const handleConfirm = () => {
    const { id, name, relationMode }: SupplierResponse = table.getSelectedRowModel().rows[0].original;
    onConfirm({ id, name, relationMode })
  }


  return (
    <>
      <DynamicTable HeaderRows={table.getHeaderGroups().map(v => <HeaderRow key={v.id} group={v} />)}>

        {
          table.getRowModel().rows.map(row => <BodyRow
            key={row.id}
            isSelected={rowSelection[row.original.id]}
            row={row}
            canSelect={row.getCanSelect()}
          />
          )
        }
      </DynamicTable>
      {
        meta &&
        <TablePagination
          pagination={pagination}
          metaPagination={meta}
          onGoToPage={handleGoToPage}
          onPageSizeChange={handlePageSizeChange}
        />
      }

      <FloatingActionBar position={{ custom: "bottom-1/8 right-2.5" }} padding="0">
        <Button variant="tabLight" size="sm" rounded="full" padding="py-2 px-3"
          disabled={Object.keys(rowSelection).length < 1}
          onClick={handleConfirm}>
          Confirmar
        </Button>
      </FloatingActionBar>
    </>
  )
}

const initPagination = DEFAULT_PAGINATION;
