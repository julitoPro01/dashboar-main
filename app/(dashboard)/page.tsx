import { Suspense } from "react";
import { Test } from "./Test";


export default function DashboarPage() {


  return (
    <div className=" w-full h-full overflow-auto text-black">
      <h1>Hello Page, dashboard</h1>
      <Suspense fallback={<h1>Cargando...</h1>} >
        {/* <Test publicId=""/> */}
      </Suspense>
    </div>
  );
}