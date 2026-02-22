import { AppliedFilterLabel, BtnActiveItemFilter } from "@/src/components/table";
import { FORM_FILTER_STYLE } from "@/src/constants";
import { replaceStatePaginationHistory } from "@/src/domains/pagination";
import { APP_ROUTES } from "@/src/domains/routes";
import { useStore } from "@/src/store/useStore";
import { dateFormatter, isValidHtmlDate, normalizeFilters, parseLocalDate } from "@/src/utils";
import { getHasValues } from "@/src/utils/getHasValues";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CgCalendar } from "react-icons/cg";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { MdUnfoldMore } from "react-icons/md";

type Filters = {
    registeredFrom: string;
    registeredTo: string;
    order?: "asc" | "desc";
}

const initFilters: Filters = { registeredFrom: "", registeredTo: "", order: undefined };


export const CreateDate = () => {

    const sortBy = useStore(v => v.supplierPagination.pagination?.sortBy);
    const order = useStore(v => v.supplierPagination.pagination?.order);

    const [filters, setFilters] = useState<Filters>({ ...initFilters });
    const [active, setActive] = useState(false);
    const [prevFilters, setPrevFilters] = useState<{ filters?: Filters, errors?: FieldError }>({});
    const [errors, setError] = useState<FieldError>({});
    const setSupFilters = useStore(v => v.setSupplierFilterAndPagination);

    const handleChange = (name: keyof Filters, value: string) => {

        const msgError = "Fecha inválida";
        const resMsgError = isValidHtmlDate(value) ? undefined : msgError;

        const newData = { ...filters, [name]: value };

        if (resMsgError) {
            setError(v => ({ ...v, [name]: resMsgError }))
        } else {
            if (newData.registeredFrom && newData.registeredTo && (parseLocalDate(newData.registeredFrom) > parseLocalDate(newData.registeredTo)))
                setError(v => ({ ...v, [name]: msgError }))
            else
                setError(v => ({ ...v, registeredFrom: undefined, registeredTo: undefined }))
        }

        setFilters(v => ({ ...v, ...newData }));
    }

    const openFilter = (active: boolean) => {
        if (active) {
            //Guardamos la copia
            setPrevFilters({ filters: { ...filters }, errors: { ...errors } })

        } else {
            //Re-establecemos la copia
            setError({ ...prevFilters.errors });
            setFilters({ ...(prevFilters.filters ?? initFilters) })
        }
        setActive(active);
    }

    const handleApply = () => {

        const validateField = (_: keyof Filters, value: string) => isValidHtmlDate(value)

        const res = normalizeFilters({ filters, errors, validateField });
        const prev = getHasValues(prevFilters.filters ?? {}) as any
        //TODO: API... res
        if (res.registeredFrom !== prev.registeredFrom || res.registeredTo !== prev?.registeredTo) {
            console.log("new", res)
        }

        console.log(prev, res)
        //CERRAMOS
        setActive(false);

    }

    const handleClean = () => {

        //TODO: API... {}

        setFilters(v=>({ ...v,registeredFrom:"",registeredTo:"" }));
        setError({});
        setPrevFilters({})

    }

    const applyOrder = () => {
        const applyOrder = filters.order === "desc" ? "asc" : filters.order === "asc" ? undefined : "desc";
        
        replaceStatePaginationHistory(APP_ROUTES.SUPPLIERS.INDEX, window.location.search, { order: applyOrder ?? "asc", sortBy: applyOrder ? "created_at" : "order" })
        setSupFilters({}, { order: applyOrder ?? "asc", sortBy: applyOrder ? "created_at" : "order" })

        setFilters(v => ({ ...v, order: applyOrder }));
    }

    const hasValues = !active ? Object.entries({ registeredFrom: filters.registeredFrom, registeredTo: filters.registeredTo })
        .filter(([key, value]) => !errors[key as keyof FieldError] && value.trim())
        .map(([_, value]) => (dateFormatter.format((parseLocalDate(value))))) : []

    useEffect(() => {

        if (sortBy && order) {
            setFilters(v => ({ ...v, order: sortBy === "created_at" ? order : undefined }));
        }

    }, [sortBy, order])


    return (
        <>
            {active &&
                <div className=" fixed inset-0 z-10" onClick={() => openFilter(false)} />
            }
            <div className="flex items-center justify-end gap-1">

                <BtnActiveItemFilter
                    active={active}
                    onClick={() => openFilter(!active)}
                    icon={<CgCalendar size={16} />}
                />

                <button onClick={applyOrder} className="hover:text-text-muted p-1" >
                    {filters.order === "desc" ? <IoMdArrowDown size={16} /> : filters.order === "asc" ? <IoMdArrowUp size={16} /> : <MdUnfoldMore size={16} />}
                </button>

                <span className="font-bold uppercase text-xs" >Creado</span>
            </div>

            {!active && hasValues.length > 0 && <AppliedFilterLabel label={hasValues.join(" - ")} onClick={handleClean} />}

            {
                active &&
                <div className="absolute top-full right-0 overflow-hidden text-sm font-normal z-50 mt-1 w-64 rounded-xl border border-border dark:border-border-strong bg-surface-overlay shadow-xl">

                    {/* Actions */}
                    <div className="flex px-4 py-3 bg-surface-elevated font-semibold">
                        <button className=" text-xs text-text-muted hover:text-text" onClick={handleClean}>
                            Limpiar
                        </button>
                        <div className="flex-1"></div>
                        <button className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold" onClick={handleApply}>
                            Aplicar filtros
                        </button>
                    </div>

                    {/* Options */}
                    <div className="max-h-60 space-y-2 gap-2 p-2 text-start">
                        <div className="px-3 pt-2">
                            <label className={FORM_FILTER_STYLE.label}>
                                <span className="block mb-1">Registrado desde</span>
                                <input
                                    value={filters.registeredFrom}
                                    type="date"
                                    onChange={({ target }) => handleChange("registeredFrom", target.value)}
                                    className={clsx(FORM_FILTER_STYLE.base, {
                                        [FORM_FILTER_STYLE.state.normal]: !errors.registeredFrom,
                                        [FORM_FILTER_STYLE.state.error]: errors.registeredFrom
                                    })} />
                            </label>
                        </div>
                        <div className="px-3 pb-2">
                            <label className={FORM_FILTER_STYLE.label}>
                                <span className="block mb-1">Registrado hasta</span>
                                <input
                                    value={filters.registeredTo}
                                    type="date"
                                    onChange={({ target }) => handleChange("registeredTo", target.value)}
                                    className={clsx(FORM_FILTER_STYLE.base,
                                        {
                                            [FORM_FILTER_STYLE.state.normal]: !errors.registeredTo,
                                            [FORM_FILTER_STYLE.state.error]: errors.registeredTo
                                        })} />
                            </label>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


type FieldError = Partial<Record<keyof Filters, string>>;

const validateWithError = (v: string) => {
    return isValidHtmlDate(v) ? undefined : "Fecha inválida"
};