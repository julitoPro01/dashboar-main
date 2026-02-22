import { SupplierResponse } from "@/src/interfaces/supplier";
import { createColumnHelper } from "@tanstack/react-table";
import { BodyCells } from "./BodyCells";
import { NameBusiness } from "../filters/NameBusiness";
import { Capabilities } from "../filters/Capabilities";
import { RecordStatus } from "../filters/RecordStatus";
import { CreateDate } from "../filters/CreateDate";

// celda
const body_cell = `p-5 border-b border-border`;
const header_cell = "relative p-5 text-xs tracking-wide  text-text bg-surface";

const index_cell = {
    h: "p-4 pl-8 text-sm bg-surface text-text  sticky z-10 -left-5 text-center",
    b: "sticky -left-5 z-5 border-b border-border p-4 pl-8 text-center transition-colors duration-200",
    hov_b: "bg-surface group-hover:bg-slate-100 group-hover:dark:bg-slate-800"
}


const column = createColumnHelper<SupplierResponse>();

const index = (i: number, currPag: number, itPerPag: number) => (currPag - 1) * itPerPag + i + 1;


export const columnDef = [

    column.display({
        id: "index",
        header: "#",
        cell: ({ row, table: { getState } }) => {
            const { pageIndex, pageSize } = getState().pagination
            return BodyCells.Index(index(row.index, pageIndex, pageSize))
        },
        enableResizing: false,
        size: 70,
        meta: {
            styleHeader: index_cell.h,
            styleBody: index_cell.b,
            styleHover: index_cell.hov_b
        }
    }),

    column.accessor("logoUrl", {
        id: "logoUrl",
        header: () => <span className=" uppercase font-bold ">Logo</span>,
        cell: p => BodyCells.Logo(p.getValue() ?? "", p.row.original.name, p.row.index),
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: header_cell,
            styleBody: body_cell,
        }
    }),

    column.accessor("name", {
        id: "name",
        header: () => <NameBusiness />,
        cell: p => BodyCells.Name(p.getValue()),
        enableResizing: true,
        size: 450,
        minSize: 150,
        maxSize: 800,
        meta: {
            styleHeader: header_cell,
            styleBody: body_cell,
        }
    }),

    column.accessor("capabilities", {
        id: "capabilities",
        header: () => <Capabilities />,
        cell: p => BodyCells.Capabilities(p.getValue()),
        enableResizing: true,
        size:170,
        minSize: 100,
        maxSize: 800,
        meta: {
            styleHeader: header_cell,
            styleBody: body_cell,
        }
    }),

    column.accessor("recordStatus", {
        id: "recordStatus",
        header: () => <RecordStatus />,
        cell: p => BodyCells.RecordStatus(p.getValue().name),
        enableResizing: false,
        meta: {
            styleHeader: header_cell,
            styleBody: body_cell,
        }
    }),

    column.accessor("createdAt", {
        id: "createdAt",
        header: () => <CreateDate />,
        cell: p => BodyCells.CreatedAt(p.getValue()),
        enableResizing: false,
        meta: {
            styleHeader: `${header_cell} pe-8`,
            styleBody: `${body_cell} pe-8`,
            fill: true
        }
    }),
    // {
    //      id: "space",
    //     header: "",
    //     enableResizing: false,
    //      meta: {
    //         styleHeader: ` w-full border `,
    //         styleBody: `w-full border-b border-border `,
    //     }
    // }
]
