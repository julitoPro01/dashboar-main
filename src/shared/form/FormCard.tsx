interface Props {
    children: React.ReactNode;
    titleIcon?: React.ReactNode;
    title: string;
    className?: string
}
export const FormCard = ({ children, titleIcon, title, className }: Props) => {
    return (
        <section className={`px-8 py-6 flex flex-col bg-surface rounded-xl shadow-sm border border-border-subtle space-y-5 ${className}`}>

            <div className="flex items-center gap-3 pb-3 border-b border-border text-primary">
                {titleIcon && <span className="text-2xl">{titleIcon}</span>}
                <h3 className="text-lg font-semibold text-text">
                    {title}
                </h3>
            </div>
            {children}
        </section>
    )
}
