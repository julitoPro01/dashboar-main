import { FORM_STYLES } from "@/src/constants";
import { getAvailableSecondaryRoles, getRoleOptionsByGroup, RoleGroup, UserRole } from "@/src/domains/auth";
import clsx from "clsx";

interface RoleSelectorProps {
    group: RoleGroup; // "supplier" | "platform" | etc
    primaryRole?: UserRole;
    secondaryRoles: UserRole[];
    errorMessage?:string,

    onPrimaryChange: (role: UserRole) => void;
    onSecondaryChange: (roles: UserRole[]) => void;
}


export const RoleSelector = ({
    group,
    primaryRole,
    secondaryRoles,
    errorMessage,
    onPrimaryChange,
    onSecondaryChange,

}: RoleSelectorProps) => {

    const roles = getRoleOptionsByGroup(group);
    const levelRoles = primaryRole ? getAvailableSecondaryRoles(primaryRole, group).map(v => v.role) : [];

    const toggleSecondaryRole = (role: UserRole) => {
        if (secondaryRoles.includes(role)) {
            onSecondaryChange(secondaryRoles.filter(r => r !== role));
        } else {
            onSecondaryChange([...secondaryRoles, role]);
        }
    };

    return (
        <div className="space-y-6">

            {/* ========================= */}
            {/* PRIMARY ROLE */}
            {/* ========================= */}
            <div>
                <div>
                    <span className={FORM_STYLES.label + " " + FORM_STYLES.isRequired}>
                        Rol principal del usuario
                    </span>
                    <p className="text-xs text-gray-500">
                        Define el nivel máximo de acceso
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                    {roles.map(role => {
                        const isSelected = role.KEY === primaryRole;

                        return (
                            <button
                                key={role.KEY}
                                type="button"
                                onClick={() => onPrimaryChange(role.KEY)}
                                className={clsx("px-3 py-1 rounded-lg border text-sm", {
                                    "bg-blue-600 text-white border-blue-600": isSelected,
                                    "border-gray-300 hover:bg-gray-100": !isSelected
                                })}
                            >
                                {role.label}
                            </button>
                        );
                    })}
                </div>
                    {errorMessage && <p className={FORM_STYLES.labelError}>{errorMessage}</p>}
            </div>

            {/* ========================= */}
            {/* SECONDARY ROLES */}
            {/* ========================= */}
            <div>
                <div>
                    <span className={FORM_STYLES.label}>
                        Roles secundarios (opcional)
                    </span>
                    <p className="text-xs text-gray-500">
                        Permite acceder a funciones específicas adicionales
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                    {roles
                        .filter(r => r.KEY !== primaryRole)
                        .map(role => {
                            const disabled = !levelRoles.includes(role.KEY)
                            const isActive = secondaryRoles.includes(role.KEY);

                            return (
                                <button
                                    disabled={disabled}
                                    key={role.KEY}
                                    type="button"
                                    onClick={() => toggleSecondaryRole(role.KEY)}
                                    className={clsx("px-3 py-1 rounded-lg border text-sm disabled:text-gray-400 disabled:bg-gray-50", {
                                        "bg-gray-800 text-white border-gray-800": isActive,
                                        "border-gray-300 hover:bg-gray-100": !isActive
                                    })}
                                >
                                    {role.label}
                                </button>
                            );
                        })}
                </div>
            </div>

        </div>)
}
