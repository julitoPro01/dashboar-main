import { SortByTypeOld } from "../pagination/types";


export const buildOrderBy = <T extends object>(
    sortBy: SortByTypeOld,
    order: "asc" | "desc",
    map: Partial<Record<SortByTypeOld, keyof T>>) => {
    if (sortBy === "order") return [{ id: order }];
    const key = map[sortBy];
    if (key) return [{ [key]: order }, { id: order }];
    return [{ id: order }]
}