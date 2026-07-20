type Props = {
    title: string;
    value: string | number;
    description: string;
    icon: string;
    color: string;
}

export const SummaryCard = ({
    title,
    value,
    description,
    icon,
    color
}: Props) => {

    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-surface
                shadow-card
                p-6
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-border-strong
            "
        >

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-xs uppercase tracking-wider text-text-subtle font-medium">
                        {title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-text-strong">
                        {value}
                    </h2>

                    <div
                        className="mt-3 flex items-center gap-2 text-sm"
                        style={{ color }}
                    >
                        <span className="material-symbols-rounded text-[18px]">
                            trending_up
                        </span>

                        {description}
                    </div>

                </div>

                <div
                    className=" flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                        backgroundColor: `${color}20`,
                        color
                    }}
                >
                    <span className="material-symbols-rounded">
                        {icon}
                    </span>
                </div>

            </div>

            <div
                className="absolute bottom-0 left-0 h-1 w-full"
                style={{ background: color }}
            />

        </div>
    );

};