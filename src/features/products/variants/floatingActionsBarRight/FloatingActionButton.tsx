import { Button } from "@/src/shared/components/btn";
import { Tooltip } from "@/src/shared/components/floating";

interface Props {
    title: string;
    isCollapsed: boolean;
    icon: React.ReactNode;
    onAction: () => void;
    active?: boolean;
}
export const FloatingActionButton = ({ title, isCollapsed, icon, active, onAction }: Props) => {
    return (
        <Tooltip text={!isCollapsed ? title : ""} position="left" x="right-12" variant="banderola">
            <Button
                variant="tabLight"
                size="sm"
                rounded="full"
                padding="p-1.5"
                select="tabLight"
                active={active}
                onClick={onAction}
                ariaLabel={title}
            >
                <span className="text-xl">
                    {icon}
                </span>
                <div className={`
                           absolute right-full mr-2.5 bg-surface-black rounded-full h-full flex items-center
                               whitespace-nowrap transition-[max-width,padding,opacity] overflow-hidden duration-300 ease-in-out
                              border border-border-strong w-max
                             ${!isCollapsed
                        ? "max-w-0 px-0 opacity-0"
                        : "max-w-64 px-2 opacity-100"}
                           `}
                    aria-hidden={!isCollapsed}
                >
                    <span> {title} </span>
                </div>

            </Button>
        </Tooltip>
    )
}
