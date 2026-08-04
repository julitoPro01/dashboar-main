import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"
import { Button } from "../../components/btn"
import { MetaPagination, PaginationState } from "./types"
import { getPaginationItems, parsePagination } from "./utils";

interface Props {
    pagination: PaginationState;
    metaPagination: MetaPagination;
    onGoToPage: (page: number) => void;
    onPageSizeChange: (page: number, pageSize: number) => void;
}

export const TablePagination = ({ pagination: pag, metaPagination: meta, onGoToPage, onPageSizeChange }: Props) => {

    const { page } = parsePagination({
        currentPage: pag.page,
        pageSize: pag.pageSize,
        totalItems: meta.totalItems,
        totalPages: meta.totalPages
    });

    // const changePageSize = (value: string) => {
    //     const newPage = parsePage(+value, meta.totalItems, page)
    //     onPageSizeChange(newPage, +value)
    // }

    const goToPage = (newPage: number) => {
        if (newPage < 1 || newPage > meta.totalPages) return;
        onGoToPage(newPage)
    };



    return (
        <div className="px-8 py-2 flex justify-between flex-wrap text-sm text-text-muted gap-2">

            <div className="bg-background inline-flex items-center gap-2 py-1.5 px-4 rounded-full">
                <span >Total: <span className="font-semibold">{meta.totalItems} </span> </span>
                {/* <div className="border-l border-border-strong h-full mx-1" /> */}
                {/* 
                <div className="flex-1 flex items-center justify-center gap-3 text-sm ">
                    <span className="font-semibold" >{showing} </span>
                    <span>de</span>
                    <select
                        className=" py-1 text-sm hover:bg-hover rounded-md font-semibold"
                        value={`${pag.pageSize}`}
                        name="pageSize"
                        title="Seleccionar número de filas"
                        onChange={({ target }) => changePageSize(target.value)}
                    >
                        {availablePageSize.map((n) => (<option key={n} className="bg-surface" value={n}>{n}</option>))}
                    </select>
                </div> */}
            </div>

            <div className="bg-background inline-flex gap-2 py-1.5 px-2 rounded-full">
                <Button rounded="full" padding="px-1.5" variant="basic"
                    title="Anterior"
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}>
                    <MdArrowBackIosNew size={18} />
                </Button>

                {
                    getPaginationItems(page, meta.totalPages).map(v => {

                        if (typeof v === "string")
                            return <span key={v} className=" font-semibold px-3 py-1">...</span>

                        return (
                            <button key={v}
                                className={` font-semibold px-3 py-1 ${v === page ? "bg-bg-select" : ""} rounded-md hover:bg-hover cursor-pointer`}
                                onClick={() => goToPage(v)}
                            >
                                {v}
                            </button>
                        )
                    })
                }

                <Button rounded="full" padding="px-1.5" variant="basic"
                    title="Siguiente"
                    disabled={page >= meta.totalPages}
                    onClick={() => goToPage(page + 1)}>
                    <MdArrowForwardIos size={18} />
                </Button>
            </div>
        </div>
    )
}
