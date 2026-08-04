import { createColumnHelper } from "@tanstack/react-table";
import { BodyCells } from "./BodyCells";
import { NameBusiness } from "../filters/NameBusiness";
import { Capabilities } from "../filters/Capabilities";
import { RecordStatus } from "../filters/RecordStatus";
import { CreateDate } from "../filters/CreateDate";
import { SupplierResponse } from "../../types";
import { cellStyle } from "@/src/shared/table/core";
import { CellTitle, index } from "@/src/shared/table/core";


const column = createColumnHelper<SupplierResponse>();


export const columnDef = [

    column.display({
        id: "index",
        header: "#",
        cell: ({ row, table: { getState } }) => {
            const { pageIndex, pageSize } = getState().pagination
            return BodyCells.Index(index(row.index, pageIndex, pageSize).toString().padStart(2, '0'))
        },
        enableResizing: true,
        size: 60,
        minSize: 60,
        maxSize: 150,
        meta: {
            styleHeader: cellStyle.index().h,
            styleBody: cellStyle.index().b,
            styleHover: cellStyle.index().hov_b
        }
    }),

    column.accessor("logoUrl", {    
        id: "logoUrl",
        header: () => <CellTitle title="Logo" />,
        cell: p => BodyCells.Logo(p.getValue() ?? "", p.row.original.name, p.row.index),
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    column.accessor("name", {
        id: "name",
        header: () => <NameBusiness />,
        cell: p => BodyCells.Name(p.getValue()),
        enableResizing: true,
        size: 350,
        minSize: 150,
        maxSize: 800,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    column.accessor("capabilities", {
        id: "capabilities",
        header: () => <Capabilities />,
        cell: p => BodyCells.Capabilities(p.getValue(),p.row.original.relationMode),
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
        header: () => <RecordStatus />,
        cell: p => BodyCells.RecordStatus(p.getValue().name),
        size: 130,
        enableResizing: false,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    column.accessor("createdAt", {
        id: "createdAt",
        header: () => <CreateDate />,
        cell: p => BodyCells.CreatedAt(p.getValue()),
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
            fill: true
        }
    })
]
