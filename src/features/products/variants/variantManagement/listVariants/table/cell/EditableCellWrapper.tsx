interface EditableCellWrapperProps {
    children: React.ReactNode;
    editable?: boolean;
    isEditMode: boolean;
    isDirty: boolean;
    isSelected: boolean;
    styleBody?: string;
    onSelect?: (position: { cx: number; cy: number }) => void;
}

export const EditableCellWrapper = ({
    children,
    editable = true,
    isEditMode,
    isDirty,
    isSelected,
    styleBody,
    onSelect
}: EditableCellWrapperProps) => {

    const state = !isEditMode
        ? "normal"
        : !editable
            ? "disabled"
            : isDirty
                ? "dirty"
                : isSelected
                    ? "selected"
                    : "editable";

    const styles = {
        normal: "ring-transparent",
        disabled: "ring-transparent",
        editable: "ring-transparent hover:ring-border-select",
        selected: "ring-primary bg-bg-soft-blue",
        dirty: "ring-amber-500 bg-amber-50"
    };

    return (
        <div
            className={`
                h-full ring-1 transition-colors duration-150
                ${styleBody ?? ""}
                ${styles[state]}
                ${state === "editable" || state === "selected" || state === "dirty"
                    ? "cursor-pointer"
                    : ""}
            `}
            onClick={({ clientX, clientY }) => {
                if (!isEditMode || !editable) return;

                onSelect?.({ cx: clientX, cy: clientY });
            }}
        >
            {children}
        </div>
    );
};