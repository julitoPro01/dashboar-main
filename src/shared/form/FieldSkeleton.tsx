import { FIELD_STYLE } from "./style";
import { FormSkeletonProps } from "./types";


export const FieldSkeleton = ({ node, field, label = true }: FormSkeletonProps) => {
    return (
        <div className={node}>

            {label && <span className={FIELD_STYLE.base}> ... </span>}

            <div className={FIELD_STYLE.base + " " + field}>

                ...

                {/* <div className=" absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" /> */}
                <div className={FIELD_STYLE.shimmer} />

            </div>
        </div>
    )
}