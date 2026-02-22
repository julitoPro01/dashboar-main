import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode; }) {

  const session = await auth();

  // if(session?.user)
  //   redirect("/")

  return (
    <div className="h-screen flex flex-col ">
      <h1>Bienvenido al gestor de catalogo Modanix</h1>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}