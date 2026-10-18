"use client"
import { FloatingActionBar } from "@/src/shared/components/floating"
import { AddVariantButton } from "./actions/AddVariantButton"
import { DisplayOrderButton } from "./actions/DisplayOrderButton"
import { SetMainButton } from "./actions/SetMainButton"
import { AdjustStockButton } from "./actions/AdjustStockButton"

export const FloatingActions = () => {

    return (
        <FloatingActionBar collapsible >

            {
                (isCollapsed) => {

                    return (
                        <>
                            <AddVariantButton isCollapsed={isCollapsed} />
                            <DisplayOrderButton isCollapsed={isCollapsed} />
                            <SetMainButton isCollapsed={isCollapsed} />
                            <AdjustStockButton isCollapsed={isCollapsed} />
                        </>
                    )
                }
            }

        </FloatingActionBar>
    )
}
