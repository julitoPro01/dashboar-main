"use client"
import clsx from "clsx";
import Link from "next/link";

export function SidebarLink({
    href,
    icon,
    label,
    pathName
}: {
    href: string;
    icon: React.ReactNode;
    label: string; pathName?:string
}) {

    const isActive = href === pathName
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