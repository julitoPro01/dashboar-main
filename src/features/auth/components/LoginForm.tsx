// app/auth/login/page.tsx
"use client";

import { ChangeEvent, FocusEvent, useActionState, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { authenticate } from "@/src/action";

// export const LoginForm=()=> {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         redirect: false, // Importante para manejar errores
//       });

//       if (result?.error) {
//         setError("Credenciales inválidas");
//       } else {
//         router.push("/dashboard");
//         router.refresh();
//       }
//     } catch (error) {
//       setError("Error al iniciar sesión");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2" htmlFor="password">
//             Contraseña
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {loading ? "Cargando..." : "Iniciar Sesión"}
//         </button>
//       </form>
//     </div>
//   );
// }

const validate = {
    email: (value: string): boolean => (/^\S+@\S+\.\S+$/.test(value)),
    password: (value: string): boolean => (value.trim().length) > 5
}

export const LoginForm = () => {

    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    const [state, setstate] = useState({ email: { value: "super_admin@gmai.com", isError: false }, password: { value: "123456", isError: false } })

    const [showPassword, setShowPassword] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const onChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        const values = {
            ...state,
            [target.name]: { value: target.value, isError: false }
        };

        const isOk = validate.email(values.email.value) && validate.password(values.password.value);


        setstate(values);
        setIsValidForm(isOk)
    }

    const onBlur = (e: FocusEvent) => {
        const target = e.target as HTMLInputElement;
        const { email, password } = state;

        const isErrorEmail = target.name === "email" ? !validate.email(email.value) : email.isError;
        const isErrorPassword = target.name === "password" ? !validate.password(password.value) : password.isError

        setstate({
            email: { value: email.value, isError: isErrorEmail },
            password: { value: password.value, isError: isErrorPassword }
        });
    }

    return (
        <form action={formAction}
            className="space-y-4 text-gray-700" >

            {
                (errorMessage === "Invalid credentials.") && (
                    <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
                        Las credenciales no son válidas.
                    </div>
                )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 `}
                    placeholder="tu@correo.com"
                    value={state.email.value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {state.email.isError && (
                    <p className="mt-1 text-xs text-red-600">Ingrese un correo válido.</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>

                <div className="relative mt-1">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className={`w-full rounded-lg border px-3 py-2 pr-28 outline-none focus:ring-2 focus:ring-indigo-500 `}
                        placeholder="●●●●●●●"
                        value={state.password.value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm  hover:bg-gray-200 px-3 py-1 rounded-md"
                    >
                        {showPassword ? <FaRegEyeSlash size={24} /> : <FaRegEye size={24} />}
                    </button>
                </div>
                {state.password.isError && (
                    <p className="mt-1 text-xs text-red-600">La contraseña debe tener al menos 6 caracteres.</p>
                )}
            </div>

            <div className="flex items-center justify-between">

                <a href="/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">
                    ¿Olvidaste la contraseña?
                </a>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isPending || !isValidForm}
                    className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-medium disabled:opacity-60 disabled:hover:bg-indigo-600"
                >

                    {isPending ? (
                        <>
                            <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
                                <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                            Iniciando...
                        </>
                    ) : (
                        "Iniciar sesión"
                    )}
                </button>
            </div>
        </form>

    )
}