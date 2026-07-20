interface TooltipProps {
    text?: string;
    children: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
    x?: string; y?: string
    variant?: "banderola" | "default"
}

export const Tooltip = ({
    text,
    children,
    position = "top",
    size = "xs",
    className, x, y, variant
}: TooltipProps) => {


    const s = `
                w-max max-w-${size}
                pointer-events-none
                absolute
                text-xs
                rounded
                opacity-0
                group-hover:opacity-100
                transition-opacity
                z-50
                ${getPosition(position, x, y)}
                `

    return (

        <div className={`relative group inline-flex ${className}`}>
            {children}

            {variant === "banderola" && text
                ? <div className={`${s}`}>
                    <div className="relative inline-flex items-center">
                        <span className=" wrap-break-word bg-black text-white px-2 py-1 rounded-l-md">
                            {text}
                        </span>

                        <span
                            className="absolute -right-3 w-3 h-full bg-black"
                            style={{
                                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                            }}
                        />
                    </div>
                </div>
                : text ? <span
                    className={`flex whitespace-normal  bg-black text-white
                wrap-break-word  px-2 py-1 ${s}`}
                >
                    {text}
                </span> : ""
            }
        </div>

    );

};

const getPosition = (pos: TooltipProps["position"], x: string = "", y: string = "") => {

    switch (pos) {

        case "top":
            return `${y ? y : "bottom-full"} mb-1 left-1/2 -translate-x-1/2`;

        case "bottom":
            return `${y ? y : "top-full"} mt-1 left-1/2 -translate-x-1/2`;

        case "left":
            return `${x ? x : "right-full"} mr-1 top-1/2 -translate-y-1/2`;

        case "right":
            return `${x ? x : "left-full"}  ml-1 top-1/2 -translate-y-1/2`;

    }

};