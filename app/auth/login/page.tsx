import { LoginForm } from "@/src/features/auth";
import Link from "next/link";

export default function LoginPage() {
    
    return (
        <div className="h-full flex items-center justify-center">
            <div className=" max-w-md mx-auto bg-white rounded-2xl shadow-md p-6">

                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Iniciar sesión</h1>

                <LoginForm />

                <div className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <Link href="/auth/create" className="text-indigo-600 hover:underline">
                        Regístrate
                    </Link>
                </div>
            </div>

        </div>
    );
}