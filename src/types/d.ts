

import '@tanstack/react-table'
import { RowData } from '@tanstack/react-table'
import { MetaOptions } from '../shared/table/core'

// 1. Declaración para archivos CSS (Mantenlo separado)

// 2. Aumento de módulos para TanStack
declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        styleHeader?: string
        styleBody?: string
        styleHover?: string
        fill?: boolean
    }
    interface TableMeta<TData extends RowData> extends MetaOptions { }
}
