
export const ProductListHeader = () => {
    return (
        <div className="gap-6 py-6 flex flex-wrap items-end justify-between">
            {/* Title */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-text-strong">
                    Inventario de productos
                </h1>
                <p className="text-sm text-text-muted">
                    Administre y realice un seguimiento de su catálogo global de productos en todos los almacenes.
                </p>
            </div>
        </div>
    )
}
