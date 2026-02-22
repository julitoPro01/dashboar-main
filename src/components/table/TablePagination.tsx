"use client";

import { getSortByLabel, MetaPagination, PaginationBasic, replaceStatePaginationHistory } from "@/src/domains/pagination";
import { useStore } from "@/src/store/useStore";
import { GrNext, GrPrevious } from "react-icons/gr"


interface Props {
    queryPagination: PaginationBasic;
    metaPagination: MetaPagination;
    basePath: string;
    setPagination: (_: Partial<PaginationBasic>) => void;
}

export const TablePagination = ({ queryPagination: pag, metaPagination: meta, basePath, setPagination }: Props) => {

    const { page, isNotValidPage, showing, availablePage, availablePageSize } = parsePagination({
        queryPage: pag.page,
        queryPageSize: pag.pageSize,
        totalItems: meta.totalItems,
        totalPages: meta.totalPages
    })

    const isBootDataLoaded = useStore(v => v.isBootDataLoaded);

    const changePageSize = (value: string) => {
        if (!isBootDataLoaded) return;
        const newPage = parsePage(+value, meta.totalItems, page)
        setPagination({ page: newPage, pageSize: +value })
        replaceStatePaginationHistory(basePath, window.location.search, { page: newPage, pageSize: +value })
    }

    const goToPage = (newPage: number) => {
        if (!isBootDataLoaded) return;
        if (newPage < 1 || newPage > meta.totalPages) return;
        setPagination({ page: newPage })
        replaceStatePaginationHistory(basePath, window.location.search, { page: newPage })
    };

    const sortLabel = getSortByLabel(pag.sortBy, pag.order);

    return (
        <>

            <div className="flex  bg-surface border-t border-border text-text-muted whitespace-nowrap justify-between items-center  gap-10 min-h-12 py-2  px-8 overflow-x-auto  overflow-y-hidden scrollbar-hide">

                {/* Sección izquierda */}
                <div className="flex-1 flex items-center justify-center gap-2 text-sm ">
                    <span className="tracking-wide ">Mostrando <span className="font-bold ">{showing}</span> de</span>
                    <select
                        className="ps-2 py-1 text-sm border border-border-strong hover:border-gray-400 rounded-md font-semibold transition-colors duration-150"
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
                        className="flex items-center justify-center w-7 h-7 rounded-md border border-border-strong enabled:hover:border-gray-400 font-semibold transition-all duration-150   disabled:text-text-secondary/60"
                        title="Anterior"
                        disabled={page <= 1}
                        onClick={() => goToPage(page - 1)}
                    >
                        <GrPrevious size={14} />
                    </button>
                    <select
                        className={`px-2 py-1  text-sm border border-border-strong hover:border-gray-400 tracking-wide ${isNotValidPage ? "border-red-500" : "border-br-secondary"}  rounded-md  font-semibold  transition-colors duration-150`}
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
                        className="flex items-center justify-center w-7 h-7 rounded-md border border-border-strong enabled:hover:border-gray-400 transition-all duration-150 disabled:text-text-secondary/60"
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

                </div>
            </div>

        </>

    )
}

const getAvailablePages = (page: number, totalPages: number, range = 5) => {
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};


const parsePage = (pageSize: number, totalItems: number, page: number) => {
    if ((page - 1) * pageSize >= totalItems)
        return Math.max(1, Math.ceil(totalItems / pageSize));
    return page
}

interface ParseProps {
    queryPage: number;
    queryPageSize: number;
    totalItems: number;
    totalPages: number
}
const parsePagination = ({ queryPage, queryPageSize, totalItems, totalPages }: ParseProps) => {

    const page = parsePage(queryPageSize, totalItems, queryPage);
    const showing = (page * queryPageSize <= totalItems ? queryPageSize : queryPageSize - ((page * queryPageSize) - totalItems))
    const availablePage = getAvailablePages(page, totalPages, 10);
    const availablePageSize = [5, 10, 20, 30, 40, 50, 100];

    if (!availablePageSize.includes(queryPageSize) && queryPageSize > 0 && queryPageSize < 101)
        availablePageSize.push(queryPageSize);

    return {
        page,
        showing,
        availablePage,
        isNotValidPage: queryPage > totalPages,
        availablePageSize: availablePageSize.sort((a, b) => a - b)
    }

}



const s = () => {
    return (
        <footer className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-b-xl shadow-sm gap-4">
            <div className="flex-1 min-w-fit">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Showing <span className="font-semibold text-slate-700 dark:text-slate-200">1-10</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">124</span>
                </p>
            </div>
            <div className="flex items-center gap-3 px-4 border-l border-slate-300/50 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Order by</span>
                <button className="group flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md hover:border-primary transition-all shadow-sm">
                    <span>Date</span>
                    <span className="material-symbols-outlined text-lg text-slate-500 group-hover:text-primary transition-colors">arrow_downward</span>
                </button>
            </div>
            <div className="flex items-center justify-center gap-1 px-4 border-l border-slate-300/50 dark:border-slate-700">
                <button className="flex items-center justify-center w-8 h-8 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300" disabled={undefined}>
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <div className="flex items-center gap-2 px-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Page</span>
                    <input className="w-12 h-8 text-center text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary p-0 transition-all shadow-sm" type="text" value="1" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">of 12</span>
                </div>
                <button className="flex items-center justify-center w-8 h-8 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
            </div>
            <div className="flex-1 flex justify-end items-center gap-3 min-w-fit border-l border-slate-300/50 dark:border-slate-700 pl-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Rows per page</span>
                <select className="custom-select h-8 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md py-0 pl-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer shadow-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </footer>
    )
}