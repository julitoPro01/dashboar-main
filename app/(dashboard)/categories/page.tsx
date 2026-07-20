
import { auth } from "@/auth.config";
import { LayoutPanel } from "./ui/LayoutPanel";
import { getCategories} from "@/src/action/category";
import { CategoryEdit, FloatingMenu, InfoCategories, MainCategories, SubCategories } from "@/src/features/category";
import { ErrorServer } from "@/src/shared/components/error";

interface Props { searchParams: { order?: string } }

export default async function CategoriesPage({ searchParams }: Props) {


  const query = await searchParams

  const isDesc = query.order?.toLowerCase() === "desc";

  const [mainCategories] = await Promise.all([getCategories({ mains: true })]);

  const session = await auth();
  const user = session!.user;

  if (!mainCategories.ok)
    return <div className="py-4">
      <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
    </div>

  const data = mainCategories.data!.sort((a, b) => {
    return isDesc
      ? b.recordStatus.localeCompare(a.recordStatus, "es", {sensitivity:"base",numeric:true})
      : a.recordStatus.localeCompare(b.recordStatus, "es", {sensitivity:"base",numeric:true});
  });

  return (
    <div className="flex flex-col gap-6 w-full h-full pt-6  text-black">

      <InfoCategories />

      <div className="h-full shadow-card border rounded-t-xl overflow-hidden border-border bg-surface">

        <LayoutPanel
          main_categories={<MainCategories
            mainCategories={data}
            user={{ name: user.name, id: +user.id }}
          />}
        >
          <SubCategories user={{ name: user.name, id: +user.id }} />
        </LayoutPanel>
      </div>

      <CategoryEdit />

      <FloatingMenu />
    </div>
  );
}