

const dirr = {
    "top-r": { y: "top-2.5", x: "right-2.5" },
    "top-c": { y: "top-1/2 -translate-y-1/2", x: "right-2.5" },
    "bottom-r": { y: "bottom-2.5", x: "right-2.5" },
    "bottom-l": { y: "bottom-2.5", x: "left-2.5" },
    "top-l": { y: "top-2.5", x: "left-2.5" },
}

interface Props {
    children: React.ReactNode;
    position?: keyof typeof dirr | { custom: string };
    padding?:string;
}

export const FloatingActionBar = ({ children, position = "top-c",padding="p-1.5" }: Props) => {

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
                z-100

                flex
                flex-col
                gap-2

                rounded-full
                border
                border-border-strong
                bg-surface-black/70
                backdrop-blur-md/70

                shadow-dropdown

                transition-all
                duration-300`}
        >
            {children}
        </aside>
    );
};