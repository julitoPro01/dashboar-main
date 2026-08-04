import { createColumnHelper } from "@tanstack/react-table";
import { SupplierResponse } from "../../../types";
import { BodyCells } from "../../../list/table/BodyCells";
import { cellStyle } from "@/src/shared/table/core";
import { CellTitle, index } from "@/src/shared/table/core";

const column = createColumnHelper<SupplierResponse>();



export const columnDef = [

    column.display({
        id: "index",
        header: "#",
        cell: ({ row, table: { getState } }) => {
            const { pageIndex, pageSize } = getState().pagination
            return BodyCells.Index(index(row.index,pageIndex,pageSize).toString().padStart(2,'0'))
        },
        enableResizing: true,
        size: 60,
        minSize: 60,
        maxSize: 150,
        meta: {
            styleHeader: cellStyle.index(false).h,
            styleBody: cellStyle.index(false).b,
            styleHover: cellStyle.index(false).hov_b
        }
    }),

    column.accessor("name", {
        id: "name",
        header: () => <CellTitle title="Empresa" />,
        cell: p => BodyCells.Name(p.getValue()),
        enableResizing: true,
        size: 170,
        minSize: 150,
        maxSize: 800,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    column.accessor("capabilities", {
        id: "capabilities",
        header: () => <CellTitle title="Capacidades" />,
        cell: p => BodyCells.Capabilities(p.getValue(), p.row.original.relationMode),
        enableResizing: true,
        size: 170,
        minSize: 100,
        maxSize: 800,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    column.accessor("recordStatus", {
        id: "recordStatus",
        header: () => <CellTitle title="Estado" />,
        cell: p => BodyCells.RecordStatus(p.getValue().name),
        size: 130,
        enableResizing: false,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

]