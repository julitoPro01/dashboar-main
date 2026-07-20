// app/auth.ts - VERSIÓN COMPLETA CORREGIDA
import { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { z } from "zod";
import CredentialsProvider from 'next-auth/providers/credentials';
import { RoleType } from "@/src/generated/prisma/enums"; 
import { RoleGroup } from "./src/shared/domains/accessControl";
import { Login } from "./src/action/auth";



export const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.email().trim(),
                        password: z.string().trim().min(6)
                    })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const auth = await Login(parsedCredentials.data);

                const { ok, data } = auth;

                if (!ok) return null;

                const { id, email, name, roles, primaryRole, permissions, roleGroup } = data!;
                // Ejemplo con usuario hardcodeado

                const concatId = id + id.toString().length;
                // valido el primer valor
                const parseId = id + "-" + id.toString().length + "-" + concatId + "-" + (concatId + concatId);

                return {
                    id: parseId,
                    email,
                    name,
                    roles,
                    primaryRole,
                    permissions,
                    roleGroup,
                };
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.roles = user.roles;
                token.primaryRole = user.primaryRole;
                token.permissions = user.permissions;
                token.roleGroup = user.roleGroup;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.id as string).split("-").at(0)!;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.roles = token.roles as RoleType[];
                session.user.primaryRole = token.primaryRole as RoleType;
                session.user.permissions = token.permissions as string[];
                session.user.roleGroup = token.roleGroup as RoleGroup;
            }
            return session;
        }
    },

    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        signOut:"/auth/create"
    },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);