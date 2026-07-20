
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

                <div className="bg-surface border border-border rounded-xl shadow-card p-3">
                    <p className="text-text-muted text-xs uppercase mb-2">
                        Subcategorías
                    </p>

                    <p className="text-2xl font-bold text-text-strong">
                        {childCategoriesCount}
                    </p>
                </div>

                <div className="bg-surface border border-border rounded-xl shadow-card p-3">
                    <p className="text-text-muted text-xs uppercase mb-2">
                        Attributos
                    </p>

                    <p className="text-2xl font-bold text-text-strong">
                        {attributeCount}
                    </p>
                </div>
            </div>
        </section>
    )
}
