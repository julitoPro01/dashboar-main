import { useStore } from "@/src/store/useStore"

export const VariantTaxonomyContext = () => {

    const category = useStore(v => v.variantBaseProduct?.category)

    if (!category) return null

    return (
        <div className="rounded-md border border-border-subtle bg-bg-soft-blue p-3">
            <p className="text-[13px] text-text-muted"> Propiedades heredadas de la taxonomía del catálogo: </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm">
                {
                    category.paths?.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-x-1.5"> {index > 0 && (<span className="text-text-subtle">→</span>)}
                            <span className={index === (category.paths?.length ?? 0) - 1 ? "font-semibold text-primary" : index === 0 ? "text-primary" : "text-text"} > {item.name} </span>
                        </div>
                    ))
                }
               
            </div>
        </div>
    )
}
