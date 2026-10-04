

const dirr = {
    "top-r": { y: "top-2.5", x: "right-2.5" },
    "top-c": { y: "top-1/2 -translate-y-1/2", x: "right-2.5" },
    "bottom-r": { y: "bottom-2.5", x: "right-2.5" },
    "bottom-l": { y: "bottom-2.5", x: "left-2.5" },
    "top-l": { y: "top-2.5", x: "left-2.5" },
}

const VARIANT = {
    basic: "",
    primary: " border border-primary ",
    secondary: "bg-surface-black/70 backdrop-blur-md/70 rounded-full border border-border-strong"
} as const;

interface Props {
    children: React.ReactNode;
    position?: keyof typeof dirr | { custom: string };
    padding?: string;
    variant?: keyof typeof VARIANT;
    className?: string;
}

/**
 * Acciónes vertica flotante
 * @param param0 
 * @returns 
 */
export const FloatingActionBar = ({ children, position = "top-c", padding = "p-1.5", className,
    variant = "secondary"
}: Props) => {

    let posit = "";
    if (typeof position === "object")
        posit = position.custom;
    else
        posit = dirr[position].x + " " + dirr[position].y;

    return (
        <aside
            className={` fixed
                ${posit}
                ${padding}
                ${VARIANT[variant]}
                z-100
            
                flex
                flex-col
                gap-2

                shadow-dropdown

                transition-all
                duration-300
                ${className}
                `
            }
        >
            {children}
        </aside>
    );
};