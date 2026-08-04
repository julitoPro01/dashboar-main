import { OrderType, SortByType } from "../pagination";

type Props = OrderType | undefined;
type Return = { order: Props, sortBy: SortByType }

export const toggleSortOrder = (order: Props, defSort: SortByType,querySort:SortByType): Return => {
    if(defSort !== querySort) return {order:"desc",sortBy:defSort};
    if(order==="desc") return {order:"asc",sortBy:defSort};
    return {order:"asc", sortBy:"order"}

}