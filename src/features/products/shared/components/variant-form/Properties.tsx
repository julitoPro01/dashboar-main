
import { useFormContext, useWatch } from "react-hook-form";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { VariantForm } from "../../../types";
import { useRegisterSystemAttributes } from "../../hooks";

type Props = { isEdit?: false } | { isEdit: true, id: number }


export const Properties = (props: Props) => {

    const { control } = useFormContext<VariantForm>()

    const attributes = useWatch({ control, name: "categorization.systemAttributes" })

    const { original } = useRegisterSystemAttributes({
        entity: "variant",
        isEdit: props.isEdit,
        id: props.isEdit ? props.id : undefined,
    })

    console.log(attributes)

    return (
        <section className="space-y-3">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-3 font-semibold text-text">
                    <HiOutlineColorSwatch
                        size={18}
                        className="text-primary"
                    />
                    <span>
                        1. Propiedades de la variante
                    </span>
                </h3>

                <span className="text-xs text-text-muted">
                    Obligatorio
                </span>
            </div>

            {/* Taxonomy context */}
            <div className="rounded-md border border-border-subtle bg-bg-soft-blue p-3">
                <p className="text-[13px] text-text-muted">
                    Propiedades heredadas de la taxonomía del catálogo:
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm">
                    <span className="text-primary">
                        Producto
                    </span>

                    <span className="text-text-subtle">
                        →
                    </span>

                    <span className="text-text">
                        Ropa
                    </span>

                    <span className="text-text-subtle">
                        →
                    </span>

                    <span className="text-text">
                        Camisetas
                    </span>

                    <span className="text-text-subtle">
                        →
                    </span>

                    <span className="font-semibold text-primary">
                        Variante activa
                    </span>
                </div>
            </div>


        </section>
    );
};
