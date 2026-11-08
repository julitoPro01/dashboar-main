import { OrderTypeOld, SortByTypeOld } from "../pagination";

type Props = OrderTypeOld | undefined;
type Return = { order: Props, sortBy: SortByTypeOld }

export const toggleSortOrder = (order: Props, defSort: SortByTypeOld,querySort:SortByTypeOld): Return => {
    if(defSort !== querySort) return {order:"desc",sortBy:defSort};
    if(order==="desc") return {order:"asc",sortBy:defSort};
    return {order:"asc", sortBy:"order"}

}