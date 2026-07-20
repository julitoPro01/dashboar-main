import { createColumnHelper } from "@tanstack/react-table";
import { ProductItemResponse } from "../../../types/productList.api";

import { cellStyle } from "@/src/shared/theme/table";

import { CellTitle, index } from "@/src/shared/table";

import { BodyCells } from "./BodyCells";
import { Date } from "../filters/Date";
import { RecordStatus } from "../filters/RecordStatus";
import { Stock } from "../filters/Stock";
import { Price } from "../filters/Price";
import { Name } from "../filters/Name";
import { Category } from "../filters/Category";

const clmnHelp = createColumnHelper<ProductItemResponse>();


export const columns = [

    clmnHelp.display({
        id: "index",
        header: "#",
        cell: ({ row, table: { getState } }) => {
            const { pageIndex, pageSize } = getState().pagination
            const i = index(row.index, pageIndex, pageSize)
            return BodyCells.Index(i.toString().padStart(2, '0'))
        },
        enableResizing: true,
        size: 60,
        minSize: 60,
        maxSize: 150,
        meta: {
            styleHeader: cellStyle.index.h,
            styleBody: cellStyle.index.b,
            styleHover: cellStyle.index.hov_b
        }
    }),

    clmnHelp.accessor("image", {
        id: "image",
        header: () => <CellTitle title="Imagen" />,
        cell: ({ getValue, row }) => BodyCells.Image(getValue() ?? "", row.original.name, row.index),
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    clmnHelp.accessor("name", {
        id: "name",
        header: () => <Name />,
        cell: ({ getValue }) => BodyCells.Name(getValue()),
        enableResizing: true,
        size: 350,
        minSize: 150,
        maxSize: 800,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    clmnHelp.accessor("parentSku", {
        id: "parentSku",
        header: () => <CellTitle title="SKU" />,
        cell: ({ getValue }) => BodyCells.Sku(getValue()),
        enableResizing: false,
        size: 150,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("category", {
        id: "category",
        header: () => <Category />,
        cell: ({ getValue }) => BodyCells.Category(getValue()),
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("variantsCount", {
        id: "variantsCount",
        header: () => <CellTitle title="Variantes" />,
        cell: ({ getValue }) => BodyCells.VariantsCount(getValue()),
        enableResizing: false,
        size: 150,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("minPrice", {
        id: "minPrice",
        header: () => <Price />,
        cell: () => BodyCells.Price(),
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("totalStock", {
        id: "totalStock",
        header: () => <Stock />,
        cell: () => BodyCells.Stock(),
        enableResizing: false,
        size: 150,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("productStatus", {
        id: "productStatus",
        header: () => <RecordStatus />,
        cell: () => BodyCells.State(),
        enableResizing: false,
        size: 130,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("createdAt", {
        id: "createdAt",
        header: () => <Date />,
        cell: () => BodyCells.Date(),
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    })
]