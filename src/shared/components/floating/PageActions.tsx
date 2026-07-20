
interface Props {
    children: React.ReactNode;
    position?: "right" | "left"
}

export const PageActions = ({ children, position = "right" }: Props) => {
    return (
        <aside
            className="
                fixed
                top-1/2
                -translate-y-1/2
                z-100

                flex
                flex-col
                gap-2

                rounded-full
                border
                border-border
                bg-surface-black
                backdrop-blur-md

                p-1.5

                shadow-dropdown

                transition-all
                duration-300
            "
            style={{ [position]: "10px" }}
        >
            {children}
        </aside>
    );
};