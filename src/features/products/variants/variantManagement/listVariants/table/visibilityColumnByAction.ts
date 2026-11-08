import { VariantTableAction } from "@/src/store/variantSlice";
import { VARIANT_COLUMN_ID } from "./columnName";

type Column=Partial<Record<keyof typeof VARIANT_COLUMN_ID, boolean>>
const column = (view: Column) => ({
     [VARIANT_COLUMN_ID.sortableOrder]: view.sortableOrder ?? false, 
    [VARIANT_COLUMN_ID.orderInput]:view.orderInput ?? false
    })

export const visibilityColumnByAction = {
    list: column({}),

    reorder: column({sortableOrder:true}),
    // TODO:...
    multipleSelection: {

    },
    details: column({}),
    editMode:column({orderInput:true})
    // edit: {
    //     index: false,
    //     selection: false,
    //     order: false,
    //     orderEdit: true,
    //     selectionEdit: true
    // },
} satisfies Record<VariantTableAction["type"], Record<string, boolean>> 
