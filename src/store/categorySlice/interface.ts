
export type Category = {
    id: number,
    name: string,
    recordStatusId: number,
    parentId?:number
}

export interface StateCategory {
    mainCategory?: Category;
    selectedCategory?: Category;
    childrenCategories: Category[];
    historyCategory:{
        lastMainUpdate?:Category;
        lastSubUpdate?:Category;
        lastSubDelete?:Category;
    }
}

type History = "deleteSub" | "updateSub" | "updateMain";

export interface ActionCategory {
    setMainCategory: (_: Category) => void;
    setSelectCategory: (_?: Category) => void;
    setChildrenCategory: (_: Category[]) => void;
    setHistoryCategory:(type:History , _:Category)=>void;
    setCleanStateCategory:()=>void;
}

export type CategorySlice = StateCategory & ActionCategory; 