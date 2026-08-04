import { useStore } from "@/src/store/useStore";

export const SubCategoryMetrics = ({ childCategoriesCount }: { childCategoriesCount: number }) => {

    const selected = useStore(v => v.selectedCategory);

    return (
        <>
            {
                selected?.hasChildren &&
                <div className="bg-surface border border-border rounded-xl shadow-card p-3">
                    <p className="text-text-muted text-xs uppercase mb-2">
                        Subcategorías
                    </p>

                    <p className="text-2xl font-bold text-text-strong">
                        {childCategoriesCount}
                    </p>
                </div>
            }
        </>
    )
}
