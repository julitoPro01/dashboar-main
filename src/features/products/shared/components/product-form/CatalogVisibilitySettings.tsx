import { Button } from "@/src/shared/components/btn"
import { Checkbox, Input, Select } from "@/src/shared/form"
import { IoGlobeOutline, IoPhonePortraitOutline, IoStorefrontOutline, IoToggleOutline } from "react-icons/io5"


//TODO: CAMBIAR DE NOMBRE Y MOVER A OTRA CARPETA
export const CatalogVisibilitySettings = () => {
    return (

        <div className="space-y-4">

            <div className="flex flex-1 items-center gap-3 pb-2 text-primary border-b border-border-input">
                <span className="text-2xl">{<IoToggleOutline />}</span>
                <div className="w-full">
                    <h3 className=" font-semibold text-text">
                        Estado & Canales
                    </h3>
                </div>
            </div>


            {/* Estado del registro */}
            <div className="flex items-center flex-wrap  gap-2 rounded-md bg-bg-soft-blue px-3 py-2.5">
                <div className="min-w-0">
                    <span className="block text-sm font-semibold text-primary">
                        Estado del registro
                    </span>

                    <span className="mt-0.5 block text-xs text-text-muted">
                        Controla el ciclo de vida interno del producto.
                    </span>
                </div>

                <div className="w-full">
                    <Select
                        fieldSize="sm"
                        options={[]}
                        roundedSize="sm"

                    />
                </div>

                <span className="mt-0.5 block text-xs text-text-muted">
                    Para activar este producto debes crear al menos una variante y activarla.
                </span>
            </div>

            {/* Canales de venta */}
            <div className="rounded-md bg-bg-soft-blue px-3 py-2.5">
                <div className="mb-2">
                    <span className="block text-sm font-semibold text-primary">
                        Canales de venta autorizados
                    </span>

                    <span className="mt-0.5 block text-xs text-text-muted">
                        Define dónde puede publicarse y comercializarse el producto.
                    </span>
                </div>

                <div className="space-y-1.5">
                    <label className="flex cursor-pointer items-center justify-between rounded bg-surface px-2.5 py-2">
                        <div className="flex items-center gap-2">
                            <IoGlobeOutline
                                size={18}
                                className="text-primary"
                            />

                            <div>
                                <span className="block text-sm text-text">
                                    Tienda web
                                </span>

                                <span className="block text-xs text-text-muted">
                                    Canal ecommerce
                                </span>
                            </div>
                        </div>

                        <Checkbox />
                    </label>

                    <label className="flex cursor-pointer items-center justify-between rounded bg-surface px-2.5 py-2">
                        <div className="flex items-center gap-2">
                            <IoPhonePortraitOutline
                                size={18}
                                className="text-primary"
                            />

                            <div>
                                <span className="block text-sm text-text">
                                    Aplicación móvil
                                </span>

                                <span className="block text-xs text-text-muted">
                                    Canal nativo
                                </span>
                            </div>
                        </div>

                        <Checkbox />
                    </label>

                    <label className="flex cursor-pointer items-center justify-between rounded bg-surface px-2.5 py-2">
                        <div className="flex items-center gap-2">
                            <IoStorefrontOutline
                                size={18}
                                className="text-primary"
                            />

                            <div>
                                <span className="block text-sm text-text">
                                    Punto de venta
                                </span>

                                <span className="block text-xs text-text-muted">
                                    Sucursales físicas
                                </span>
                            </div>
                        </div>

                        <Checkbox />
                    </label>
                </div>
            </div>

            {/* Disponibilidad */}
            <div className="flex items-center flex-wrap gap-2 rounded-md bg-bg-soft-blue px-3 py-2.5">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="block text-sm font-semibold text-primary"> Fecha de disponibilidad</span>
                        <Button variant="secondary" size="xs">
                            Publicar
                        </Button>
                    </div>

                    <span className="mt-0.5 block text-xs text-text-muted">
                        Programa cuándo estará disponible para su publicación.
                    </span>
                </div>
                <div className="w-full">
                    <Input
                        type="datetime-local"
                        roundedSize="sm"
                    />

                </div>
            </div>
        </div>
        // </FormCard>

    )
}
