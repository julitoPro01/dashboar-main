// "use client"
import { IoHome, IoLogInOutline, IoLogOutOutline } from "react-icons/io5"
import { auth, signOut } from "@/auth.config"
import { FaRegUser } from "react-icons/fa"
import { ProductNavigation, SupplierNavigation } from "./ui"
import { CiSettings, CiUser } from "react-icons/ci"
import { NavItem } from "./ui/NavItem"




export const LeftMenu = async() => {


    const session = await auth();

    const img = "/assets/notfound.jpg";
    const role = session?.user ? session.user.primaryRole : "Demo";
    const name = session?.user ? session.user.name : "Demo";

    const onCloseSession = async () => {
        "use server";
        await signOut({ redirect: true });
    }

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
                        // style={{ color: "var(--color-primary)" }}
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
                    {/* Dashboard */}
                    <li className="px-3 pt-6 pb-2 sidebar-section">
                        Dashboard
                    </li>

                    <li>
                        <NavItem
                            href="/product/sldfs-sdfls12-21/variant"
                            label="Variante test"
                            icon={<IoHome />}
                        />
                    </li>

                    <li>
                        <NavItem
                            href="/category"
                            label="Category test"
                            icon={<IoHome />}
                        />
                    </li>

                    <li>
                        <NavItem
                            href="/product/create"
                            label="Product add test"
                            icon={<IoHome />}
                        />
                    </li>

                    <li>
                        <NavItem
                            href="/"
                            label="Home"
                            icon={<IoHome />}
                        />
                    </li>

                    <ProductNavigation />
                    <SupplierNavigation />

                    <li>
                        <NavItem
                            href="/products"
                            label="Variantes del producto"
                            icon={<IoHome />}
                        />
                    </li>

                    {/* Settings */}
                    <li className="px-3 pt-6 pb-2 sidebar-section">
                        Settings
                    </li>

                    <li>
                        <NavItem
                            href="/profile"
                            label="Profile"
                            icon={<CiUser />}
                        />
                    </li>

                    <li>
                        <NavItem
                            href="/settings"
                            label="Settings"
                            icon={<CiSettings />}
                        />
                    </li>

                    {/* Auth */}
                    {!session?.user ? (
                        <>
                            <li>
                                <NavItem
                                    href="/auth/login"
                                    label="Login"
                                    icon={<IoLogInOutline size={18} />}
                                />
                            </li>

                            <li>
                                <NavItem
                                    href="/auth/create"
                                    label="Crear cuenta"
                                    icon={<FaRegUser size={16} />}
                                />
                            </li>
                        </>
                    ) : (
                        <li>
                            <button
                                onClick={onCloseSession}
                                className="sidebar-item destructive w-full"
                            >
                                <span className="sidebar-icon">
                                    <IoLogOutOutline size={18} />
                                </span>
                                <span className="text-sm font-medium truncate">
                                    Logout
                                </span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
}
