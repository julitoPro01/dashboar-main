import { combine } from "zustand/middleware";
import { ActionCategory, StateCategory } from "./interface";

const init: StateCategory = {
    historyCategory: {
        lastMainUpdate: undefined,
        lastSubDelete: undefined,
        lastSubUpdate: undefined
    },
    mainCategory: undefined,
    selectedCategory: undefined,
    childrenCategories: []
}


export const categorySlice = combine<StateCategory, ActionCategory>(
    init,
    (set, get) => ({
        setMainCategory: (state) => (set({ mainCategory: state })),
        setSelectCategory: (state) => (set({ selectedCategory: state })),
        setChildrenCategory: (states) => (set({ childrenCategories: states })),
        setHistoryCategory: (type, state) => {
            if (type === "deleteSub")
                set({ historyCategory: { ...get().historyCategory, lastSubDelete: state } });
            if (type === "updateMain")
                set({ historyCategory: { ...get().historyCategory, lastMainUpdate: state } });
            if (type === "updateSub")
                set({ historyCategory: { ...get().historyCategory, lastSubUpdate: state } });
        },
        setCleanStateCategory: () => (set(init))
    })
)