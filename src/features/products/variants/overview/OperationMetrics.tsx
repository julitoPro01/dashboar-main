
export const OperationMetrics = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-base mb-space-base">
            <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface-variant">Variantes activas</span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">grid_view</span>
                </div>
                <div className="flex items-baseline gap-space-xs mt-space-xs">
                    <span className="font-display-sm text-display-sm font-bold text-on-surface font-data-mono leading-none">8</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">totales</span>
                </div>
            </div>
            <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-on-surface-variant">Stock disponible</span>
                    <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                </div>
                <div className="flex items-baseline gap-space-xs mt-space-xs">
                    <span className="font-display-sm text-display-sm font-bold text-on-surface font-data-mono leading-none">124</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">unidades</span>
                </div>
            </div>
            <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-tertiary">Stock crítico</span>
                    <span className="material-symbols-outlined text-[18px] text-tertiary">warning</span>
                </div>
                <div className="flex items-baseline gap-space-xs mt-space-xs">
                    <span className="font-display-sm text-display-sm font-bold text-tertiary font-data-mono leading-none">3</span>
                    <span className="font-label-sm text-label-sm text-tertiary-container bg-tertiary-fixed px-1 rounded font-medium">&lt; 10 un.</span>
                </div>
            </div>
            <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-error">Sin inventario</span>
                    <span className="material-symbols-outlined text-[18px] text-error">block</span>
                </div>
                <div className="flex items-baseline gap-space-xs mt-space-xs">
                    <span className="font-display-sm text-display-sm font-bold text-error font-data-mono leading-none">1</span>
                    <span className="font-label-sm text-label-sm text-on-error-container bg-error-container px-1 rounded font-medium">Agotada</span>
                </div>
            </div>
        </div>
    )
}
