"use client";
import { AttributeMetrics } from "./ui/AttributeMetrics";
import { SubCategoryMetrics } from "./ui/SubCategoryMetrics";

interface Props {
    productsCount: number;
    childCategoriesCount: number;
    attributeCount: number;
}
export const Metrics = ({
    productsCount, childCategoriesCount, attributeCount
}: Props) => {

    return (
        <section className="col-span-12 lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">

                <div className="bg-surface border border-border rounded-xl shadow-card p-3">
                    <p className="text-text-muted text-xs uppercase mb-2">
                        Productos
                    </p>

                    <p className="text-2xl font-bold text-text-strong">
                        {productsCount}
                    </p>
                </div>

                <SubCategoryMetrics childCategoriesCount={childCategoriesCount} />
                <AttributeMetrics attributeCount={attributeCount} />
            </div>
        </section>
    )
}
