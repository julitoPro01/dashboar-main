
import { auth } from '@/auth.config';
import { SessionButton } from "@/src/features/auth";
import { NavigationItems } from './NavigationItems';

export const LeftMenu = async () => {

    const session = await auth();

    const isSignIn = !!session?.user
    const img = "/assets/notfound.jpg";
    const role = session?.user ? session.user.primaryRole : "Demo";
    const name = session?.user ? session.user.name : "Demo";

    return (
        <aside className="sidebar flex flex-col w-64 h-full px-3 pt-4">
            {/* User card */}
            <div className="sidebar-card flex items-center h-20 px-3 rounded-lg">
                <img
                    src={img}
                    alt="avatar"
                    className="h-10 w-10 rounded-full border"
                    style={{ borderColor: "var(--color-primary)" }}
                />

                <div className="ml-3 min-w-0">
                    <p
                        className="text-sm font-semibold truncate"
                    >
                        {name}
                    </p>

                    <span
                        className="inline-flex mt-1 px-2 py-0.5 text-xs font-medium rounded-full"
                        style={{
                            background: "var(--color-hover)",
                            color: "var(--color-primary)",
                        }}
                    >
                        {role}
                    </span>
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto scrollbar-hide  mt-2 ">
                <ul className="flex flex-col">

                    <NavigationItems />

                    <SessionButton isSignIn={isSignIn} />
                </ul>
            </nav>
        </aside>
    )
}
