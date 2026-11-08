import { FloatingActionsBarRight, VariantRowActions, UpsertVariantSideModal, ViewVariantDetailsSideModal, CellEditorContent } from "@/src/features/products/variants";

export default function LayoutVariantPage({ children }: { children: React.ReactElement }) {
    return (
        <>
            {children}

            <FloatingActionsBarRight/>

            <UpsertVariantSideModal/>
            <CellEditorContent/>

            <ViewVariantDetailsSideModal />

            <VariantRowActions/>
        </>
    );
}
