import { Skeleton } from "@/src/shared/components/loading";

export const CategoryTreeSkeleton = () => {

    const Child = ({ nodes }: { nodes: any[] }) => {

        return nodes.map((v) => (
            <div
                key={v.id}
                className={`${v.id > 0 ? " ml-9" : ""} pl-2 space-y-1`}
            >
                <div className="mt-2">
                    <Skeleton className="w-full h-10" />

                    {v.children.length > 0 && (
                        <Child nodes={v.children} />
                    )}
                </div>
            </div>
        ))

    }

    return <Child nodes={skeletonTree} />;
};

const skeletonTree = [
    {
        id: 0, children: [
            {
                id: 1, children: [
                    {
                        id: 11, children: []
                    }
                ]
            },
            {
                id: 3, children: [{
                    id: 33, children: []
                }]
            }
        ]
    }
]
