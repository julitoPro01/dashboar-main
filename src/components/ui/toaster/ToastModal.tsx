
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { ExternalToast, toast } from "sonner";

interface Props {
    title: string;
    link?: {
        href: string;
        title: string;
    };
    action?: {
        func: () => void;
        title: string;
        disabled?: boolean
    };
    activeBtnClose?: boolean;
    contendNode: React.ReactNode
}

export const ToastModal = (value: Props, data?: ExternalToast) => {


    const { title, link, action, activeBtnClose, contendNode } = value;

    return toast.custom(
        (t) => (
            <div
                className={`relative flex max-w-lg w-full flex-col gap-3 rounded-2xl border border-neutral-700/50 
        bg-linear-to-br from-neutral-950 to-neutral-900 p-5 text-base text-neutral-200 
        shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-200`}
            >

                {/* Contenido */}
                <div className="flex-1 space-y-4">
                    {/* Título con subrayado decorativo */}
                    <div className="space-y-1">
                        <h1 className="font-semibold text-neutral-100 tracking-tight">{title}</h1>
                        {
                            action && action.disabled
                                ?
                                <div className="h-px w-full bg-linear-to-r from-orange-500/50 to-transparent"></div>
                                :
                                <div className="h-px w-full bg-linear-to-r from-green-500/50 to-transparent"></div>
                        }
                    </div>

                    {/* Contenido principal con mejor espaciado */}
                    <div className="py-2">
                        <div className="rounded-lg bg-neutral-900/30 p-3">
                            {contendNode}
                        </div>
                    </div>

                    {/* Link opcional con mejor visual */}
                    {link && (
                        <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-green-400 
                    hover:text-green-300 transition-colors duration-200"
                        >
                            <span className="underline-offset-3 group-hover:underline">{link.title}</span>
                            <span className="text-xs opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
                        </Link>
                    )}

                    {/* Acciones con mejor diseño */}
                    {action && (
                        <div className="flex justify-between gap-3 pt-2">
                            <button
                                disabled={action.disabled}
                                onClick={() => action.func()}
                                className="flex-1 rounded-lg bg-linear-to-r from-green-600 to-green-700 
                        px-4 py-2.5 text-sm font-semibold text-white shadow-md 
                        hover:from-green-500 hover:to-green-600 hover:shadow-lg 
                        active:scale-[0.98] transition-all duration-200 
                        disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 
                        disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                {action.title}
                            </button>
                            <button
                                onClick={() => toast.dismiss(t)}
                                className="flex-1 rounded-lg border border-neutral-600 bg-neutral-800/50 
                        px-4 py-2.5 text-sm font-medium text-neutral-300 
                        hover:bg-neutral-700 hover:text-neutral-100 hover:border-neutral-500 
                        active:scale-[0.98] transition-all duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                {/* Botón cerrar mejorado */}
                {activeBtnClose && (
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="absolute top-3.5 right-3.5 rounded-full p-1.5 
                bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 
                hover:bg-neutral-700/80 backdrop-blur-sm 
                transition-all duration-200 active:scale-90"
                        aria-label="Cerrar"
                    >
                        <CgClose className="w-4 h-4" />
                    </button>
                )}
            </div>
        ), {
        duration: Number.POSITIVE_INFINITY,
        ...data
    });
};
