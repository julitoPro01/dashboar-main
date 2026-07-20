import { Button } from "@/src/shared/components/btn";
import { BiImageAdd, BiMove, BiTrash, BiStar } from "react-icons/bi";

import { FiEdit2 } from "react-icons/fi";
import { IoImagesOutline } from "react-icons/io5";

export const ImageGallery = () => {

    return (
        <section className="px-8 py-6 rounded-2xl border border-border bg-surface">

            {/* HEADER */}
            <header className="pb-3 flex items-center justify-between border-b border-border">

                <div className="flex items-center gap-3">

                    <span className="text-2xl">
                        <IoImagesOutline size={22} className="text-primary" />
                    </span>

                    <div>

                        <h3 className="text-lg font-semibold text-text-strong">
                            Galería de imágenes*
                        </h3>

                        <p className="text-sm text-text-muted">
                            Agrega imágenes del producto y define cuál será la principal.
                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-bg-soft-blue px-3 py-1 text-xs font-medium text-primary">
                    2 / 5 imágenes
                </span>

            </header>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-5 py-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">

                {/* IMAGE */}
                <article className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-primary bg-surface-light">

                    <img
                        src="/demo.jpg"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* Ribbon */}
                    <div className="absolute left-0 top-4">

                        <div className="rounded-r-full bg-primary px-4 py-1 text-xs font-semibold text-text-inverse shadow-card">

                            Principal

                        </div>

                    </div>

                    {/* Drag */}
                    <div className="absolute right-2 top-2 rounded-lg bg-black/40 p-1 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">

                        <BiMove size={18} />

                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition group-hover:opacity-100">

                        <Button variant="tabLight">
                            <FiEdit2 size={18} />
                        </Button>

                        <Button variant="tabLight">
                            <BiStar size={18} />
                        </Button>

                        <Button variant="danger">
                            <BiTrash size={18} />
                        </Button>

                    </div>

                </article>

                {/* IMAGE */}
                <article className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface-light">

                    <img
                        src="/demo.jpg"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 w-full pb-4 flex items-end justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

                        <Button variant="tabLight" select="tabLight" size="xs">
                            <FiEdit2 size={18} className="text-white" />
                        </Button>

                        <Button variant="tabLight" size="xs" >
                            <BiStar size={18} className="text-white" />
                        </Button>

                        <Button variant="tabLight" size="xs">
                            <BiTrash size={18} className="text-white" />
                        </Button>
                    </div>
                    {/* Order */}
                    <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface font-semibold text-text shadow-card">

                        2

                    </span>
                    {/* Drag */}
                    <div className="absolute right-2 top-2 rounded-lg hover:bg-black/40 p-1 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 cursor-pointer">

                        <BiMove size={28} />

                    </div>
                </article>

                {/* ADD */}
                <button
                    className=" group aspect-square rounded-2xl border-2 border-dashed border-border bg-surface-light transition-all hover:border-primary hover:bg-bg-soft-blue">

                    <div className="flex h-full flex-col items-center justify-center">

                        <BiImageAdd
                            size={48}
                            className="text-text-muted transition duration-300 group-hover:-translate-y-1 group-hover:text-primary"
                        />

                        <span className="mt-4 text-sm font-medium text-text-muted group-hover:text-primary">

                            Agregar imagen

                        </span>

                    </div>

                </button>

            </div>

            {/* FOOTER */}
            <footer className="border-t border-border bg-surface-light px-6 py-4">

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">

                    <span>• Arrastra para cambiar el orden.</span>

                    <span>• La imagen definida "Principal" será la portada.</span>

                    <span>• Máximo 5 imágenes.</span>

                    <span>• Hasta 5 MB por imagen.</span>

                </div>

            </footer>

        </section>
    )

}
