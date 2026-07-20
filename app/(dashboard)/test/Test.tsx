"use client";

import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { HTMLProps, useEffect, useMemo, useRef, useState } from "react";

export const Test = () => {


    const [rowSelection, setRowSelection] = useState({})

    const [data, setData] = useState([{ id: 1, firstName: "test 1" }, { id: 2, firstName: "test 2" }, { id: 3, name: "test 3" }])

    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <IndeterminateCheckbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({ row }) => (
                <div className="px-1">
                    <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
        },
        {
            id: "name",
            header: 'Name',
            cell: () => <span>Hello</span>
        },
    ],
        [],
    )

    const table = useReactTable({
        data,
        columns: columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    })

    console.log("hello")

    const Memosh = useMemo(() => table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
                return (
                    <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                            <>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            </>
                        )}
                    </th>
                )
            })}
        </tr>
    )), [])

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td className="p-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllPageRowsSelected(),
                                indeterminate: table.getIsSomePageRowsSelected(),
                                onChange: table.getToggleAllPageRowsSelectedHandler(),
                            }}
                        />
                    </td>
                    <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
                </tr>
            </tfoot>
        </table>
    )
}


function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}


const columns = createColumnHelper<any>();
const columnDef = [
    columns.display(
        {
            id: 'select',
            header: ({ table }) => (
                <IndeterminateCheckbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({ row }) => (
                <div className="px-1">
                    <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
        }),
    columns.accessor("name", {
        id: "name",
        header: () => <span>ATRIBUTO</span>,
        cell: ({ getValue }) => <span>{getValue()}</span>
    })
]