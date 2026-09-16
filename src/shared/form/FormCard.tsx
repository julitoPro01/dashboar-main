import { MdRestartAlt } from "react-icons/md";
import { Button } from "../components/btn";

interface Props {
    children: React.ReactNode;
    titleIcon?: React.ReactNode;
    actionNode?: React.ReactNode;
    title: React.ReactNode;
    className?: string
    space?: string
    background?: string
    border?: string
    description?: string
}
export const FormCard = ({ children, titleIcon, title, description, actionNode,
    className, space = "space-y-5",
    background = "bg-surface", border = "border border-border-subtle" }: Props) => {
    return (
        <section className={`px-8 py-6 flex flex-col rounded-xl shadow-sm ${space} ${border} ${className} ${background}`}>

            <div className="flex items-start justify-between gap-3 pb-3 border-b border-border">
                <div className="flex flex-1 items-center gap-3  text-primary">
                    {titleIcon && <span className="text-2xl">{titleIcon}</span>}
                    <div className="w-full">
                        <h3 className="text-lg font-semibold text-text">
                            {title}
                        </h3>
                        {description && <p className="text-text-muted text-sm">{description}</p>}
                    </div>
                </div>
                {actionNode &&
                    <div className="inline-flex gap-4">
                        {actionNode}
                    </div>
                }
            </div>
            {children}
        </section>
    )
}
