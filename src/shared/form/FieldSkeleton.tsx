import { INPUT_FIELD_STYLE } from "../theme/inputField";
import { FormSkeletonProps } from "./types";


export const FieldSkeleton = ({ class0, class1, label = true }: FormSkeletonProps) => {
    return (
        <div className={class0}>

            {label && <span className={INPUT_FIELD_STYLE.skeletonLabel}> ... </span>}

            <div className={INPUT_FIELD_STYLE.skeleton + " " + class1}>

                ...

                {/* <div className=" absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" /> */}
                <div className={INPUT_FIELD_STYLE.shimmer} />

            </div>
        </div>
    )
}