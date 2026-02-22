import { FORM_FILTER_STYLE } from "@/src/constants"
import { replaceStatePaginationHistory } from "@/src/domains/pagination"
import { APP_ROUTES } from "@/src/domains/routes"
import { useStore } from "@/src/store/useStore"
import clsx from "clsx"
import debounce from "lodash.debounce"
import { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IoIosClose, IoMdArrowDown, IoMdArrowUp } from "react-icons/io"
import { MdUnfoldMore } from "react-icons/md"

type Filters = { search: string, applied: string, order?: "asc" | "desc" }
const MIN_SEARCH_CHARS = 3;

export const NameBusiness = () => {

    const sortBy = useStore(v => v.supplierPagination.pagination?.sortBy);
    const order = useStore(v => v.supplierPagination.pagination?.order);
    const setSupplierFilter = useStore(v => v.setSupplierFilterAndPagination);

    const [filters, setFilters] = useState<Filters>({ search: "", applied: "", order: undefined });

    const applySearch = useRef(
        debounce((val: string) => {

            const currentPage = new URLSearchParams(window.location.search).get("page");
            const search = val.length >= MIN_SEARCH_CHARS ? { search: val } : {};
            const page = currentPage !== "1" ? { page: 1 } : {};
            const del: any = val.length < MIN_SEARCH_CHARS ? { search: true } : undefined;

            if (currentPage !== "1") replaceStatePaginationHistory(APP_ROUTES.SUPPLIERS.INDEX, window.location.search, page)

            setSupplierFilter(search, page, del)
        }, 550)
    ).current;

    const handleSearch = (value: string) => {
        const val = value.trim();
        const apply = val.length >= MIN_SEARCH_CHARS ? val : "";

        setFilters(v => ({ ...v, search: value, applied: apply }));

        if (apply !== filters.applied) {
            applySearch(apply)
        }
    }

    const handleOrderBy = () => {
        const order = filters.order === "desc" ? "asc" : filters.order === "asc" ? undefined : "desc";
        const applyOrder = order ?? "asc";
        const applySort = order ? "name" : "order";

        setSupplierFilter({}, { order: applyOrder, sortBy: applySort });

        replaceStatePaginationHistory(APP_ROUTES.SUPPLIERS.INDEX, window.location.search, { order: applyOrder, sortBy: applySort })

        setFilters(v => ({ ...v, order }));
    }

    const handleClean = () => {
        setFilters(v => ({ ...v, search: "", applied: "" }));
        setSupplierFilter({}, {}, { search: true })
    }


    useEffect(() => {
        if (sortBy && order) {
            setFilters(v => ({ ...v, order: sortBy === "name" ? order : undefined }));
        }
    }, [sortBy, order])

    useEffect(() => {
        return () => {
            applySearch.cancel();
        };
    }, []);

    const valid = filters.search.trim().length === 0 || filters.search.trim().length > 2

    return (
        <div className="flex items-center gap-1 ">
            <span className="font-bold text-xs uppercase truncate text-start">Empresa</span>

            <button onClick={handleOrderBy} className="hover:text-text-muted p-1" >
                {filters.order === "desc" ? <IoMdArrowDown size={16} /> : filters.order === "asc" ? <IoMdArrowUp size={16} /> : <MdUnfoldMore size={16} />}
            </button>
            <div className="relative flex-1  rounded-lg bg-white flex items-center">

                {filters.search.trim().length > 0
                    ? <span className={"absolute right-2 p-0.5 rounded-md border bg-red-50 border-red-200 text-red-500"} onClick={handleClean} ><IoIosClose size={20} /></span>
                    : <label htmlFor="f-company" className={"absolute right-2"} ><CiSearch size={18} /></label>
                }

                <input
                    id="f-company"
                    type="text"
                    className={clsx(FORM_FILTER_STYLE.base, "pe-8", {
                        [FORM_FILTER_STYLE.state.normal]: valid,
                        [FORM_FILTER_STYLE.state.error]: !valid,
                    })}
                    placeholder="Buscar por nombre. Min 3 carat..."
                    value={filters.search}
                    onChange={({ target }) => handleSearch(target.value)}
                />
            </div>
        </div>)
}
