"use client";

import { useEditorState, type Editor } from "@tiptap/react";

import {
    LuBold,
    LuItalic,
    LuList,
    LuListOrdered,
    LuQuote,
    LuRedo2,
    LuUndo2,
} from "react-icons/lu";

interface RichTextToolbarProps {
    editor: Editor;
}

export const RichTextToolbar = ({
    editor,
}: RichTextToolbarProps) => {

    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            heading2: editor.isActive("heading", { level: 2 }),
            heading3: editor.isActive("heading", { level: 3 }),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            blockquote: editor.isActive("blockquote"),
        }),
    });

    return (
        <div className="flex items-center gap-1 border-b border-border-input bg-surface-black px-2 py-1.5">
            {/* Bold */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-soft-blue hover:text-primary
                    disabled:cursor-not-allowed disabled:opacity-40
                    ${editorState.bold ? "bg-bg-select text-primary" : ""}
                `}
                title="Negrita"
                aria-label="Negrita"
            >
                <LuBold size={17} />
            </button>

            {/* Italic */}
            <button
                type="button"
                onClick={() =>editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-soft-blue hover:text-primary
                    disabled:cursor-not-allowed disabled:opacity-40
                    ${editorState.italic
                        ? "bg-bg-select text-primary"
                        : ""}
                `}
                title="Cursiva"
                aria-label="Cursiva"
            >
                <LuItalic size={17} />
            </button>

            <span className="mx-1 h-5 w-px bg-border-subtle" />

            {/* Heading 2 */}
            <button
                type="button"
                onClick={() =>editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`
        flex h-8 min-w-8 items-center justify-center rounded
        px-1.5 text-xs font-semibold
        text-text-muted transition-colors
        hover:bg-bg-soft-blue hover:text-primary
        ${editorState.heading2
                        ? "bg-bg-select text-primary"
                        : ""
                    }
    `}
                title="Título 2"
                aria-label="Título 2"
            >
                H2
            </button>

            {/* Heading 3 */}
            <button
                type="button"
                onClick={() =>editor.chain().focus().toggleHeading({ level: 3 }).run() }
                className={`
        flex h-8 min-w-8 items-center justify-center rounded
        px-1.5 text-xs font-semibold
        text-text-muted transition-colors
        hover:bg-bg-soft-blue hover:text-primary
        ${editorState.heading3
                        ? "bg-bg-select text-primary"
                        : ""
                    }
    `}
                title="Título 3"
                aria-label="Título 3"
            >
                H3
            </button>

            <span className="mx-1 h-5 w-px bg-border-subtle" />

            {/* Bullet list */}
            <button
                type="button"
                onClick={() =>editor.chain().focus().toggleBulletList().run()}
                className={`
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-soft-blue hover:text-primary
                    ${editorState.bulletList
                        ? "bg-bg-select text-primary"
                        : ""}
                `}
                title="Lista con viñetas"
                aria-label="Lista con viñetas"
            >
                <LuList size={18} />
            </button>

            {/* Ordered list */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                className={`
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-soft-blue hover:text-primary
                    ${editorState.orderedList
                        ? "bg-bg-select text-primary"
                        : ""}
                `}
                title="Lista numerada"
                aria-label="Lista numerada"
            >
                <LuListOrdered size={18} />
            </button>

            {/* Blockquote */}
            <button
                type="button"
                onClick={() =>editor.chain().focus().toggleBlockquote().run()}
                className={`
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-soft-blue hover:text-primary
                    ${editorState.blockquote
                        ? "bg-bg-select text-primary"
                        : ""}
                `}
                title="Cita"
                aria-label="Cita"
            >
                <LuQuote size={17} />
            </button>

            <span className="mx-1 h-5 w-px bg-border-subtle" />

            {/* Undo */}
            <button
                type="button"
                onClick={() =>editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-select hover:text-primary
                    disabled:cursor-not-allowed disabled:opacity-40
                "
                title="Deshacer"
                aria-label="Deshacer"
            >
                <LuUndo2 size={17} />
            </button>

            {/* Redo */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().redo().run()
                }
                disabled={
                    !editor.can().chain().focus().redo().run()
                }
                className="
                    flex h-8 w-8 items-center justify-center rounded
                    text-text-muted transition-colors
                    hover:bg-bg-select hover:text-primary
                    disabled:cursor-not-allowed disabled:opacity-40
                "
                title="Rehacer"
                aria-label="Rehacer"
            >
                <LuRedo2 size={17} />
            </button>
        </div>
    );
};