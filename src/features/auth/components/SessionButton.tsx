import { handleSignOut } from "@/src/action/auth";
import { NavItem } from "@/src/shared/components/navigation";
import { FaRegUser } from "react-icons/fa";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

interface Props {
    isSignIn: boolean
}
export const SessionButton = ({ isSignIn }: Props) => {
    return (
        <>
            {isSignIn ? (

                <li>
                    <button
                        onClick={handleSignOut}
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

            ) : (
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
            )
            }
        </>
    )
}
