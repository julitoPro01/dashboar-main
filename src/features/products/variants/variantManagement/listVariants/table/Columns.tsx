import { createColumnHelper } from "@tanstack/react-table";
import { VariantListItemResponse } from "../../../../types";
import { cellStyle, CellTitle } from "@/src/shared/table/core";
import { VARIANT_COLUMN_ID } from "./columnName";
import { PriceCell, PriceColumn } from "./cell/Price";
import { ImageCell } from "./cell/Image";
import { VariantCell } from "./cell/Variant";
import { StatusCell } from "./cell/Status";
import { AttributeCell } from "./cell/Attribute";
import { OrderInputCell, SortableOrderCell } from "./cell/DisplayOrder";

const clmnHelp = createColumnHelper<VariantListItemResponse>();

export type CellObjs = { originalId: number; columnId: string, editable: boolean, styleBody: string }

export const columns = [

    clmnHelp.display({
        id: VARIANT_COLUMN_ID.orderInput,
        header: () => <CellTitle title="Orden" />,
        cell: ({ row, cell }) => {
            const meta = cell.column.columnDef.meta;

            return <OrderInputCell
                {...{
                    data: { order: row.index + 1 },
                    cellId: cell.id,
                    originalId: row.original.id,
                    columnId: cell.column.id,
                    styleBody: meta?.styleBody ?? "",
                    editable: meta?.editable ?? false,
                }
                }
            />
        },
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),

    clmnHelp.display({
        id: VARIANT_COLUMN_ID.sortableOrder,
        header: () => <CellTitle title="Orden" />,
        cell: ({ row, cell }) => {
            const meta = cell.column.columnDef.meta;

            return <SortableOrderCell
                {...{
                    data: { order: row.index + 1 },
                    cellId: cell.id,
                    originalId: row.original.id,
                    columnId: cell.column.id,
                    styleBody: meta?.styleBody ?? "",
                    editable: meta?.editable ?? false,
                }
                }
            />
        },
        enableResizing: false,
        size: 96,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    clmnHelp.accessor("image", {
        id: VARIANT_COLUMN_ID.image,
        header: () => <CellTitle title="Imagen" />,
        cell: ({ getValue, row, cell }) => {

            const meta = cell.column.columnDef.meta;
            return <ImageCell {...{
                data: { ...getValue(), priority: row.index < 15 },
                cellId: cell.id,
                originalId: row.original.id,
                columnId: cell.column.id,
                styleBody: meta?.styleBody ?? "",
                editable: meta?.editable ?? false,
            }} />
        },
        enableResizing: false,
        size: 96,
        meta: {
            editable: true,
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    clmnHelp.accessor("sku", {
        id: VARIANT_COLUMN_ID.variant,
        header: () => <CellTitle title="Variante" />,
        cell: ({ getValue, row: { original }, cell }) => {
            const meta = cell.column.columnDef.meta;

            return <VariantCell
                {...{
                    data: {
                        sku: getValue(),
                        isMainVariant: original.isMainVariant,
                        stockQuantity: original.stockQuantity,
                        minStock: original.minStock,
                        inventoryPolicy: original.inventoryPolicy,
                        channels: original.variantChannel
                    },
                    cellId: cell.id,
                    originalId: original.id,
                    columnId: cell.column.id,
                    styleBody: meta?.styleBody ?? "",
                    editable: meta?.editable ?? false,
                }}
            />

        },
        enableResizing: false,
        size: 170,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
            editable: true
        }
    }),
    clmnHelp.accessor("attributes", {
        id: VARIANT_COLUMN_ID.attributes,
        header: () => <CellTitle title="Atributos" />,
        cell: ({ getValue, cell, row: { original } }) => {
            const meta = cell.column.columnDef.meta;

            return <AttributeCell
                {...{
                    data: getValue(),
                    originalId: original.id,
                    columnId: cell.column.id,
                    styleBody: meta?.styleBody ?? "",
                    editable: meta?.editable ?? false,
                }
                }
            />
        },
        enableResizing: false,
        size: 160,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
    clmnHelp.accessor("price", {
        id: VARIANT_COLUMN_ID.price,
        header: ({ column }) => {
            return <PriceColumn columnId={column.id} />
        },
        cell: ({ getValue, row: { original }, cell }) => {
            const meta = cell.column.columnDef.meta;

            return (
                <PriceCell
                    {...{
                        data: {
                            basePrice: getValue(),
                            discount: original.discount,
                            discountStartsAt: original.discountStartsAt,
                            discountEndsAt: original.discountEndsAt,
                            discountStatus: original.discountStatus,
                        },
                        originalId: original.id,
                        columnId: cell.column.id,
                        styleBody: meta?.styleBody ?? "",
                        editable: meta?.editable ?? false,
                    }}
                />
            )
        },
        enableResizing: false,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
            editable: true
        }
    }),
    clmnHelp.accessor("recordStatus.name", {
        id: VARIANT_COLUMN_ID.status,
        header: () => <CellTitle title="Estado" />,
        cell: ({ getValue, row: { original }, cell }) => {
            const meta = cell.column.columnDef.meta;

            return <StatusCell
                {...{
                    data: {
                        recordStatus: getValue(),
                        inventoryStatus: original.inventoryStatus,
                        saleStatus: original.saleStatus
                    },
                    originalId: original.id,
                    columnId: cell.column.id,
                    styleBody: meta?.styleBody ?? "",
                    editable: meta?.editable ?? false,
                }}
            />
        }
        ,
        enableResizing: false,
        size: 250,
        meta: {
            styleHeader: cellStyle.h,
            styleBody: cellStyle.b,
        }
    }),
]


