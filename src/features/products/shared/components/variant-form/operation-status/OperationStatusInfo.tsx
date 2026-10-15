import { InfoPopover } from "@/src/shared/components/floating"

export const OperationStatusInfo = () => {
    return (
        <InfoPopover>
                <div className="h-[50dvh] space-y-4 text-text-muted text-xs">
                    <div>
                        <p className="font-semibold text-text">Estado del registro</p>
                        <p >
                            Controla el ciclo de vida de la variante dentro del sistema.
                            Una variante debe estar activa para poder publicarse en los canales de venta.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-text">Estado de venta</p>
                        <ul className="mt-1 list-disc space-y-1 pl-5 ">
                            <li>
                                <strong className="text-text">Disponible:</strong>{" "}
                                se ofrece para la venta según las condiciones de inventario.
                            </li>
                            <li>
                                <strong className="text-text">Próximamente:</strong>{" "}
                                todavía no está disponible para la venta.
                            </li>
                            <li>
                                <strong className="text-text">Hecho por encargo:</strong>{" "}
                                se prepara o fabrica después de recibir el pedido.
                            </li>
                            <li>
                                <strong className="text-text">Descontinuado:</strong>{" "}
                                ya no se ofrece para nuevas ventas.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold text-text">Régimen de inventario</p>
                        <ul className="mt-1 list-disc space-y-1 pl-5 ">
                            <li>
                                <strong className="text-text">Controlar inventario:</strong>{" "}
                                registra las unidades disponibles y descuenta las vendidas.
                                Puedes establecer un umbral mínimo para alertas de reposición.
                            </li>
                            <li>
                                <strong className="text-text">Stock ilimitado:</strong>{" "}
                                no se lleva un conteo de unidades disponibles; se considera que
                                siempre hay existencias.
                            </li>
                            <li>
                                <strong className="text-text">Bajo pedido:</strong>{" "}
                                no se controla una cantidad fija de existencias. Los pedidos se
                                atienden según la capacidad de preparación, fabricación o suministro.
                            </li>
                        </ul>
                    </div>

                    <p className="border-t border-border-subtle py-3 ">
                        <strong className="text-text">Importante:</strong>{" "}
                        las opciones del estado de venta dependen del régimen de inventario
                        seleccionada. La publicación también requiere que la variante y el canal
                        estén activos.
                    </p>
                </div>

        </InfoPopover>
    )
}
