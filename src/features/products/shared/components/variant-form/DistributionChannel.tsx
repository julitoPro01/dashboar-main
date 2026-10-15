import { MdOutlineStorefront } from "react-icons/md"
import { ChannelItem } from "./distribution-channel/ChannelItem"
import { PublicationStatusInfo } from "./distribution-channel/PublicationStatusInfo"

export const DistributionChannel = () => {
    

    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">

                <h3 className="flex items-center gap-3 font-semibold text-text">
                    <MdOutlineStorefront
                        size={18}
                        className="text-primary"
                    />

                    <span>4. Canal de comercialización</span>
                </h3>
                <PublicationStatusInfo/>
            </div>

            <div className="space-y-2 text-sm">
                <ChannelItem
                    name="storeFront"
                    label="Tienda en línea"
                    description="Comercializa la variante en tu tienda online"
                />



                <ChannelItem
                    name="physicalStore"
                    label="Tienda física"
                    description="Disponible para comercialización en tiendas físicas"
                    disabled
                />

                {/* TODO: Implementarlos en un futuro */}

                {/* <ChannelItem
                    name="marketplace"
                    label="Marketplace"
                    description="Comercializa la variante mediante plataformas externas."
                    disabled
                />
                 */}
                {/* <ChannelItem
                    name="wholesale"
                    label="Venta mayorista"
                    description="Disponible para ventas a clientes mayoristas."
                    disabled
                /> */}
            </div>
        </section>
    )
}
