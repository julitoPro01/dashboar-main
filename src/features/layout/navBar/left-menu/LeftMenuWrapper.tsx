"use client";
import { useStore } from "@/src/store/useStore";

export const LeftMenuWrapper = ({ children }: { children: React.ReactNode }) => {
    const open = useStore(v => v.leftNavBarOpen);

    return (
        <div className={`${!open ? "hidden" : ""}`} >
            {children}
        </div>
    )
}
