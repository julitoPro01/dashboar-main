import { useEditorState, type Editor} from "@tiptap/react";
    
export const CharacterCountEditor = ({ editor, maxCharacter }: {maxCharacter:number, editor: Editor }) => {
    const count = useEditorState({
        editor,
        selector: ({ editor }) =>
            editor.storage.characterCount.characters(),
    });

    const limitReached = count >= maxCharacter;
    
    return (
        <div className="flex items-center justify-end gap-4 px-3 py-2">
            <span className={`shrink-0 text-xs ${limitReached ? "text-error":"text-text-muted"}`}>
                {count} / {maxCharacter}
            </span>
        </div>
    );
};