import { SortByType } from "../pagination/types";


export const buildOrderBy = <T extends object>(
    sortBy: SortByType,
    order: "asc" | "desc",
    map: Partial<Record<SortByType, keyof T>>) => {
    if (sortBy === "order") return [{ id: order }];
    const key = map[sortBy];
    if (key) return [{ [key]: order }, { id: order }];
    return [{ id: order }]
}