"use client";
import { errorMessages, IMAGE_STYLE } from "@/src/constants"
import Image from "next/image"
import { IoAnalytics, IoInformationCircle } from "react-icons/io5";
import { GoLightBulb } from "react-icons/go";
import { DynamicModal } from "@/src/components/modal";
import { useStore } from "@/src/store/useStore";
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { getSupplier } from "@/src/action";
import { ErrorServer, Skeleton } from "@/src/components/ui";
import { SupplierDetailsResponse } from "@/src/interfaces/supplier";
import { sleep } from "@/src/utils";

export const Details = () => {

    const setViewDetails = useStore(v => v.setViewSupplierDetails);
    const viewDetails = useStore(v => v.viewSupplierDetails);

    const onClose = () => setViewDetails(false)


    if (!viewDetails.id) return null;

    return (
        <Modal id={viewDetails.id} onClose={onClose} open={viewDetails.modalOpen} />
    )
}


const Modal = ({ id, open, onClose }: { id: number, open: boolean, onClose: () => void }) => {

    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery({
        queryKey: ['suppliers-details', id],
        queryFn: async () => {
            const isFirst = !queryClient.getQueryData(['suppliers-details', id]);
            const res = getSupplier({to:"details",id});
            if (isFirst)
                await sleep(1000);

            return res;
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
    });

    const isOk = data?.ok;
    const values = data?.data;

    return <DynamicModal
        title="Detalles"
        size="4xl"
        modalOpen={open}
        onCloseModal={onClose} >
        {
            isFetching
                ? <Loading />
                : !isOk ? <Error />
                    : <Content values={values!} />
        }
    </DynamicModal>
}

const Loading = () => <div className="p-6"><Skeleton className="w-full h-100" /></div>;
const Error = () => <div className="p-6"><ErrorServer Title={errorMessages.generic.description} /></div>;
const Content = ({ values }: { values: SupplierDetailsResponse }) => <main className="flex-1 overflow-y-auto p-6">
    <div className="max-w-6xl mx-auto">
        {/* <!-- Header Section --> */}
        <div className="mb-10">
            <p className="text-text-muted">Gestione los detalles del proveedor para su red operativa.</p>
        </div>
        {/* <!-- Form Grid --> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* <!-- Left Column: Información General --> */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <span className="text-primary text-xl"> <IoInformationCircle /> </span>
                    <h2 className="text-text text-xl font-bold">Información General</h2>
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-6">
                            <div className={`${IMAGE_STYLE.preview} rounded-xl border-2 border-dashed border-border-strong`}>
                                <Image
                                    fill
                                    src={"/assets/notfound.jpg"}
                                    alt="Logo" className={IMAGE_STYLE.image}
                                    priority={true}
                                    sizes={IMAGE_STYLE.size_preview} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-text-muted text-sm line-clamp-5 wrap-break-word"> {values.name} </span>
                    </div>
                    <div>
                        <span className="text-text-muted text-sm"> {values.description} </span>
                    </div>
                </div>
            </div>
            {/* <!-- Right Column: Detalles de Operación --> */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <span className="text-xl text-primary"><IoAnalytics /></span>
                    <h2 className="text-text text-xl font-bold">Detalles de Operación</h2>
                </div>
                <div className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-text text-sm font-semibold">Dirección</span>
                        <span className="text-text-muted text-sm "> {values.address} </span>
                    </div>
                    {/* TODO: PARA SUPER-ADMIN */}
                    <div className="flex flex-col gap-3">
                        <span className="text-text text-sm font-semibold px-1">Modo de relación</span>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-6 py-2 rounded-full border border-border-strong bg-surface-light text-text-muted text-sm select-none" >
                                {values.relationMode}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-text text-sm font-semibold px-1">Capacidades</span>
                        <div className="flex flex-wrap gap-3">
                            {
                                values.capabilities.map(v => (
                                    <span key={v} className="px-6 py-2 rounded-full border border-border-strong bg-surface-light text-text-muted text-sm select-none" >
                                        {v}
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20">
                        <div className="flex gap-4">
                            <span className="text-primary text-2xl"><GoLightBulb /> </span>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Recomendación del sistema</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Según el tipo de negocio, sugerimos habilitar “Soporte logístico extendido” en la pestaña de configuración avanzada.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</main>;
