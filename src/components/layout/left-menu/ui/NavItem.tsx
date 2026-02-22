"use client"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

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