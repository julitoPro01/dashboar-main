import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../btn";

export const ConfirmDialog = ({
    title,
    description,
    variant = "danger",
    variantBtn="info",
    details,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    loading,
    confirmDisabled,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) => {

    const iconColor = {
        warning: "text-amber-500 bg-amber-500/10",
        danger: "text-error bg-error/10",
        info: "text-primary bg-primary/10",
    }[variant];

    return (
        <div className="space-y-6 p-6">

            <div className="flex gap-4">

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconColor}`}
                >
                    <IoWarningOutline size={22} />
                </div>

                <div className="space-y-1">

                    <h3 className="font-semibold text-lg">
                        {title}
                    </h3>

                    <div className="text-sm text-text-muted leading-relaxed">
                        {description}
                    </div>

                </div>

            </div>

            {details && (
                <div className="rounded-xl border border-border bg-surface p-4">
                    {details}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
                <Button
                    variant="basic"
                    onClick={onCancel}
                    disabled={loading}
                >
                    {cancelText}
                </Button>

                <Button
                    variant={variantBtn === "danger" ? "ghostDanger" : "outline"}
                    loading={loading}
                    disabled={confirmDisabled}
                    onClick={onConfirm}
                >
                    {loading ? "Procesando..." : confirmText}
                </Button>
            </div>

        </div>
    );
};


export interface ConfirmDialogProps {
    title: string;
    description: React.ReactNode;

    variant?: "warning" | "danger" | "info";
    variantBtn?: "danger" | "info";

    details?: React.ReactNode;

    confirmText?: string;
    cancelText?: string;

    loading?: boolean;
    confirmDisabled?: boolean;

    onConfirm: () => void;
    onCancel: () => void;
}