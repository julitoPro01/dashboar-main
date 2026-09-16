import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import { GalleryForm } from "../../../types";
import { moveDragEnd } from "@/src/shared/sortable";
import { ChangeEvent, useEffect } from "react";

const MAX_IMAGES = 4;
export const useCrudImageGallery = () => {

    const { control, getValues, reset } = useFormContext<GalleryForm>();
    const { errors, dirtyFields, isSubmitting } = useFormState({ control, name: "images" });

    const { append, fields, remove, move, update } = useFieldArray({ control, name: "images", keyName: "customId" });

    const handleDragEnd = moveDragEnd([], (_, oldIndex, index) => {
        move(oldIndex, index);
    })

    const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);

        const imgs = files.map(v => ({
            fileName: v.name,
            filePath: URL.createObjectURL(v), //TOD: TEMPORAR
            fileSize: v.size,
            mimeType: v.type,
        }))

        for (const i in imgs) {

            const count = fields.length + (+i + 1);
            const isPrimary = count === 1 ? true : false;

            if (count > MAX_IMAGES) break;

            append({
                isPrimary,
                displayOrder: 0,
                mediaFile: {
                    fileName: imgs[i].fileName,
                    filePath: imgs[i].filePath,//URL:...
                    fileSize: imgs[i].fileSize,
                    mimeType: imgs[i].mimeType,
                    isPublic: true
                }
            });

        }


    }

    const handleUpdate = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;


        update(index, {
            ...fields[index],
            mediaFile: {
                mimeType: file.type,
                fileName: file.name,
                fileSize: file.size,
                filePath: URL.createObjectURL(file),
                isPublic: true
            }
        })
    }

    const handleSetPrimary = (index: number) => {

        fields.forEach((v, i) => {
            if (i === index)
                update(i, { ...v, isPrimary: true })
            else
                update(i, { ...v, isPrimary: false })
        })
    }

    const handleDelete = (index: number) => {

        const isPrimary = fields[index].isPrimary;
        remove(index);

        const imgs = getValues("images");
        if (isPrimary && imgs.length > 0)
            update(0, { ...imgs[0], isPrimary: true })
    }

    const handleReset = () => {
        reset()
    }

    const currentCount = fields.length;

    // LIMPIAMOS LAS URLs TEMPORARES DE LAS IMAGENES
    useEffect(() => {

        return () => {
            const imgs = getValues("images");
            imgs.forEach(v => {
                URL.revokeObjectURL(v.mediaFile.filePath)
            });
        }

    }, [])

    return {
        error:errors.images,
        dirty:dirtyFields.images,
        isSubmitting,
        currentCount,
        images:fields,
        handleDragEnd,
        handleAdd,
        handleUpdate,
        handleSetPrimary,
        handleDelete,
        handleReset,
        maxImages:MAX_IMAGES
    }
}
