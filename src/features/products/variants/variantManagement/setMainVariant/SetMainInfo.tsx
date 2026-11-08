import { InfoPopover } from "@/src/shared/components/floating"

export const SetMainInfo = () => {
    return (
        <InfoPopover initBoot={{ localStoreName: "products.variants.set-main-info.dismissed" }}
            positionY={{ custom: "bottom-full mb-2" }}
        >
            <div className="mb-3 text-xs">
                <h4 className=" font-semibold text-info-text">
                    Asignación de una variante como principal
                </h4>

                <p className="mt-1 text-text-muted">
                    La variante principal es la que representa visualmente
                    al producto base y sirve como referencia para mostrarlo
                    en el catálogo.
                </p>

                <p className="mt-2 text-text-muted">
                    Puedes elegir la variante que mejor represente al
                    producto, por ejemplo, por su color o presentación.
                    Esta selección no modifica el precio, el inventario
                    ni las propiedades de las demás variantes.
                </p>
            </div>

        </InfoPopover>
    )
}
