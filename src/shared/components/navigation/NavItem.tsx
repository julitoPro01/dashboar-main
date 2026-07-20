"use client"
import clsx from "clsx";
import Link from "next/link";

export function NavItem({
    href,
    icon,
    label,
    isActive
}: {
    href: string;
    icon: React.ReactNode;
    label: string; isActive?:boolean
}) {

    return (
        <Link
            href={href}
            className={clsx("sidebar-item", isActive && "active")}
        >
            <span className="sidebar-icon">{icon}</span>
            <span className="text-sm font-medium truncate">{label}</span>
        </Link>
    );
}