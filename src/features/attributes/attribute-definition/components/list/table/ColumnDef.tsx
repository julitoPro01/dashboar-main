import { createColumnHelper } from "@tanstack/react-table";
import { cellStyle } from "@/src/shared/theme/table";
import { BodyCells } from "./BodyCell";
import { Name } from "../filters/Name";
import { Date } from '../filters/Date';
import { DateType } from "../filters/DataType";
import { RecordStatus } from "../filters/RecordStatus";
import { AttributeDefinitionResponse } from "../../../types";

const column = createColumnHelper<AttributeDefinitionResponse>();

const index = (i: number, currPag: number, itPerPag: number) => (currPag - 1) * itPerPag + i + 1;

export const columnDef = [

    column.display({
        id: "index",
        header: "#",
        cell: ({ row, table: { getState } }) => {
            const { pageIndex, pageSize } = getState().pagination
            return BodyCells.Index(index(row.index, pageIndex, pageSize))
        },
        size: 60,
        minSize: 60,
        maxSize: 150,
        meta: {
            styleHeader: cellStyle.index.h,
            styleBody: cellStyle.index.b,
            styleHover: cellStyle.index.hov_b
        }
    }),
    column.accessor("name", {
        id: "name",
        header: () => <Name />,
        cell: ({ getValue, row }) => BodyCells.Name(getValue(), row.original.values),
        enableResizing: true,
        maxSize: 800,
        minSize: 150,
        size: 350,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("dataType", {
        id: "dataType",
        header: () => <DateType />,
        cell: ({ getValue }) => BodyCells.DataType(getValue()),
        enableResizing: false,
        size: 200,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("isActive", {
        id: "isActive",
        header: () => <RecordStatus />,
        cell: ({ getValue }) => BodyCells.isActive(getValue()),
        enableResizing: false,
        size: 150,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("createdAt", {
        id: "date",
        header: () => <Date />,
        // cell: ({ getValue, row: { original: { updatedAt } } }) => <span>{getValue() && dateFormatter.format(getValue()!)} - {updatedAt && dateFormatter.format(updatedAt)}</span>,
        cell: ({ getValue, row: { original: { updatedAt } } }) => BodyCells.Date(getValue(), updatedAt),
        enableResizing: false,
        size: 160,
        maxSize: 250,
        minSize: 150,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    })
];
