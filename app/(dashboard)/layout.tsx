
import { BootData } from "@/src/components/bootData";
import { LeftMenu, LayoutLeftMenu, TopMenu } from "@/src/components/layout";
import { NextAuthProvider, QueryProvider } from "@/src/components/providers";
import { DynamicToaster } from "@/src/components/ui";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {

    return (
        <>
            <NextAuthProvider>
                <QueryProvider>

                    <div className=" flex flex-col h-screen bg-background">
                        {/* TOP MENU */}
                        <div className="p-2   border-b border-border ">
                            
                            <TopMenu/>
                        </div>
                        <div className="flex flex-row flex-1 overflow-hidden">
                            <LayoutLeftMenu >
                                <LeftMenu />
                            </LayoutLeftMenu>
                            <div className="flex flex-1 flex-col h-full overflow-hidden">
                                <div className=" flex-1 px-2 md:px-8 relative overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-bg-select ">
                                    <BootData>
                                        {children}
                                    </BootData>
                                </div>
                            </div>
                            <div className=" ">
                                {/* <LeftMenu /> */}
                            </div>
                        </div>
                        {/* BOTTOM MENU */}
                        {/* <div className=" w-full  dark:bg-slate-800 px-2 py-1">
                            <BottomMenu />
                        </div> */}

                        {/* <SeeDetailsInModal /> */}
                    </div>

                    {/* <InitStateZusband */}
                    {/* verificationStatus={resVS.ok ? resVS.data! : []} */}
                    {/* /> */}
                    <DynamicToaster />

                    {/* Inicializar datas al inicial la aplicación */}
                </QueryProvider>
            </NextAuthProvider >
        </>
    );
}