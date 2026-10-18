import { createColumnHelper } from "@tanstack/react-table";
import { VariantListItemResponse } from "../../types";
import { cellStyle, CellTitle } from "@/src/shared/table/core";
import { BodyCells } from "./BodyCells";

const clmnHelp = createColumnHelper<VariantListItemResponse>();

export const columns = [
    clmnHelp.display({
        id:"displayOrder",
        header:()=><CellTitle title="Orden" />,
        cell:({row})=>BodyCells.DisplayOrder(row.index+1),
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    clmnHelp.accessor("image", {
        id: "image",
        header: () => <CellTitle title="Imagen" />,
        cell: ({ getValue, row }) => BodyCells.Image(getValue(), row.index < 15),
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    clmnHelp.accessor("sku", {
        id: "sku",
        header: () => <CellTitle title="Variante" />,
        cell: ({ getValue, row:{original} }) => BodyCells.Variant({
            sku:getValue(),
            isMainVariant:original.isMainVariant,
            stockQuantity:original.stockQuantity,
            minStock:original.minStock,
            inventoryPolicy:original.inventoryPolicy
        }),
        enableResizing: false,
        size: 170,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    // clmnHelp.accessor("sku", {
    //     id: "sku",
    //     header: () => <CellTitle title="Variante" />,
    //     cell: ({ getValue, row }) => BodyCells.Sku(getValue(), row.original.isMainVariant),
    //     enableResizing: false,
    //     size: 160,
    //     meta: {
    //         styleHeader: cellStyle.h,
    //         styleBody: cellStyle.b,
    //     }
    // }),
    clmnHelp.accessor("properties", {
        id: "properties",
        header: () => <CellTitle title="Propiedades" />,
        cell: ({ getValue }) => BodyCells.Properties(getValue()),
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    clmnHelp.accessor("price", {
        id: "price",
        header: () => <CellTitle title="Precio" />,
        cell: ({ getValue, row }) => BodyCells.Price(getValue(), row.original.discount),
        enableResizing: false,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    // clmnHelp.accessor("stockQuantity", {
    //     id: "stockQuantity",
    //     header: () => <CellTitle title="Stock" />,
    //     cell: ({ getValue, row }) => BodyCells.Stock(getValue(), row.original.minStock),
    //     enableResizing: false,
    //     size: 96,
    //     meta: {
    //         styleHeader: cellStyle.h,
    //         styleBody: cellStyle.b,
    //     }
    // }),
    clmnHelp.accessor("recordStatus.name", {
        id: "recordStatus",
        header: () => <CellTitle title="Estado" />,
        cell: ({ getValue,row:{original} }) => BodyCells.Status(
            getValue(),original.inventoryStatus, original.saleStatus),
        enableResizing: false,
        size: 200,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
]


