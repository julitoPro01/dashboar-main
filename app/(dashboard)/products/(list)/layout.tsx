import {  FloatingActions, Header, RowFloatingActions } from "@/src/features/products/list";

export default function LayoutList({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col w-full">
                <Header />
            </div>

            {children}

            <FloatingActions/>

            <RowFloatingActions/>

        </>
    );
}