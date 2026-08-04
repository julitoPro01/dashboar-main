import { FieldSkeleton } from "@/src/shared/form"

export const EditSkeleton = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-8 py-6 relative">

                {
                    Object.entries(init).map(([key, val]) => (
                        <FieldSkeleton key={key} class0={val.class0} class1={val.class1} />
                    ))
                }
            </div>
        </>
    )
}


const init: Record<any, any> = {
    name: {},
    slug: {},
    description: { class0: "md:col-span-2", class1: "h-20" },
    recordStatusId: { class0: "md:col-span-2" },
    imageUrl: { class0:"md:col-span-2", class1: "h-40"},
}
