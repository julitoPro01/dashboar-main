import { FaRegCheckCircle } from "react-icons/fa"
import { MdOutlineCategory, MdOutlineLayers } from "react-icons/md"

export const CategoryStats = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
                { label: "Categories", value: "128", icon: <MdOutlineCategory />, color: "text-primary bg-primary/10" },
                { label: "Active Nodes", value: "114", icon: <FaRegCheckCircle />, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
                { label: "Max Depth", value: "4 Levels", icon: <MdOutlineLayers />, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" }
            ].map((item, i) => (
                <div key={i} className="bg-surface-black p-3 rounded-lg border border-border-subtle shadow-sm flex items-center gap-3">
                    <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-lg ${item.color}`}>
                        {item.icon}
                    </div>
                    <div className="leading-tight">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            {item.label}
                        </p>
                        <p className="text-base font-black text-text">
                            {item.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>

    )
}
