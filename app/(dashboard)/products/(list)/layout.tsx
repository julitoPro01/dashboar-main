import { ListHeader, ListActions, StatCard } from "@/src/features/products"
import { FloatingPanelFixed, PageActions } from "@/src/shared/components/floating";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";

export default function LayoutList({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col w-full">
                <ListHeader />
            </div>

            {children}

            <FloatingPanelFixed panelType={FLOATING_PANEL_TYPE.PRODUCT_STAT_CARD}
                anchorSide="right" isDynamic>
                <StatCard />
            </FloatingPanelFixed>

            <PageActions>
                <ListActions />
            </PageActions>
        </>
    );
}