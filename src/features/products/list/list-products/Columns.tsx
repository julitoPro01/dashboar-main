import { createColumnHelper } from "@tanstack/react-table";

import { cellStyle } from "@/src/shared/table/core";
import { CellTitle, index } from "@/src/shared/table/core";

import { ProductListItemResponse } from "../../types";
import { BodyCells } from "./BodyCells";
import { Category, Date, Name, Price, Status, Stock } from "./filters";

const clmnHelp = createColumnHelper<ProductListItemResponse>();

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
            styleHeader: cellStyle.index().h,
            styleBody: cellStyle.index().b,
            styleHover: cellStyle.index().hov_b
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
        size: 155,
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
        size: 120,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("minPrice", {
        id: "minPrice",
        header: () => <Price />,
        cell: ({ row: { original }, getValue }) => BodyCells.Price({
            minPrice: getValue(),
            maxPrice: original.maxPrice,
            hasDiscount: original.hasDiscount,
            maxDiscountPercent: original.maxDiscountPercent,
            isUniformDiscount: original.isUniformDiscount,
            hasNotVariant:!original.variantsCount
        }),
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
        cell: ({ row: { original }, getValue }) => BodyCells.Stock({
            totalStock: getValue(),
            lowStockVariantsCount: original.lowStockVariantsCount,
            hasLowStock: original.hasLowStock,
            hasNotVariant:!original.variantsCount
        }),
        enableResizing: false,
        size: 150,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("productStatus", {
        id: "productStatus",
        header: () => <Status />,
        cell: ({ row: { original }, getValue }) => BodyCells.Status({
            productStatus: getValue(),
            verificationStatus: original.verificationStatus
        }),
        enableResizing: false,
        size: 180,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    }),

    clmnHelp.accessor("createdAt", {
        id: "createdAt",
        header: () => <Date />,
        cell: ({ getValue, row: { original } }) => BodyCells.Date(
            getValue(), original.updatedAt
        ),
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b
        }
    })
]