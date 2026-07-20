interface MessageCardProps {
    title: string;
    message: string;
    icon?: React.ReactNode;
    variant?: "error" | "warning" | "info";
}

export const MessageCard = ({
    title,
    message,
    icon,
    variant = "info"
}: MessageCardProps) => {
    return (
        <div className="bg-surface border border-border rounded-xl shadow-card p-5">
            <div className="flex gap-3">
                <div
                    className={`
                        shrink-0 mt-0.5
                        ${variant === "error" ? "text-danger" : ""}
                        ${variant === "warning" ? "text-warning" : ""}
                        ${variant === "info" ? "text-primary" : ""}
                    `}
                >
                    {icon ?? (
                        <span className="material-symbols-outlined">
                            info
                        </span>
                    )}
                </div>

                <div>
                    <h3 className="font-medium text-text-strong">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-text-muted">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};