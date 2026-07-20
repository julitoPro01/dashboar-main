"use client"
import clsx from "clsx";
import { memo, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

interface Props {
    values: { title: string; icon?: React.ReactNode, content: (params: any) => React.ReactNode };
    isActiveModule?: boolean;
    params?: any
}

export const ListDropDownMemo = memo(({ values, isActiveModule, params }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={clsx("relative flex w-full items-center h-11 px-4 transition-colors", {
                    "bg-blue-100 text-gray-700": open || isActiveModule,
                    "hover:bg-blue-100 hover:text-gray-700": !open && !isActiveModule
                })}
            >
                <span className="flex justify-center items-center">{values.icon}</span>
                <span className="ml-3 flex-1 text-left text-sm font-medium">{values.title}</span>
                <span className={clsx("transition-transform duration-300", { "rotate-180": open })}>
                    <AiOutlineArrowDown size={18} />
                </span>
            </button>

            <ul className={clsx("overflow-hidden transition-all duration-300 ml-10 mt-1", {
                "max-h-60 opacity-100": open,
                "max-h-0 opacity-0": !open
            })}>
                {values.content(params)}
            </ul>
        </div>)
})