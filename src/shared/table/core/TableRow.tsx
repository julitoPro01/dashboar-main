import { flexRender, HeaderGroup, Row, VisibilityState } from "@tanstack/react-table"
import clsx from "clsx"
import { memo } from "react";
import { useSortableItemContext } from "../../sortable";

export const HeaderRow = <T extends Record<string, any>>({ group }: { group: HeaderGroup<T> }) => {
    return (
        <tr className="border-b border-border bg-surface">
            {group.headers.map((cell, i) => (
                <th key={cell.id}
                    className={clsx("group/resize", (cell.column.columnDef.meta as any)?.styleHeader)}
                    style={{ width: cell.getSize() }}
                >
                    {flexRender(cell.column.columnDef.header, cell.getContext())}

                    {cell.column.getCanResize() && (
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
export type OpenPanelPayload<T> = {
    cx: number, // clientX
    cy: number, // clientY
    original: T
}

interface RowProps {
    isSelected?: boolean,
    canSelect?: boolean
    row: Row<any>,
    columnVisibility?: VisibilityState,
    onSelect?: (original: any) => void;
    onOpenPanel?:(_: OpenPanelPayload<any>) => void;
    reagent?: any
}
export const BodyRow = memo(({ row, isSelected = false, canSelect = false, onSelect, onOpenPanel }: RowProps) => {

    return (
        <>
            <tr
                className={`group relative cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 transition-colors duration-200
                ${isSelected && selectedStyle}`}
                onClick={({ clientX, clientY }) => {

                    onOpenPanel && onOpenPanel({ cx: clientX, cy: clientY, original: row.original })
                    onSelect && onSelect(row.original)
                    canSelect && row.toggleSelected();
                }}
            >
                {
                    row.getVisibleCells().map((cell) => {

                        return <td key={cell.id}
                            className={clsx(
                                cell.column.columnDef.meta?.styleBody,
                                cell.column.getIsFirstColumn() && isSelected ? selectedStyle : cell.column.columnDef.meta?.styleHover
                            )}
                            style={{ width: cell.column.getSize() }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    })
                }
                <td className="w-full border-b border-border"> </td>
            </tr>

        </>
    )
})

export const SortableRow = memo(({ row, isSelected = false, canSelect = false, onSelect, onOpenPanel }: RowProps) => {
    const { style, setNodeRef, isDragging } = useSortableItemContext();

    return (
        <>

            <tr
                className={`group relative ${isDragging ? "z-50" : ""} cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 transition-colors duration-200
                ${isSelected && selectedStyle}`}
                onClick={({ clientX, clientY }) => {

                    onOpenPanel && onOpenPanel({ cx: clientX, cy: clientY, original: row.original })
                    onSelect && onSelect(row.original)
                    canSelect && row.toggleSelected();
                }}
                ref={setNodeRef}
                style={{ ...style }}
            >
                {
                    row.getVisibleCells().map((cell) => {

                        return <td key={cell.id}
                            className={clsx(
                                cell.column.columnDef.meta?.styleBody,
                                cell.column.getIsFirstColumn() && isSelected ? selectedStyle : cell.column.columnDef.meta?.styleHover
                            )}
                            style={{ width: cell.column.getSize() }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    })
                }
                <td className="w-full border-b border-border"> </td>
            </tr>

        </>
    )
})

// TODO: Solo de prueba
export const DynamicBodyRow = ({ row, isSelected = false, canSelect = false, onSelect, onOpenPanel }: RowProps) => {
    return (
        <>
            <tr
                className={`group relative cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 transition-colors duration-200
                ${isSelected && selectedStyle}`}
                onClick={({ clientX, clientY }) => {
                    onOpenPanel && onOpenPanel({ cx: clientX, cy: clientY, original: row.original })
                    onSelect && onSelect(row.original)
                    canSelect && row.toggleSelected();
                }}
            >
                {
                    row.getVisibleCells().map((cell) => {

                        return <td key={cell.id}
                            className={clsx(
                                cell.column.columnDef.meta?.styleBody,
                                cell.column.getIsFirstColumn() && isSelected ? selectedStyle : cell.column.columnDef.meta?.styleHover
                            )}
                            style={{ width: cell.column.getSize() }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    })
                }
                <td className="w-full border-b border-border"> </td>
            </tr>

        </>
    )
}

