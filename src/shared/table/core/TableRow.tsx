import { flexRender, Header, HeaderGroup, Row, VisibilityState } from "@tanstack/react-table"
import clsx from "clsx"
import { memo } from "react";
import { useSortableItemContext } from "../../sortable";
// import { useSortableItemContext } from "../../sortable";

export const HeaderRow = <T extends Record<string, any>>({ group }: { group: HeaderGroup<T> }) => {
    return (
        <tr className="border-b border-border bg-surface">
            {group.headers.map(cell => (
                <HeaderCell key={cell.id} header={cell} size={cell.getSize()} isResizing={cell.column.getIsResizing()} />
            ))}
            <th className=" w-full  border-b border-border"></th>
        </tr>
    )

}

interface HeaderCell { header: Header<any, unknown>, size: number, isResizing: boolean }
const HeaderCell = memo(({ header, size, isResizing }: HeaderCell) => {

    const column = header.column;
    const columnDef = column.columnDef;

    return (
        <th
            className={clsx("group/resize", columnDef.meta?.styleHeader)}
            style={{ width: size }}
        >
            {flexRender(columnDef.header, header.getContext())}

            {/* RESIZING */}
            {column.getCanResize() && (
                <div
                    className="absolute right-0 top-0 h-full  w-2 group-hover/resize:visible invisible group cursor-col-resize select-none touch-none flex items-center justify-center"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                >
                    <div
                        className={clsx(
                            "w-1 h-3/5 rounded-full transition-all",
                            isResizing
                                ? "bg-primary"
                                : "bg-border group-hover:bg-border-strong group-hover:h-4/5"
                        )}
                    />
                </div>
            )}

        </th>
    )
})

//-----------------------

// const selectedStyle = "bg-slate-100 dark:bg-[#202940]/95 ";
const selectedStyle = "bg-bg-select dark:bg-slate-800 border-border-select/50 text-text-muted";
export type OpenPanelParams<T = Record<string, any>> = {
    cx: number, // clientX
    cy: number, // clientY
    original: T
}

interface RowProps {
    isSelected?: boolean,
    canSelect?: boolean
    row: Row<any>,
    onSelect?: (original: any) => void;
    onOpenPanel?: (_: OpenPanelParams<any>) => void;
    rowIndexId?: boolean;
}
export const BodyRowMemo = memo(({ row, rowIndexId, isSelected = false, canSelect = false, onSelect, onOpenPanel }: RowProps) => {

    return <BodyRow row={row} isSelected={isSelected} canSelect={canSelect}
        onSelect={onSelect} onOpenPanel={onOpenPanel} rowIndexId={rowIndexId} />
})

export const BodyRow = ({ row, rowIndexId, isSelected = false, canSelect = false, onSelect, onOpenPanel }: RowProps) => {

    return (
        <tr
            className={`group relative cursor-pointer border-b border-border transition-colors duration-200
                ${isSelected ? selectedStyle : "hover:bg-slate-100  hover:dark:bg-slate-800/95 "}`}
            onClick={({ clientX, clientY }) => {

                onOpenPanel && onOpenPanel({ cx: clientX, cy: clientY, original: row.original })
                onSelect && onSelect(row.original)
                canSelect && row.toggleSelected();
            }}

            data-row-index={rowIndexId ? row.id : row.index}
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
            <td className={`w-full`}> </td>
        </tr>
    )
}

export const SortableRow = memo(({ row, isSelected = false, canSelect = false, onSelect, onOpenPanel }: RowProps) => {
    const { ref, isDragging } = useSortableItemContext();

    return (
        <>

            <tr
                className={`group relative ${isDragging ? "z-50 opacity-50" : "opacity-100"} cursor-pointer border-b border-border transition-colors duration-200
                ${isSelected ? selectedStyle : "hover:bg-slate-100  hover:dark:bg-slate-800/95 "}`}
                onClick={({ clientX, clientY }) => {

                    onOpenPanel && onOpenPanel({ cx: clientX, cy: clientY, original: row.original })
                    onSelect && onSelect(row.original)
                    canSelect && row.toggleSelected();
                }}
                ref={ref }
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
                <td className="w-full"> </td>
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
                <td className="w-full"> </td>
            </tr>

        </>
    )
}

