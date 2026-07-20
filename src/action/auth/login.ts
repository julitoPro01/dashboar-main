"use server"

import prisma from "@/lib/prisma";
import { getPermissionsForRole, getRoleGroup } from "@/src/shared/domains/accessControl";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import bcrypt from 'bcrypt';

interface Props {
    email: string,
    password: string
}

export const Login = async ({ email, password }: Props) => {
    return PromiseReturn(async()=>{

    
            const userAuth = await prisma.userAuthentication.findFirst({
                where: {
                    email: email,
                    isDeleted: false,
                    verificationStatus: { is: { name: "APPROVED" } }
                },
                include: {
                    userRoles: {
                        include: {
                            role: true
                        }
                    },
                    user: true,
                    supplierUser: true,
                }
            });
            
            // ... validación de password
            if (!userAuth)
                return ApiResponse.notFound("No hay ningún usuario con estas credenciales.");
            
            const isOkPass = bcrypt.compareSync(password, userAuth.passwordHash);
            
            if (!isOkPass)
                return ApiResponse.badRequest("Las credenciales no son válidas.");
            
            
            // Determinar tipo de usuario
            let userData;
            if (userAuth && userAuth.supplierUser) {
                userData = userAuth.supplierUser;
            } else {
                userData = userAuth!.user;
            }
            
            const { userRoles, primaryRole, id } = userAuth!;
            const { firstName, lastName } = userData!;
            
            const roles = userRoles.map(ur => ur.role.name);
            
            // Obtener permisos basados en roles
            const allPermissions = roles.flatMap(role =>
                getPermissionsForRole(role)
            );
            
            const uniquePermissions = [...new Set(allPermissions)];
            
            return ApiResponse.success("Inicio de sesión exitoso",{
                
                id: id,
                email: userAuth!.email,
                name: firstName + " " + lastName,
                roles,
                primaryRole,
                permissions: uniquePermissions,
                roleGroup: getRoleGroup(primaryRole),
            })
        })
}


export default Login;