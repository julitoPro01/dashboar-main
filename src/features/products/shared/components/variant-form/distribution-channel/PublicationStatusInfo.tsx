import { InfoPopover } from "@/src/shared/components/floating";

const PUBLICATION_STATUS_INFO = [
    {
        label: "Activo",
        description:
            "La variante está habilitada para comercialización en este canal.",
    },
    {
        label: "Borrador",
        description:
            "La configuración está en preparación y aún no está habilitada.",
    },
    {
        label: "Inactivo",
        description:
            "La variante está temporalmente deshabilitada en este canal.",
    },
];

export const PublicationStatusInfo = () => {


    return (

        <InfoPopover>

            <div className="mb-3 text-xs">
                <h4 className=" font-semibold text-text">
                    Estados de publicación
                </h4>

                <p className="mt-1 text-xs text-text-muted">
                    Define la disponibilidad de la variante en cada
                    canal de comercialización.
                </p>
            </div>

            <ul className="space-y-3 mt-1 list-disc pl-5 text-xs text-text-muted">

                {PUBLICATION_STATUS_INFO.map(
                    ({ label, description }) => (
                        <li key={label}>
                            <strong className="text-text">{label}:</strong>{" "}
                            {description}
                        </li>
                    )
                )}
            </ul>


        </InfoPopover>
    );
};