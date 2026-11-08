import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

interface MenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    label: string;
    description?: string;   // ← nuevo, opcional
    danger?: boolean;
    href?: string;
    active?: boolean;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(({
    icon,
    iconRight,
    label,
    description,
    onClick,
    danger,
    disabled = false,
    href,
    active = false,
    ...buttonProps
}, ref) => {

    const style = clsx(
        "w-full flex flex-col rounded-md px-3 py-2 text-sm cursor-pointer",
        "transition-colors",
        danger
            ? "text-error hover:bg-error/10"
            : active
                ? "bg-hover text-text-strong"
                : "text-text hover:bg-hover",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
    );

    const content = (
        <>
            <span className="flex items-center gap-3 w-full">
                {icon && (
                    <span className="flex size-4 items-center justify-center text-base">
                        {icon}
                    </span>
                )}
                <span className="text-start">{label}</span>
                {iconRight && (
                    <span className="flex ml-auto opacity-70 size-4 items-center justify-center text-base">
                        {iconRight}
                    </span>
                )}
            </span>
            {description && (
                <span className="text-text-muted text-xs text-left">
                    {description}
                </span>
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={style}
                aria-expanded={buttonProps["aria-expanded"]}
                aria-controls={buttonProps["aria-controls"]}
                onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            {...buttonProps}
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={style}
        >
            {content}
        </button>
    );
});
MenuItem.displayName = "MenuItem";
