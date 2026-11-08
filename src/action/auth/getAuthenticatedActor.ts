"use server";
import { auth } from "@/auth.config";

export interface AuthenticatedActor {
    id: number;
    name: string;
}

/** Obtiene la identidad autenticada desde la sesión del servidor. */
export const getAuthenticatedActor = async (): Promise<AuthenticatedActor | null> => {
    const session = await auth();
    const user = session?.user;
    const id = Number(user?.id);

    if (!user || !Number.isSafeInteger(id) || id <= 0) {
        return null;
    }

    return {
        id,
        name: user.name ?? user.email ?? "Usuario",
    };
};
