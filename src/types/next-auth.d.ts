import { RoleType } from "@/src/generated/prisma/enums";
import { RoleGroup } from "../interfaces/auth/rolePermissions.interfaces";
import { DefaultSession } from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            roles: RoleType[];
            primaryRole: RoleType;
            permissions: string[];
            roleGroup: RoleGroup;

        } & DefaultSession["user"];
    }
    interface User {
        id: string;
        email: string;
        name: string;
        roles: RoleType[];
        primaryRole: RoleType;
        permissions: string[];
        roleGroup: RoleGroup;
    }
}