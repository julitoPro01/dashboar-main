
interface TitleProps {
    productName: string;
    totalVariants: number;
    activeVariants: number;
    sku:string;
}

export const Title = ({
    productName,
    totalVariants,
    activeVariants,
    sku
}: TitleProps) => {
    return (
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <h1 className="min-w-0 font-headline-lg text-headline-lg font-bold tracking-tight text-on-surface">
                Gestión de variantes
                <span className="text-primary">
                    {" "}de {productName} - {sku}
                </span>
            </h1>

            <p className="flex shrink-0 items-center gap-2 text-body-md font-body-md text-on-surface-variant">
                <span>
                    {totalVariants}{" "}
                    {totalVariants === 1 ? "variante" : "variantes"}
                </span>

                <span aria-hidden="true" className="text-text-secondary">·</span>

                <span>
                    <span className="font-semibold text-on-surface">
                        {activeVariants}
                    </span>{" "}
                    activas
                </span>
            </p>
        </div>
    );
};
