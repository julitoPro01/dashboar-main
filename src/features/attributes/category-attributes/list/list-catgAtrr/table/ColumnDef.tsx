import { createColumnHelper } from "@tanstack/react-table";
import { BodyCells } from "./BodyCell";

import { Name } from "./filters/Name";
import { Selection } from "./filters/Selection";
import { IoMdCheckboxOutline } from "react-icons/io";
import type { CategoryAttrResponse } from "../../../types";
import { cellStyle, CellTitle, index } from "@/src/shared/table/core";


const column = createColumnHelper<CategoryAttrResponse>();

export const columnDef = [

    column.display({
        id: "selection",
        header: () => <Selection />,
        cell: ({ row }) => BodyCells.Selection(
            row.getIsSelected(),
            !row.getCanSelect(),
            row.getIsSomeSelected(),
            row.getToggleSelectedHandler),
        enableResizing: false,
        size: 95,
        meta: {
            styleHeader: cellStyle.index().h,
            styleBody: cellStyle.index().b,
            styleHover: cellStyle.index().hov_b
        }
    }),
    column.display({
        id: "selectionEdit",
        header: () => <div className="flex gap-2 items-center">
            <IoMdCheckboxOutline size={20} className="" /> </div>,
        cell: ({ row }) => BodyCells.Selection(row.getIsSelected(), !row.getCanSelect(), row.getIsSomeSelected(), row.getToggleSelectedHandler),
        enableResizing: false,
        size: 60,
        meta: {
            styleHeader: cellStyle.index().h,
            styleBody: cellStyle.index().b,
            styleHover: cellStyle.index().hov_b
        }
    }),
    column.display({
        id: "index",
        header: "#",
        cell: ({ row, table: { getState } }) => {
            const { pageIndex, pageSize } = getState().pagination;
            const i = index(row.index, pageIndex, pageSize)
            return BodyCells.Index(i.toString().padStart(2, '0'))
        },
        size: 60,
        minSize: 60,
        maxSize: 150,
        // enableResizing:true,
        meta: {
            styleHeader: cellStyle.index().h,
            styleBody: cellStyle.index().b,
            styleHover: cellStyle.index().hov_b
        }
    }),
    column.display({
        id: "order",
        header: () => <CellTitle title="Orden" position="center" />,
        cell: ({ row }) => BodyCells.Order(row.original.displayOrder ?? 1),
        enableResizing: false,
        size: 100,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.display({
        id: "orderEdit",
        header: () => <CellTitle title="Orden" position="center" />,
        cell: ({ row }) => BodyCells.OrderEdit(row.original.displayOrder ?? 1, !row.getIsSelected()),
        enableResizing: false,
        size: 100,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("name", {
        id: "name",
        header: () => <Name />,
        cell: ({ getValue }) => BodyCells.Name(getValue()),
        enableResizing: true,
        maxSize: 800,
        minSize: 150,
        size: 350,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("isFilter", {
        id: "isFilter",
        header: () => <CellTitle title="Filtro" position="center" />,
        cell: ({ table: { options: { meta } }, row, column }) => BodyCells.ToggleSwitch(
            !row.getIsSelected(),
            row.original.isFilter,
            (val) => meta?.updateData?.(row.original.id, column.id, val),
            row.getCanSelect()
        ),
        enableResizing: false,
        size: 120,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("isRequired", {
        id: "isRequired",
        header: () => <CellTitle title="Requerido" position="center" />,
        cell: ({ table: { options: { meta } }, row, column }) => BodyCells.ToggleSwitch(
            !row.getIsSelected(),
            row.original.isRequired,
            (val) => meta?.updateData && meta.updateData(row.original.id, column.id, val),
            row.getCanSelect()),
        enableResizing: false,
        size: 120,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("isVariant", {
        id: "isVariant",
        header: () => <CellTitle title="Variante" position="center" />,
        cell: ({ table: { options: { meta } }, row, column, getValue }) => BodyCells.ToggleSwitch(
            !row.getIsSelected(),
            getValue(),
            (val) => meta?.updateData && meta.updateData(row.original.id, column.id, val),
            row.getCanSelect()),
        enableResizing: false,
        size: 120,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    column.accessor("displayGroup", {
        id: "displayGroup",
        header: () => <CellTitle title="Grupo" />,
        cell: ({ getValue, table: { options: { meta } }, row, column }) => BodyCells.Group(
            !row.getIsSelected(),
            getValue(),
            (val) => meta?.updateData && meta.updateData(row.original.id, column.id, val),
            row.getCanSelect()
        ),
        enableResizing: false,
        size: 250,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    })
];




export const visibilityByAction: Record<string, Record<string, boolean>> = {
    view: {
        index: true,
        selection: false,
        order: true,
        orderEdit: false,
        selectionEdit: false
    },

    assign: {
        index: false,
        selection: true,
        order: false,
        orderEdit: false,
        selectionEdit: false
    },

    edit: {
        index: false,
        selection: false,
        order: false,
        orderEdit: true,
        selectionEdit: true
    },
}