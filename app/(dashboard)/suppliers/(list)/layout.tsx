import { Details, RowFloatingActions, TopMenu } from "@/src/features/suppliers/list"

export default async function Layout({ children }: { children: React.ReactNode; }) {

    return (
        <div className="flex flex-col  h-full w-full">
            <TopMenu />

            {children}

            <RowFloatingActions />
            {/* Modal */}
            <Details />

        </div>
    )
}
