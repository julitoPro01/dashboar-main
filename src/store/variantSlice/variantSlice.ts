import { VariantSlice } from "./type";
import { StateCreator } from "zustand";
import { Store } from "../store.type";
import { VARIANT_COLUMN_ID } from '../../features/products/variants/variantManagement/listVariants/table/columnName';


export const variantSlice: StateCreator<Store, [], [], VariantSlice> = (set, get) => ({

    variantBaseProduct: undefined,
    setVariantBaseProduct: (state) => set({ variantBaseProduct: state }),

    variantUpsert: undefined,
    setVariantUpsert: (state) => set({ variantUpsert: state }),

    variantDetailsId: undefined,
    setVariantDetailsId: (id) => set({ variantDetailsId: id }),

    variantTableAction: { type: "list", version: 0 },
    setVariantTableAction(type, newVersion = false) {
        const version = get().variantTableAction.version;
        set({ variantTableAction: { type, version: newVersion ? version + 1 : version } })
    },

    variantSelected: undefined,
    setVariantSelect(selected) {
        set({ variantSelected: selected })
    },

    variantSelectedCells: {
        // No se usa en modo edición
        [VARIANT_COLUMN_ID.sortableOrder]: { version: 0, cell: {} },

        [VARIANT_COLUMN_ID.orderInput]: { version: 0, cell: {} },
        [VARIANT_COLUMN_ID.image]: { version: 0, cell: {} },
        [VARIANT_COLUMN_ID.variant]: { version: 0, cell: {} },
        [VARIANT_COLUMN_ID.attributes]: { version: 0, cell: {} },
        [VARIANT_COLUMN_ID.price]: { version: 0, cell: {} },
        [VARIANT_COLUMN_ID.status]: { version: 0, cell: {} },
    },
    setVariantSelectCells(
        key_columnName,
        key_originalId,
        cell
    ) {
        const cells = get().variantSelectedCells;
        const currentColumn = cells[key_columnName];

        set({
            variantSelectedCells: {
                ...cells,
                [key_columnName]: {
                    // 1. Mantenemos las propiedades de la columna 
                    ...currentColumn,
                    // 2. Abrimos la nueva capa 'cell' obligatoria
                    cell: {
                        ...currentColumn?.cell,
                        [key_originalId]: cell
                            ? { ...cell, selectedAt: Date.now() }
                            : undefined
                    }
                }
            }
        });
    },
    variantReagentColumn(column_name) {
        const cells = get().variantSelectedCells;
        const key_columnId = VARIANT_COLUMN_ID[column_name];
        const currentColumn = cells[key_columnId];
        set({
            variantSelectedCells: {
                ...cells,
                [key_columnId]: {
                    ...currentColumn,
                    version: currentColumn.version + 1
                }
            }
        });
    },


})
