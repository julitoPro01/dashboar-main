import { flexRender, Header, HeaderGroup } from "@tanstack/react-table";
import clsx from "clsx";
import { memo } from "react";
import { useStore } from "@/src/store/useStore";

export const HeaderRow = <T extends Record<string, any>>({ group }: {
    group: HeaderGroup<T>}) => {

    return (
        <tr className="border-b border-border bg-surface">
            {group.headers.map(cell => {
                return (
                    <HeaderCell key={cell.id} header={cell} size={cell.getSize()}
                        isResizing={cell.column.getIsResizing()}
                        columnId={cell.column.id}
                    />
                )
            })}
            <th className=" w-full  border-b border-border"></th>
        </tr>
    )

}

interface HeaderCell { header: Header<any, unknown>, size: number, isResizing: boolean,columnId:string  }
const HeaderCell = memo(({ header, size, isResizing, columnId }: HeaderCell) => {

    const column = header.column;
    const columnDef = column.columnDef;

    //Es reactivo si su referencia cambia
    useStore(v=>v.variantSelectedCells[columnId].version)

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
