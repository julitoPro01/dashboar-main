"use client";

import { useTheme } from "@/src/domains/theme";
import { useStore } from "@/src/store/useStore";
import { CiDark, CiLight } from "react-icons/ci";
import { MdMenuOpen } from "react-icons/md"
import { VscLayoutPanel } from "react-icons/vsc"

export const TopMenu = () => {

    const setLeftNavBarLeft = useStore(v => v.setLeftNavBarOpen);
    const leftNavBarOpen = useStore(v => v.leftNavBarOpen);

    const { theme, setTheme } = useTheme();


    return (
        <div className="flex gap-5 px-2" >
            {/* MENU LATERAL IZQUIERDA */}
            <button
                onClick={() => setLeftNavBarLeft(!leftNavBarOpen)}
                className={`cursor-pointer text-text-muted hover:text-text`} >
                <MdMenuOpen size={20} />
            </button>
            {/* <div className="flex-1" /> */}
            <button className="text-text-muted hover:text-text" >
                <VscLayoutPanel size={20} className="rotate-270" />
            </button>
            {/* <div className="flex-1" /> */}

            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-auto  rounded-lg cursor-pointer"
                aria-label={`Cambiar tema a ${theme === "light" ? 'claro' : 'oscuro'}`}
            >

                {
                    theme === "dark" ? <CiDark size={20} color="white" /> : theme==="light" ? <CiLight size={20} color="black" />:""
                }
                {theme === "system" && <span className="text-text-muted">Tema</span>}

            </button>
        </div>)
}
