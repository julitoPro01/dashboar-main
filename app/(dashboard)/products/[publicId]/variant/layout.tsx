import { FloatingActions, UpsertVariantSideModal } from "@/src/features/products/variants";

export default function LayoutVariantPage({ children }: { children: React.ReactElement }) {
    return (
        <>
            {children}

            <FloatingActions />

            <UpsertVariantSideModal/>
        </>
    );
}