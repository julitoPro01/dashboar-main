
import { FloatingActionBar, FloatingCard } from "@/src/shared/components/floating"
import { AddProductButton } from "./actions/AddProductButton"
import { StatCardButton } from "./actions/stat-card/StatCardButton"
import { StatCard } from "./actions/stat-card/StatCard"


export const FloatingActions = () => {

    return (
        <FloatingActionBar>

            <AddProductButton />

            <FloatingCard
                className="scrollbar-hide"
                placement="left-start"
                fallbackPlacements={["bottom", "left"]}
                offsetDistance={15}
                open={false}
                trigger={<StatCardButton />} >

                <StatCard />

            </FloatingCard>

        </FloatingActionBar>
    )
}
