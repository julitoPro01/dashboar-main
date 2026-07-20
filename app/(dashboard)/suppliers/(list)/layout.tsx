import { Details, FloatingMenu, TopMenu } from "@/src/features/suppliers"

export default async function Layout({ children }: { children: React.ReactNode; }) {

    return (
        <div className="flex flex-col  h-full w-full">
            <TopMenu />

            {children}

            <FloatingMenu />
            {/* Modal */}
            <Details />
        </div>
    )
}
