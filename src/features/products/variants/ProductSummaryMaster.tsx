import { VariantBaseProductResponse } from "../types"

interface Props{
    product:VariantBaseProductResponse
}

export const ProductSummaryMaster = ({product}:Props) => {


    return (
        <div className="mt-space-sm bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md min-w-0">
                <div className="w-11 h-11 rounded bg-surface-container-low overflow-hidden shrink-0 flex items-center justify-center">
                    <img className="w-full h-full object-cover" data-alt="High quality flat-lay studio product shot of a premium black combed cotton t-shirt neatly folded on a neutral minimal stone surface with soft corporate lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiD5FavPYktusCBOxAf7nqRgtV6r5Sc3yHeAEknTtnKrB39cHQxrls5Qc0EaQ51jSGxv0LnXnRc5DtXPwI2AVdmqONV0RYgW91vqsIXbQEvuVBPkh0hqAX0pKjXA6EtBxhQcPYuWRZtoupIJVYc-E_t4866bUMqp0GVaJOh_vcnnZI839jJfWYorpG3ga9NlUORQEVbf-vpfJuIq-wxu6gLMRke8vYUSQq1lEHcyLNmgcKr6VoE3QNIA" />
                </div>
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Camiseta básica</span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-data-mono text-label-sm font-medium">PRD-8F4K2M</span>
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm">Categoría Estándar</span>
                    </div>
                    <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        <span>Ropa</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span>Hombre</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-on-surface font-medium">Camisetas</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-space-lg text-body-sm font-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                    <span>4 atributos configurados</span>
                </div>
                <div className="h-3 w-px bg-surface-container-high"></div>
                <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-secondary">style</span>
                    <span className="text-on-surface font-medium">8 variantes generadas</span>
                </div>
                <div className="h-3 w-px bg-surface-container-high hidden lg:block"></div>
                <a className="hidden lg:flex items-center gap-0.5 text-primary hover:underline font-label-md text-label-md" href="#">
                    <span>Configurar matriz</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
            </div>
        </div>
    )
}

