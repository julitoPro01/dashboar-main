import { ProductListActions, ProductListHeader } from "@/src/features/products/list";
import { FloatingActionBar } from "@/src/shared/components/floating";

export default function LayoutList({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col w-full">
                <ProductListHeader />
            </div>

            {children}


            <FloatingActionBar>
                <ProductListActions />
            </FloatingActionBar>

        </>
    );
}