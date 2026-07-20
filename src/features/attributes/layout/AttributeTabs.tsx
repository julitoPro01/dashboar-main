"use client";
import { Button } from "@/src/shared/components/btn"
import { APP_ROUTES } from "@/src/shared/routes";
import { usePathname } from "next/navigation";
import { useStore } from "@/src/store/useStore";
import { FaPlus } from "react-icons/fa";
import { CategorySelectorBar } from "../category-attributes/components/CategorySelectorBar";
import { createURLPaginationParams } from "@/src/shared/table";

export const AttributeTabs = () => {

    const pathName = usePathname();

    const isManage = pathName === APP_ROUTES.ATTRIBUTES.INDEX;
    const isByCatg = pathName === APP_ROUTES.ATTRIBUTES.CATEGORY;

    const setOpenModalCreate = useStore(v => v.setCreateAttributeModal);

    const urlAttr = () => {
        return createURLPaginationParams({
            basePath: APP_ROUTES.ATTRIBUTES.INDEX,
            searchParams: window.location.search,
        })
    }

    const urlCatrAttr = () => {
        return createURLPaginationParams({
            basePath: APP_ROUTES.ATTRIBUTES.CATEGORY,
            searchParams: window.location.search,
        }, { deleteState: true })
    }

    return (

        <div className="flex flex-col gap-2 p-2 bg-surface-elevated scrollbar-hide overflow-auto min-w-full whitespace-nowrap border border-b-0 shadow-card border-border rounded-t-xl">
            <div className="flex gap-2 ">

                <Button variant="tab" select="tab" href={urlAttr()} active={isManage}>
                    Gestionar atributos
                </Button>

                <Button variant="tab" select="tab" href={urlCatrAttr()} active={isByCatg}>
                    Atributos por categoría
                </Button>

                <Button variant="tab"
                    onClick={() => setOpenModalCreate(true)}
                    className="flex items-center gap-2 ml-auto"
                >
                    <FaPlus className="text-xs" /> Nuevo atributo
                </Button>
            </div>
            {
                isByCatg && <CategorySelectorBar />
            }
        </div>
    )
}