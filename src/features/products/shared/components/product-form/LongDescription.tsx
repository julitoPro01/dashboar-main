"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormContext, useFormState } from "react-hook-form";
import { longDescriptionForm } from "../../../types";
import { RichTextToolbar } from "./long-description/RichTextToolbar";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";

import { FormCard } from "@/src/shared/form";
import { IoInformationCircleOutline } from "react-icons/io5";
import { ListProperties } from "./long-description/ListProperties";
import { Button } from "@/src/shared/components/btn";
import { MdRestartAlt } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useEffect } from "react";
import { useStore } from "@/src/store/useStore";
import { CharacterCountEditor } from "./long-description/CharcterCountEditor";
import { OriginalLongDescription } from "@/src/store/productSlice";

const MAX_CHARACTERS = 3000;

type Props = { isEdit?: boolean}

export const LongDescription = (props: Props) => {

    const originalLongDescription = useStore(v => {
        const pOrg = v.productOriginalLongDescription
        return props.isEdit ? pOrg.originalEdit : pOrg.originalCreate
    });

    const { setValue } = useFormContext<longDescriptionForm>();

    const editor = useEditor({
        extensions: [StarterKit,
            CharacterCount.configure({
                limit: MAX_CHARACTERS,
            }),
            Placeholder.configure({
                placeholder: "Escribe la descripción del producto...",
            }),
        ],
        immediatelyRender: false,

        // content: originalLongDescription.description,

        // Escucha cualquier cambio en el EDITOR
        onUpdate: ({ editor }) => {
            // Asignamos el valor al formulario
            setValue(
                "longDescription.description",
                editor.getJSON(),
                {
                    shouldDirty: true,
                    shouldValidate: true,
                }
            );
        },


    });

    // INICIALIMAMOS "EL CONTENDIO DE EDITOR"
    // Actualiza cuando el objeto original cambie de VERSION
    useEffect(() => {

        queueMicrotask(() => {
            editor?.commands.setContent(originalLongDescription.description, {
                emitUpdate: false
            })
        })
    }, [originalLongDescription.version, editor])

    if (!editor) {
        return null;
    }
    
    return (

        <FormCard
            title="Información del producto"
            titleIcon={<IoInformationCircleOutline />}
            actionNode={props.isEdit && <EditActions originalLong={originalLongDescription} />}
        >
            <div className="overflow-hidden rounded-md border border-border-input">

                {/* DESCRIPCIÓN */}
                <div>
                    <RichTextToolbar editor={editor} />
                    <EditorContent editor={editor} />

                    <CharacterCountEditor editor={editor} maxCharacter={MAX_CHARACTERS} />
                </div>
                {/* PROPERTIES INFO */}
                <ListProperties originalLong={originalLongDescription} />
            </div>
        </FormCard >
    );
};

const EditActions = ({originalLong}:{originalLong:OriginalLongDescription}) => {

    const { control, reset } = useFormContext<longDescriptionForm>();
    const { dirtyFields, isSubmitting } = useFormState({ control, name: "longDescription" });
    const setOriginalLong = useStore(v=>v.setProductOriginalLongDescriptionEdit)


    // Deshacemos los cambios
    const handleReset = () => {

        // Normalizamos el formulario
        reset();
        // Volvemos al estado originalLongDescription
        const {version, ...res}= originalLong;
        setOriginalLong(res)
    }

    return (
        <>
            <Button variant="basic" size="xs" padding="p-0" type="button"
                disabled={isSubmitting || !dirtyFields.longDescription}
                onClick={handleReset}
            >
                <MdRestartAlt size={20} />
            </Button>
            <Button
                variant="basic" size="xs" padding="p-0" type="submit"
                loading={isSubmitting}
                disabled={!dirtyFields.longDescription}
            >
                <FaCheck size={20} />
            </Button>
        </>
    )
}