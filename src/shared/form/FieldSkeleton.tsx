import { INPUT_FIELD_STYLE } from "../theme/inputField";
import { FormSkeletonProps } from "./types";


export const FieldSkeleton = ({ node, field, label = true }: FormSkeletonProps) => {
    return (
        <div className={node}>

            {label && <span className={INPUT_FIELD_STYLE.skeletonLabel}> ... </span>}

            <div className={INPUT_FIELD_STYLE.skeleton + " " + field}>

                ...

                {/* <div className=" absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" /> */}
                <div className={INPUT_FIELD_STYLE.shimmer} />

            </div>
        </div>
    )
}