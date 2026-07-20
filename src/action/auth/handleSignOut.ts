"use server";

import { signOut } from "@/auth.config";

export const handleSignOut = async () => {
    await signOut({ redirect: true });
};
