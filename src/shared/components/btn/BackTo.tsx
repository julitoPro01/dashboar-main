"use client"

import { useRouter } from "next/navigation"
import { IoMdArrowBack } from "react-icons/io"

interface Props{
    fallbackTo?: string
    label?: string
}

export const BackTo = ({
    fallbackTo,
    label = "Volver"
}: Props) => {

    const router = useRouter()

    return (

        <button

            onClick={() => {

                if(fallbackTo){
                    router.push(fallbackTo)
                    return;
                }

                if (window.history.length > 1)
                    router.back()
                else
                    router.push("/")

            }}

            className="flex items-center gap-2 text-primary font-medium mb-2 hover:underline"
        >

            <span className="text-sm">
                <IoMdArrowBack />
            </span>

            <span className="text-sm">
                {label}
            </span>

        </button>

    )

}