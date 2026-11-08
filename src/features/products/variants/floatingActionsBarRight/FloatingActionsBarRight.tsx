"use client"
import { FloatingActionBar } from "@/src/shared/components/floating"
import { AddVariantButton } from "./AddVariantButton"
import { ReorderVariantsButton } from "./ReorderVariantsButton"
import { EditModeButton } from "./EditModeButton"

export const FloatingActionsBarRight = () => {

    return (
        <FloatingActionBar collapsible >

            {
                (isCollapsed) => {

                    return (
                        <>
                            <AddVariantButton isCollapsed={isCollapsed} />
                            <ReorderVariantsButton isCollapsed={isCollapsed} />
                            <EditModeButton isCollapsed={isCollapsed} />
                        </>
                    )
                }
            }

        </FloatingActionBar>
    )
}
