"use client";

import { FORM_FILTER_STYLE } from "@/src/constants";
import { ProductTableFilter } from "@/src/interfaces/products";
import { useStore } from "@/src/store/useStore";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef, useState } from "react"
import { GrClose } from "react-icons/gr";
import clsx from "clsx";
import { validateField, validateFieldWithError } from "../../validation/fieldValidationFilter";

export const TableFilterForm = () => {

  const lastAppliedRef = useRef<string>("");


  const [filters, setFilters] = useState(defaultValues);
  const [errors, setErrors] = useState<FilterErrors>({});

  const setProductFilters = useStore(v => v.setProductFilters);

  const clearFilters = () => setFilters(defaultValues);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const onFieldChange = (field: keyof ProductTableFilter, value: string) => {
    const state = { ...filters, [field]: value }
    setFilters(state);

    const error = validateFieldWithError(field, value);

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }

  const applyFilters = useMemo(() => {
    return debounce((filters) => {
      const serialized = JSON.stringify(filters);

      if (serialized === lastAppliedRef.current) return;

      lastAppliedRef.current = serialized;

      setProductFilters(filters);
    }, 500)
  }, []);

  const mappedFilters = useMemo(() => {
    const entries = Object.entries(filters)
      .filter(([key, value]) => {
        if (errors[key as keyof ProductTableFilter]) return false;
        if (value !== undefined) return true;
      })
      .filter(([key, value]) => validateField(key, value))
      .map(([key, value]) => [key, value.trim()]);

    const result = Object.fromEntries(entries);

    // 🔁 Validaciones cruzadas
    if (
      result.priceMin &&
      result.priceMax &&
      Number(result.priceMin) > Number(result.priceMax)
    ) {
      delete result.priceMin;
      delete result.priceMax;
    }

    if (
      result.discountMin &&
      result.discountMax &&
      Number(result.discountMin) > Number(result.discountMax)
    ) {
      delete result.discountMin;
      delete result.discountMax;
    }

    if (
      result.registeredFrom &&
      result.registeredTo &&
      new Date(result.registeredFrom) > new Date(result.registeredTo)
    ) {
      delete result.registeredFrom;
      delete result.registeredTo;
    }

    return result;
  }, [filters]);


  useEffect(() => {
    applyFilters(mappedFilters);

    return () => applyFilters.cancel()
  }, [mappedFilters]);

  return (
    <div className="p-4 border-y border-gray-200 grid grid-cols-2 lg:grid-cols-1 gap-2 items-start text-black">
      {/* COLUMNA IZQUIERDA */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-2 lg:gap-3 ">
        {/* Buscar */}
        <div className=" ">
          <label className={FORM_FILTER_STYLE.label}>Buscar por texto (Min. 5 caracteres)</label>
          <input
            type="text"
            value={filters.search ?? ""}
            onChange={({ target }) => onFieldChange("search", target.value)}
            placeholder="Nombre, SKU..."
            className={`${inputClass("search", errors)} focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none`}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
          {/* Precio min*/}
          <div>
            <label className="text-xs text-gray-500 mb-1">Precio Min</label>
            <input
              type="number"
              value={filters.priceMin ?? ""}
              onChange={({ target }) => onFieldChange("priceMin", target.value)}
              className={inputClass("priceMin", errors)}
              min={0}
            />
          </div>
          {/* Precio max */}
          <div>
            <label className="text-xs text-gray-500 mb-1">Precio Max</label>
            <input
              type="number"
              value={filters.priceMax ?? ""}
              onChange={({ target }) => onFieldChange("priceMax", target.value)}
              className={inputClass("priceMax", errors)}
              min={1}
            />
          </div>

          {/* Descuento min */}
          <div>
            <label className="text-xs text-gray-500 mb-1">Descuento Min %</label>
            <input type="number"
              value={filters.discountMin ?? ""}
              onChange={({ target }) => onFieldChange("discountMin", target.value)}
              className={inputClass("discountMin", errors)}
              min={0}
            />
          </div>
          {/* Descuento max */}
          <div>
            <label className="text-xs text-gray-500 mb-1">Descuento Max %</label>
            <input
              type="number"
              value={filters.discountMax ?? ""}
              onChange={({ target }) => onFieldChange("discountMax", target.value)}
              className={inputClass("discountMax", errors)}
              min={1}
            />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr]  h-full items-start">


        {/* COLUMNA DERECHA */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3  ">
          {/* Fecha */}

          <div>
            <label className="text-xs text-gray-500 mb-1">Registrado desde</label>
            <input
              type="date"
              value={filters.registeredFrom ?? ""}
              onChange={({ target }) => onFieldChange("registeredFrom", target.value)}
              className={inputClass("registeredFrom", errors)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1">Registrado hasta</label>
            <input
              type="date"
              value={filters.registeredTo ?? ""}
              onChange={({ target }) => onFieldChange("registeredTo", target.value)}
              className={inputClass("registeredTo", errors)}
            />
          </div>

          {/* Estados */}
          <div>
            <label className={FORM_FILTER_STYLE.label}>Estado del producto</label>
            <select
              value={filters.statusId ?? ""}
              onChange={({ target }) => onFieldChange("statusId", target.value)}
              // className={inputClass("statusId", errors)}
              className={clsx(FORM_FILTER_STYLE.base, {
                [FORM_FILTER_STYLE.state.error]: errors.statusId,
                [FORM_FILTER_STYLE.state.normal]: !errors.statusId
              })}
            >
              <option value="">Todos</option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
              <option value="3">Archivado</option>
            </select>
          </div>

          <div>
            <label className={FORM_FILTER_STYLE.label}>Estado de verificación</label>
            <select
              value={filters.verificationStatusId ?? ""}
              onChange={({ target }) =>
                onFieldChange("verificationStatusId", target.value)
              }
              className={clsx(FORM_FILTER_STYLE.base, {
                [FORM_FILTER_STYLE.state.error]: errors.verificationStatusId,
                [FORM_FILTER_STYLE.state.normal]: !errors.verificationStatusId
              })}
            >
              <option value="">Todos</option>
              <option value="1">Editable</option>
              <option value="2">Pendiente revisión</option>
              <option value="3">Aprobado</option>
              <option value="4">Rechazado</option>
            </select>
          </div>

        </div>

        <div className=" h-full flex items-end justify-end ">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs h-9 font-bold border rounded-md bg-white hover:bg-gray-50 flex items-center gap-2"
          >
            <GrClose size={14} />
            Limpiar filtros {activeFilterCount}
          </button>
        </div>

      </div>

    </div>

  )
}


const inputClass = (field: keyof ProductTableFilter, errors: FilterErrors) =>
  `border w-full rounded-md px-3 py-2 text-sm h-9
   ${errors[field]
    ? " focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none border-red-500"
    : "border-gray-300 focus:ring-blue-100"}`;


type FilterErrors = Partial<Record<keyof ProductTableFilter, string>>;

const defaultValues: ProductTableFilter = {
  search: undefined,          // name, sku
  categoryId: undefined,

  priceMin: undefined,
  priceMax: undefined,

  discountMin: undefined,
  discountMax: undefined,

  statusId: undefined,
  supplierId: undefined,

  registeredFrom: undefined,
  registeredTo: undefined
}






