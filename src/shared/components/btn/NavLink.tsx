"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    href: string;
    children: React.ReactNode;
}

export const NavLink = ({ href, children }: Props) => {

        const pathname = usePathname();
        const isActive = pathname === href; 

    return (
        <Link href={href} className={clsx("sidebar-item", isActive && "active")} >
            {children}
        </Link>
    )
}
