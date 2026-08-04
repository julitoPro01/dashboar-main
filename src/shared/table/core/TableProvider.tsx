"use client"
import { Table } from "@tanstack/react-table"
import { createContext, useContext, useMemo } from "react";
import { useTable, UseTableProps } from "./useTable";

type Context = {
  table: Table<any> | null;
}

const TableContext = createContext<Context | null>(null);

interface Props extends UseTableProps<any[]> {
  children: React.ReactNode;
}

export const TableProvider = <T extends any>({ children, ...res }: Props) => {

  const table = useTable<T[]>(res);

  const value = useMemo(() => ({table}), [table]);

  return (
    <TableContext.Provider value={value} >
      {children}
    </TableContext.Provider>
  )
}


export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext debe usarse dentro de un TableProvider');
  }
  return context;
};