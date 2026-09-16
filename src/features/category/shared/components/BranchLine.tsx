interface Props { children: React.ReactNode, isLastChild: boolean }
export const BranchLine = ({ children, isLastChild }: Props) => {
    return (
        <div className="relative ml-5 ">
            {/* <div className="group"> */}
                {children}
            {/* </div> */}

            {/* Línea vertical de la rama */}
            <div className={`
            absolute left-0 top-0 border-l transition-colors border-border-strong
            ${isLastChild ? "h-1/2" : "h-full"}`}
            />
        </div>
    )
}
