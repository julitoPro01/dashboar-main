
import { auth } from "@/auth.config";
import { LayoutPanel } from "./ui/LayoutPanel";
import { getCategories } from "@/src/action/category";
import { ErrorServer } from "@/src/shared/components/error";
import { DeleteCategoryModal, ItemFloatingActions, InfoCategories, MainCategories, SubCategories, EditCategoryModal } from "@/src/features/category/list-tree";

interface Props { searchParams: { order?: string } }

export default async function CategoriesPage({ searchParams }: Props) {


  const query = await searchParams

  const isDesc = query.order?.toLowerCase() === "desc";

  const [mainCategories] = await Promise.all([getCategories({ mains: true, isDesc })]);

  const session = await auth();
  const user = session!.user;

  if (!mainCategories.ok)
    return <div className="py-4">
      <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
    </div>


  return (
    <div className="flex flex-col gap-6 w-full h-full pt-6  text-black">

      <InfoCategories />

      <div className="h-full shadow-card border rounded-t-xl overflow-hidden border-border bg-surface">

        <LayoutPanel
          main_categories={<MainCategories
            mainCategories={mainCategories.data}
            user={{ name: user.name, id: +user.id }}
          />}
        >
          <SubCategories />
        </LayoutPanel>
      </div>

      <EditCategoryModal />

      <ItemFloatingActions />

      <DeleteCategoryModal />
    </div>
  );
}