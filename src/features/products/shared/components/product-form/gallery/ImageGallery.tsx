import { IoImagesOutline } from "react-icons/io5";
import { DragDropProvider } from "@dnd-kit/react";
import { AddImageCard, FIELD_STYLE, FIELD_VALIDATION } from "@/src/shared/form";
import { Button } from "@/src/shared/components/btn";
import { MdRestartAlt } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { SortableImageCard } from "../../gallery/SortableImageCard";
import { useCrudImageGallery } from "../../../hooks";
type Props = { isEdit?: boolean }

export const ImageGallery = ({ isEdit }: Props) => {

    const {
        handleAdd,
        handleDelete,
        handleDragEnd,
        handleReset,
        handleSetPrimary,
        handleUpdate,
        isSubmitting,
        error,
        dirty,
        currentCount,
        images,
        maxImages
    } = useCrudImageGallery();


    return (
        <section className="px-8 py-6 rounded-2xl border border-border bg-surface">

            {/* HEADER */}
            <header className="pb-3 flex items-center justify-between border-b border-border">

                <div className="flex items-center gap-3">

                    <span className="text-2xl">
                        <IoImagesOutline size={22} className="text-primary" />
                    </span>

                    <div>

                        <h3 className={`text-lg font-semibold text-text-strong ${FIELD_VALIDATION["*"]}`}>
                            Galería de imágenes
                        </h3>

                    </div>

                </div>

                <div className="inline-flex gap-4">
                    <span className="rounded-full ml-auto bg-bg-soft-blue px-3 py-1 text-xs font-medium text-primary">
                        {currentCount} / {maxImages}
                    </span>
                    {isEdit &&
                        <>
                            <Button variant="basic" size="xs" padding="p-0"
                                disabled={!dirty || isSubmitting}
                                onClick={handleReset}>
                                <MdRestartAlt size={20} />
                            </Button>
                            <Button variant="basic" size="xs" padding="p-0" type="submit"
                                disabled={!dirty}
                                loading={isSubmitting}
                            >
                                <FaCheck size={20} />
                            </Button>
                        </>
                    }
                </div>
            </header>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 pt-6">

                <DragDropProvider onDragEnd={handleDragEnd} >

                    {images.map((v, i) => {

                        return (
                            <SortableImageCard
                                key={v.customId}

                                index={i}
                                id={v.customId}
                                isMain={v.isPrimary} order={i + 1}
                                fileName={v.mediaFile.fileName}
                                filePath={v.mediaFile.filePath}

                                onUpdate={handleUpdate}
                                onPrimary={handleSetPrimary}
                                onDelete={handleDelete}
                            />

                        )
                    })}

                </DragDropProvider>

                {/* ADD */}
                {currentCount < maxImages &&
                    <AddImageCard onChange={handleAdd} multiple />
                }

            </div>
            {/* FOOTER */}
            <div className="pb-6">
                {error && <span className={FIELD_STYLE.validation.errorMsg}> {error.message} </span>}
            </div>

            <footer className="border-t border-border bg-surface-light px-6 py-4">

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">

                    <span>• Arrastra para cambiar el orden.</span>

                    <span>• La imagen definida "Principal" será la portada.</span>

                    <span>• Máximo {maxImages} imágenes.</span>

                    <span>• Recomendado: 1200 × 1200 px · JPG, PNG o WebP · máximo 5 MB.</span>

                </div>

            </footer>

        </section>
    )

}
