import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

import { IoImagesOutline } from "react-icons/io5";
import { SortableItem } from "./SortableItem";
import { DragDropProvider } from "@dnd-kit/react";
import { moveDragEnd } from "@/src/shared/sortable";

export const ImageGallery = () => {

    const [images, setImages] = useState(imgs);

    const handleDragEnd = moveDragEnd(images, (imgs) => {
        setImages(imgs)
    })


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
                            Galería de imágenes
                        </h3>

                        <p className="text-sm text-text-muted">
                            Agrega imágenes del producto y define cuál será la principal.
                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-bg-soft-blue px-3 py-1 text-xs font-medium text-primary">
                    2 / 5
                </span>

            </header>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-5 py-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">

                <DragDropProvider onDragEnd={handleDragEnd} >

                    {images.map((v,i) => {

                        return (
                            <SortableItem key={v.id}
                                index={i}
                                id={v.id}
                                isMain={v.isMain} order={v.order}
                            >
                                <img
                                    src="/assets/notfound.jpg"
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />

                            </SortableItem>
                        )
                    })}

                </DragDropProvider>

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

const imgs = [
    { id: 1, isMain: true, order: 1 },
    { id: 2, isMain: false, order: 2 },
    { id: 3, isMain: false, order: 3 },
    { id: 4, isMain: false, order: 4 },
]