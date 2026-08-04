"use client";

import { useBootDataStore } from "@/src/store/useBootDataStore";
import { GrNext, GrPrevious } from "react-icons/gr"
import { useRouter } from "next/navigation";

import { MetaPagination, PaginationState } from "./types";
import { getSortByLabel } from "./constants";
import { createURLPaginationParams, parsePage, parsePagination, updatePaginationParams } from "./utils";

interface Props {
    pagination: PaginationState;
    metaPagination: MetaPagination;

    reagent?: { client: true, basePath: string } | { client: false, basePath?: string }
}

export const TablePaginationUrl = ({ pagination: pag, metaPagination: meta, reagent }: Props) => {

    const { page, isNotValidPage, showing, availablePage, availablePageSize } = parsePagination({
        currentPage: pag.page,
        pageSize: pag.pageSize,
        totalItems: meta.totalItems,
        totalPages: meta.totalPages
    });

    const router = useRouter();

    const isBootDataLoaded = useBootDataStore(v => v.isBootDataLoaded);

    const changePageSize = (value: string) => {
        if (!isBootDataLoaded) return;
        const newPage = parsePage(+value, meta.totalItems, page)

        if (reagent?.client) {

            updatePaginationParams({
                basePath: reagent.basePath,
                searchParams: window.location.search,
                query: { page: newPage, pageSize: +value }
            })
        } else {
            const url = createURLPaginationParams({
                basePath: reagent?.basePath ?? "",
                searchParams: window.location.search, query: { page: newPage, pageSize: +value }
            });
            router.replace(url, { scroll: false });
        }

    }

    const goToPage = (newPage: number) => {
        if (!isBootDataLoaded) return;
        if (newPage < 1 || newPage > meta.totalPages) return;

        if (reagent?.client) {
            updatePaginationParams({
                basePath: reagent.basePath,
                searchParams: window.location.search,
                query: { page: newPage }
            })
        } else {
            const url = createURLPaginationParams({
                basePath: "",
                searchParams: window.location.search, query: { page: newPage }
            });
            router.replace(url, { scroll: false });
        }
    };

    const sortLabel = getSortByLabel(pag.sortBy, pag.order);

    return (
        <>

            <div className="flex shadow-card bg-surface border-x border-border text-text-muted whitespace-nowrap justify-between items-center  gap-10 min-h-12 py-2  px-8 overflow-x-auto  overflow-y-hidden scrollbar-hide">

                {/* Sección izquierda */}
                <div className="flex-1 flex items-center justify-center gap-2 text-sm ">
                    <span className="tracking-wide ">Mostrando <span className="font-bold ">{showing}</span> de</span>
                    <select
                        className="ps-2 py-1 text-sm border border-border hover:border-gray-400 rounded-md font-semibold transition-colors duration-150"
                        value={pag.pageSize}
                        name="pageSize"
                        title="Seleccionar número de filas"
                        onChange={({ target }) => changePageSize(target.value)}
                    >
                        {availablePageSize.map((n) => (<option key={n} value={n}>{n}</option>))}
                    </select>
                    <span>Total: <span className="font-semibold">{meta.totalItems} </span> </span>
                </div>

                {/* Sección central */}
                <div className="flex-1 flex items-center justify-center gap-2">
                    <button
                        className="flex items-center justify-center w-7 h-7 rounded-md border border-border enabled:hover:border-gray-400 font-semibold transition-all duration-150   disabled:text-text-secondary/60"
                        title="Anterior"
                        disabled={page <= 1}
                        onClick={() => goToPage(page - 1)}
                    >
                        <GrPrevious size={14} />
                    </button>
                    <select
                        className={`px-2 py-1  text-sm border border-border hover:border-gray-400 tracking-wide ${isNotValidPage ? "border-red-500" : "border-br-secondary"}  rounded-md  font-semibold  transition-colors duration-150`}
                        name="page"
                        title="Seleccionar página"
                        value={isNotValidPage ? pag.page.toString() : page.toString()}
                        onChange={({ target }) => goToPage(+target.value)}
                    >
                        {availablePage.map(n => (<option key={n} value={n}> Página {n} </option>))}
                        {isNotValidPage && <option disabled value={pag.page}> Página {pag.page} no válida </option>}
                    </select>

                    <span className="text-sm ">de  <span className=" font-semibold">{meta.totalPages}</span> </span>

                    <button
                        className="flex items-center justify-center w-7 h-7 rounded-md border border-border enabled:hover:border-gray-400 transition-all duration-150 disabled:text-text-secondary/60"
                        title="Siguiente"
                        disabled={page >= meta.totalPages}
                        onClick={() => goToPage(page + 1)}
                    >
                        <GrNext size={14} />
                    </button>
                </div>

                {/* Sección derecha */}


                <div className="flex-1 flex items-center justify-center gap-3">
                    <span className=" text-sm tracking-wide">{sortLabel.label} <span className="font-semibold">{sortLabel.value}</span></span>
                    {/* <button className="ml-auto hover:text-text" onClick={()=>queryClient.invalidateQueries()}><GrPowerReset /></button> */}
                </div>
            </div>

        </>

    )
}




