import { IoToggleOutline } from "react-icons/io5"

//TODO: Mostrar información en base al estado del producto

export const RecordStatusInfo = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border-input pb-2 text-primary">
                <IoToggleOutline size={22} />

                <h3 className="font-semibold text-text">
                    Estado del producto
                </h3>
            </div>

            <div className="rounded-md bg-bg-soft-blue px-3 py-2.5">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <span className="block text-sm font-semibold text-primary">
                            Estado del registro
                        </span>

                        <span className="mt-0.5 block text-xs text-text-muted">
                            Controla el ciclo de vida interno del producto.
                        </span>
                    </div>

                    <span className="shrink-0 rounded bg-surface px-2 py-1 text-xs font-semibold text-text-muted">
                        Borrador
                    </span>
                </div>

                <div className="mt-2 border-t border-border-subtle pt-2">
                    <p className="text-xs leading-5 text-text-muted">
                        Para activar este producto, debes crear al menos una
                        variante y activarla.
                    </p>
                </div>
            </div>
        </div>
    );
};
