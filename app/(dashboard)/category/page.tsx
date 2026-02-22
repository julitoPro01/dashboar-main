import { auth } from "@/auth.config";
import { LayoutPanel } from "./ui/LayoutPanel";
import { getAttrDefinitions, getCategories } from "@/src/action";
import { ErrorServer } from "@/src/components";
import { CategoryAttributes, CategoryDetails, MainCategories, SubCategories } from "@/src/features/category";

export default async function CategoryPage() {

  const [ attrs, mainCategories] = await Promise.all([ getAttrDefinitions(), getCategories({ mains: true })]);

  const session = await auth();
  const user = session!.user


  return (
    <div className=" w-full h-full overflow-auto text-black">

      {
         !attrs.ok || !mainCategories.ok &&
        <div className="p-4">
          <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
        </div>
      }
      {
         attrs.ok && mainCategories.ok &&
        <LayoutPanel
          main_categories={<MainCategories
            categoryStatus={ []}
            mainCategories={mainCategories.data!}
            user={{ name: user.name, id: +user.id }}
          />}

          sub_categories={
            <SubCategories categoryStatus={ []}
              user={{ name: user.name, id: +user.id }}
            />}
        >
          <div className="w-full bg-slate-100 min-h-full flex flex-col min-w-lg">
            <CategoryDetails
              categoryStatus={[]} 
              user={{ name: user.name, id: +user.id }}
            />
            <CategoryAttributes attributes={attrs.data!} />
          </div>
        </LayoutPanel>
      }
    </div>
  );
}