import { MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdOutlineStorefront } from "react-icons/md"
import { PublicationStatusInfo } from "./distribution-channel/PublicationStatusInfo"
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { VariantForm } from "../../../types";
import { Checkbox } from "@/src/shared/form";
import { PUBLICATION_STATUS } from "../../catalog";

interface Props { isEdit?: boolean }
export const DistributionChannel = ({ isEdit }: Props) => {

    const { control } = useFormContext<VariantForm>();

    return (
        <section className="space-y-2">
            <div className="flex items-center justify-between">

                <h3 className="flex items-center gap-3 font-semibold text-text">
                    <MdOutlineStorefront
                        size={18}
                        className="text-primary"
                    />

                    <span>4. Canal de comercialización</span>
                </h3>
                <PublicationStatusInfo />
            </div>
            {isEdit &&
                <span className="text-amber-500 text-xs">Cambia el estado desde las acciones de la variante</span>
            }
            <div className="space-y-2 text-sm">

                {items.map(v => (
                    <Controller key={v.name}
                        control={control}
                        name={v.name}
                        render={({ field }) => {
                            const isDraft = field.value === PUBLICATION_STATUS.DRAFT;
                            return (
                                <Item
                                    title={v.title}
                                    desc={v.desc}
                                    disabled={isDraft}
                                >
                                    {isEdit ? (
                                        <span
                                            className={field.value === PUBLICATION_STATUS.ACTIVE ? "text-primary" : "text-text-muted"}
                                            role="img"
                                            aria-label={`${v.title}: ${field.value === PUBLICATION_STATUS.ACTIVE ? 'activo' : isDraft ? 'en borrador' : 'inactivo'}`}
                                        >
                                            {field.value === PUBLICATION_STATUS.ACTIVE
                                                ? <MdOutlineCheckBox size={20} />
                                                : <MdCheckBoxOutlineBlank size={20} />}
                                        </span>
                                    ) : (
                                        <Checkbox
                                            checked={field.value === PUBLICATION_STATUS.ACTIVE}
                                            disabled={isDraft}
                                            onChange={({ target }) =>
                                                field.onChange(target.checked ? PUBLICATION_STATUS.ACTIVE : PUBLICATION_STATUS.INACTIVE)
                                            }
                                        />
                                    )}
                                </Item>
                            )
                        }}
                    />
                ))}
            </div>
        </section>
    )
}


interface ItemProps {
    title: string;
    desc: string;
    children: React.ReactNode
    disabled?: boolean
}
const Item = ({ children, title, desc, disabled }: ItemProps) => {
    return (

        <label className=" flex items-start gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
            <div className="flex-1">
                <span className="block text-sm font-semibold text-primary">
                    {title}
                </span>

                <span className="block text-xs text-text-muted">
                    {desc}
                </span>

            </div>

            <div className="flex flex-col items-end gap-1">
                {children}

                {
                    disabled &&
                    <span className="text-xs text-text-muted"> No disponible </span>
                }

            </div>
        </label>
    )
}


const items: {
    name: FieldPath<VariantForm>
    title: string,
    desc: string
}[] = [
        {
            name: "distributionChannels.storeFront.publicationStatus",
            title: "Tienda en línea",
            desc: "Se muestra y se puede comprar en la web"
        },
        {
            name: "distributionChannels.physicalStore.publicationStatus",
            title: "Tienda física",
            desc: "Disponible para venta presencial"
        },
    ]
