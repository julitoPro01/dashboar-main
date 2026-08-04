"use client";

import { useTheme } from "@/src/shared/theme/system/useTheme";
import { useStore } from "@/src/store/useStore";
import { useRouter } from "next/navigation";
import { CiDark, CiLight } from "react-icons/ci";
import {IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { LuSunMoon } from "react-icons/lu";
import { MdMenuOpen } from "react-icons/md"
import { VscLayoutPanel } from "react-icons/vsc"

export const TopMenu = () => {

    const setLeftNavBarLeft = useStore(v => v.setLeftNavBarOpen);
    const leftNavBarOpen = useStore(v => v.leftNavBarOpen);

    const router = useRouter();

    const { theme, setTheme } = useTheme();


    return (
        <div className="flex gap-5 px-2" >
            {/* MENU LATERAL IZQUIERDA */}
            <div className="flex gap-5">
                <button
                    onClick={() => setLeftNavBarLeft(!leftNavBarOpen)}
                    className={`cursor-pointer text-text-muted hover:text-text`} >
                    <MdMenuOpen size={20} />
                </button>
                {/* <div className="flex-1" /> */}
                <button className="text-text-muted hover:text-text" >
                    <VscLayoutPanel size={20} className="rotate-270" />
                </button>
            </div>
            <div className="border-l border-border" />
            <div className="flex gap-5">
                <button onClick={() => router.back()} title="Ir atras"
                    className="cursor-pointer text-text-muted hover:text-primary">
                    <IoMdArrowRoundBack size={20} />
                </button>
                <button onClick={() => router.forward()} title="Ir adelante"
                    className="cursor-pointer text-text-muted hover:text-primary">
                    <IoMdArrowRoundForward size={20} />
                </button>
            </div>

            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-auto  rounded-lg cursor-pointer"
                aria-label={`Cambiar tema a ${theme === "light" ? 'claro' : 'oscuro'}`}
            >

                {
                    theme === "dark" ? <CiDark size={20} color="white" /> : theme === "light" ? <CiLight size={20} color="black" /> : ""
                }
                {theme === "system" && <LuSunMoon size={20} className="text-text-strong" />}
            </button>




        </div>)
}
