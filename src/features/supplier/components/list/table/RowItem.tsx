
import { memo } from "react";
import { flexRender, HeaderGroup, Row } from "@tanstack/react-table";
import { SupplierResponse } from "@/src/interfaces/supplier";
import clsx from "clsx";


export const RowItemHeader = ({ group }: { group: HeaderGroup<SupplierResponse> }) => {
    return (
        <tr className="border-b border-border bg-surface">
            {group.headers.map(cell => (
                <th key={cell.id}
                    className={clsx("group/resize", (cell.column.columnDef.meta as any)?.styleHeader)}
                    style={{ width: cell.getSize() }}
                >
                    {flexRender(cell.column.columnDef.header, cell.getContext())}

                    { cell.column.getCanResize() && (
                        <div
                            className="absolute right-0 top-0 h-full  w-2 group-hover/resize:visible invisible group cursor-col-resize select-none touch-none flex items-center justify-center"
                            onMouseDown={cell.getResizeHandler()}
                            onTouchStart={cell.getResizeHandler()}
                        >
                            <div
                                className={clsx(
                                    "w-1 h-3/5 rounded-full transition-all",
                                    cell.column.getIsResizing()
                                        ? "bg-primary"
                                        : "bg-border group-hover:bg-border-strong group-hover:h-4/5"
                                )}
                            />
                        </div>
                    )}

                </th>
            ))}
            <th className=" w-full  border-b border-border "></th>
        </tr>
    )
}

const selectedStyle = "bg-slate-100 dark:bg-slate-800";

export const RowItemBody = memo(({ onSelect, selectedId, row }: { onSelect: (cx: number, cy: number, id: number, publicId: string) => void, selectedId?: number, row: Row<SupplierResponse> }) => {

    return (
        <>
            <tr
                className={`text-text-muted group relative cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 transition-colors duration-200
                ${row.original.id === selectedId && selectedStyle}`}
                onClick={({ clientX, clientY }) => onSelect(clientX, clientY, row.original.id, row.original.publicId)}
            >
                {
                    row.getVisibleCells().map(cell => (
                        <td key={cell.id}
                            className={clsx("",
                                (cell.column.columnDef.meta as any)?.styleBody,
                                cell.column.getIsFirstColumn() &&
                                    row.original.id === selectedId ? selectedStyle : (cell.column.columnDef.meta as any)?.styleHover
                            )}
                            style={{ width: cell.column.getSize() }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))
                }
                <td className="w-full border-b border-border"> </td>
            </tr>

        </>
    )
})