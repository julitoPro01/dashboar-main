"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {} from "@tiptap/react/menus";

export const RichTextEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: "",
        immediatelyRender:false
    });

    
    if (!editor) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-md border border-border-input bg-surface">
            <EditorContent editor={editor} />
        </div>
    );
};