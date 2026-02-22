import clsx from "clsx"

export const BtnActiveItemFilter = ({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) => {
    return (
        // "text-blue-500 bg-blue-50 border-blue-200": active,
        <button
            type="button"
            className={clsx(" p-1 rounded-md transition-colors border ", {
                "text-primary bg-hover border-hover": active,
                "text-text-subtle hover:text-primary hover:border-hover hover:bg-hover border-transparent": !active,
            })}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}
