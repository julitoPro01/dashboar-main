import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField/inputFieldStyle"
import clsx from "clsx"
import { MdOutlineCategory } from "react-icons/md"

export const CategorizationForm = () => {
    return (
        <section className="rounded-xl border border-border bg-surface p-6 shadow-sm ">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-text">
                <span className="text-primary"><MdOutlineCategory /></span> Categorización
            </h3>

            <hr className="my-6 border-border-subtle" />
            {/* <!-- Categories Selection --> */}
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className={INPUT_FIELD_STYLE.label + " " + INPUT_FIELD_STYLE.isRequired}>Categoría de sección</label>
                    <div className="flex items-center gap-2">
                        <select
                            defaultValue={""}
                            className={clsx(INPUT_FIELD_STYLE.base, {
                                [INPUT_FIELD_STYLE.states.normal]: true
                            })}>
                            <option value="">Seleccione una categoría</option>
                            <option value="1">Electronics &gt; Audio</option>
                            <option value="2">Electronics &gt; Accessories</option>
                            <option value="3">Mobile &gt; Audio</option>
                            <option value="4">Professional Gear</option>
                        </select>
                    </div>
                </div>
                {/* category tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        Electronics
                    </div>
                    <span className="text-primary">&gt;</span>
                    <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        Audio
                    </div>
                    <span className="text-primary">&gt;</span>
                    <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        Bluetooth
                    </div>
                </div>
            </div>
            <hr className="my-6 border-border-subtle"/>
            {/* <!-- Supplier Selection --> */}
            <div className="flex flex-col gap-2">
                <label className={INPUT_FIELD_STYLE.label + " " + INPUT_FIELD_STYLE.isRequired}>Proveedor</label>
                <select
                    defaultValue={""}
                    className={clsx(INPUT_FIELD_STYLE.base, {
                        [INPUT_FIELD_STYLE.states.normal]: true
                    })}>
                    <option value="">Elija un proveedor</option>
                    <option value="s1">TechNova Solutions Ltd.</option>
                    <option value="s2">Global Audio Imports</option>
                    <option value="s3">Direct Sourcing Inc.</option>
                </select>
                <p className="text-[10px] text-slate-400 font-medium">
                    Última compra a este proveedor: hace 12 días
                </p>
            </div>
        </section>
    )
}
