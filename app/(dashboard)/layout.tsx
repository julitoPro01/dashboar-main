
import { AppInitializer, FetchingStatus, LeftMenu, NextAuthProvider, QueryProvider, TopMenu } from "@/src/features/layout";
import { DynamicToaster } from "@/src/shared/components/toaster";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {

    return (
        <>
            <NextAuthProvider>
                <QueryProvider>
                    <div className="flex flex-col h-screen bg-background-light">

                        {/* TOP MENU */}
                        <div className="p-2 border-b border-border">
                            <TopMenu />
                        </div>

                        <div className="flex flex-1 overflow-hidden">

                            {/* LEFT MENU */}
                            <LeftMenu.Wrapper>
                                <LeftMenu />
                            </LeftMenu.Wrapper>

                            {/* CONTENIDO + PANEL DERECHO */}
                            <div className="flex flex-1 overflow-hidden">

                                {/* MAIN CONTENT */}
                                <div className="flex flex-col flex-1 overflow-hidden">

                                    <FetchingStatus />

                                    <AppInitializer>
                                        <div className="flex flex-1 overflow-hidden">

                                            {/* TABLA (scroll independiente) */}
                                            <main className="flex-1 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-bg-select px-4 md:px-8">
                                                {children}
                                            </main>

                                            {/* PANEL DERECHO */}
                                            {/* <div className="w-80 border-l overflow-auto"> */}
                                            {/* RightPanel dinámico */}
                                            {/* </div> */}

                                        </div>
                                    </AppInitializer>

                                </div>

                            </div>

                        </div>

                    </div>
                    <DynamicToaster />

                </QueryProvider>
            </NextAuthProvider >
        </>
    );
}
