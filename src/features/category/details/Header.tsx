import { APP_ROUTES } from "@/src/shared/routes";
import { Breadcrumbs } from "@/src/shared/components/navigation";

interface Props {
    name: string;
}
export const Header = ({ name }: Props) => {

    const links = [{href:APP_ROUTES.CATEGORIES.INDEX,label:"Categorías"},{href:"",label:name}];

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
               <Breadcrumbs items={links} />

                <h1 className="text-2xl font-semibold text-text-strong">
                    {name}
                </h1>

                <p className="text-text-muted text-sm mt-1">
                    Información y configuración de la categoría.
                </p>
            </div>

        </div>)
}
