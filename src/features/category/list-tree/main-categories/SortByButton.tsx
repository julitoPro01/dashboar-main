
import { SortOrderButton } from "@/src/shared/table/filters";
import { useSearchParams } from "next/navigation"

interface Props{onToogle:()=>void}
export const SortByButton = ({onToogle}:Props) => {

    const search = useSearchParams();
    const order = search.get("order") as any;

    return (
        <SortOrderButton className="cursor-pointer ml-auto text-text-muted hover:text-text"
            active={true}
            order={order}
            onToggle={onToogle}
            size={20}
        />
    )
}
