import clsx from "clsx";
import Link from "next/link";

interface MenuItemProps {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
    danger?: boolean;
    href?: string;
}

export const MenuItem = ({
    icon,
    label,
    onClick,
    danger,
    href,
}: MenuItemProps) => {

    const style = clsx(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer",
        "transition-colors",
        danger
            ? "text-error hover:bg-error/10"
            : "text-text hover:bg-hover",
    );

    const content = (
        <>
            {icon &&
                <span className="flex size-4 items-center justify-center text-base">
                    {icon}
                </span>
            }

            <span >{label}</span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={style}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={style}
        >
            {content}
        </button>
    );
};