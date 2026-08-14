interface Props {
    children: React.ReactNode;
    titleIcon?: React.ReactNode;
    title: React.ReactNode;
    className?: string
    space?:string
    background?: string
    border?: string
    description?: string
}
export const FormCard = ({ children, titleIcon, title, description,
    className, space="space-y-5",
    background = "bg-surface", border = "border border-border-subtle" }: Props) => {
    return (
        <section className={`px-8 py-6 flex flex-col rounded-xl shadow-sm ${space} ${border} ${className} ${background}`}>

            <div className="flex items-center gap-3 pb-3 border-b border-border text-primary">
                {titleIcon && <span className="text-2xl">{titleIcon}</span>}
                <div className="w-full">
                    <h3 className="flex-1 text-lg font-semibold text-text">
                        {title}
                    </h3>
                    {description && <p className="text-text-muted text-sm">{description}</p>}
                </div>
            </div>
            {children}
        </section>
    )
}
