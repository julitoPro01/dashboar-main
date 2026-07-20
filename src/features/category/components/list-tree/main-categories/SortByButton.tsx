import { APP_ROUTES, withQueryParams } from "@/src/shared/routes";
import { SortOrderButton } from "@/src/shared/table"
import { useRouter, useSearchParams } from "next/navigation"

export const SortByButton = () => {

    const search = useSearchParams();
    const order = search.get("order") as any;

    const router = useRouter();

    const onToogle = () => {
        const ord = order?.toLowerCase() === "asc" ? "desc" : "asc";

        const url = withQueryParams("", { order: ord }, search);
        router.replace(url);
    }

    return (
        <SortOrderButton className="cursor-pointer ml-auto text-text-subtle hover:text-primary"
            active={true}
            order={order}
            onToggle={onToogle}
            size={25}
        />
    )
}
