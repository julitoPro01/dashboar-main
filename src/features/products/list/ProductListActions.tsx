
import { StatCardButton } from "./actions/StatCardButton";
import { AddProductButton } from "./actions/AddProductButton";
import { FloatingCard } from "@/src/shared/components/floating";
import { StatCard } from "./StatCard";

export const ProductListActions = () => {


    return (
        <>
            <AddProductButton />

            <FloatingCard
                className="scrollbar-hide"
                placement="left-start"
                fallbackPlacements={["bottom", "left"]}
                offsetDistance={15}
                openChange={false}
                trigger={<StatCardButton />} >

                <StatCard />
                
            </FloatingCard>

        </>
    )
}
