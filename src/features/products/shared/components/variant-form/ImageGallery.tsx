
import { IoImagesOutline } from "react-icons/io5"
import { useCrudImageGallery } from "../../hooks"
import { DragDropProvider } from "@dnd-kit/react";
import { SortableImageCard } from "../SortableImageCard";
import { AddImageCard, FIELD_STYLE, FIELD_VALIDATION } from "@/src/shared/form";
import { Control, useWatch } from "react-hook-form";
import { VariantForm } from "../../../types";
import { mapSystemAttributesToView } from "../../helpers";

export const ImageGallery = () => {

    const {
        handleAdd,
        handleDelete,
        handleDragEnd,
        handleSetPrimary,
        handleUpdate,
        currentCount,
        error,
        images,
        maxImages,
        control
    } = useCrudImageGallery();

    return (
        <section className="space-y-4">

            {/* Section header */}
            <div className="flex justify-between items-center">
                <h3 className="flex items-center gap-3 text-text font-semibold">

                    <IoImagesOutline size={18} className="text-primary" />

                    <span className={FIELD_VALIDATION["*"]}>
                        4. Galería de imagenes
                    </span>
                </h3>

                <span className="rounded-full ml-auto bg-bg-soft-blue px-3 py-1 text-xs font-medium text-primary">
                    {currentCount} / {maxImages}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3  gap-4">

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

                {currentCount < maxImages &&
                    <AddImageCard onChange={handleAdd} multiple />
                }
            </div>

            {/* FOOTER */}
            {
                error && <span className={FIELD_STYLE.validation.errorMsg}> {error.message} </span>
            }

            <VariantSummary control={control} />

            <footer className="border-t border-border bg-surface-light px-6 py-4">

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
                    <span>• Arrastra para cambiar el orden.</span>

                    <span>• La imagen "Principal" será la portada de esta variante.</span>

                    <span>• Máximo {maxImages} imágenes por variante.</span>

                    <span>
                        • Recomendado: 1200 × 1200 px · JPG, PNG o WebP · máximo 5 MB.
                    </span>
                </div>
            </footer>

        </section>
    )
}

const VariantSummary = ({
    control,
}: {
    control: Control<VariantForm>;
}) => {
    const systemProperties = useWatch({
        control,
        name: "categorization.systemAttributes",
    });

    const summary = mapSystemAttributesToView(systemProperties)
        .map(v => v.value).join(" / ");

    return (
        <span className="block text-xs font-medium text-text-muted">
            Variante: {summary || "Sin propiedades configuradas"}
        </span>
    );
};