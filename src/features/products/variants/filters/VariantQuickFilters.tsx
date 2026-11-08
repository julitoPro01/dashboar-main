"use client"
import { useRouter } from "next/navigation";
import { VariantFilterCounts, VariantFilters } from "../../types";
import { serializeFiltersParams } from "./queryFilters";
import { Button } from "@/src/shared/components/btn";
import { RECORD_STATUS_VALUE } from "@/src/shared/domains/recordStatus";
import { createPaginationParams, SORT_BY_PARAMS } from "@/src/shared/table/pagination";

export type VariantQuickFilter = VariantFilters["status"];

type FilterObject = {
    label: string;
    value: VariantQuickFilter;
    count: number;
}

interface VariantQuickFiltersProps {
    counts: VariantFilterCounts;
    status: VariantQuickFilter
}

export const VariantQuickFilters = ({
    counts,
    status,
}: VariantQuickFiltersProps) => {

    const router = useRouter();

    const total = counts.draft + counts.active + counts.inactive;

    const filters: FilterObject[] = [
        { label: "Total", value: "ALL", count: total },
        { label: "Publicadas", value: "ACTIVE", count: counts.active },
        { label: "Ocultas", value: "INACTIVE", count: counts.inactive },
        { label: "Borradores", value: "DRAFT", count: counts.draft },
    ];

    const warningFilters: FilterObject[] = [
        { label: "Stock crítico", value: "LOW_STOCK", count: counts.lowStock },
    ]

    const secondaryFilters: FilterObject[] = [
        { label: "Archivadas", value: "ARCHIVED", count: counts.archived },
        { label: "Eliminadas", value: "DELETED", count: counts.deleted },
    ];

    const handleSetFilter = (status: VariantQuickFilter) => {

        const searchParams = window.location.search;
        const isActive = status === RECORD_STATUS_VALUE.ACTIVE

        const params = createPaginationParams(searchParams, {
            order: isActive ? "asc" : "desc",
            sortBy: isActive ? SORT_BY_PARAMS.displayorder : undefined,
            page: 1
        })

        const serialized = serializeFiltersParams(status);
        params.set("status", serialized)


        router.replace(`?${params.toString()}`)

    }

    const selected = "" as any;

    const renderFilter = ({
        label,
        value,
        count,
    }: (typeof filters)[number]) => {
        const isSelected = selected === value;

        return (
            <Button variant="tab" key={value} select="tabLight"
                padding="px-2 py-1"
                onClick={() => handleSetFilter(value)}
                active={value === status}
            >
                <span>{label}</span>

                <span
                    className={`
                        text-xs tabular-nums
                        ${isSelected
                            ? "font-semibold text-primary"
                            : "text-text-muted"
                        }
                    `}
                >
                    {count}
                </span>
            </Button>
        )

    };

    return (
        <div className="mb-space-md flex flex-wrap items-center gap-x-2 gap-y-2 p-2 bg-surface rounded-t-xl border border-b-0 border-border-input">
            {/* Filtros principales */}
            <div className="flex flex-wrap items-center gap-1">
                {filters.map(renderFilter)}
            </div>
            <div
                aria-hidden="true"
                className="mx-1 hidden h-6 border-l border-border sm:block"
            />
            <div className="flex flex-wrap items-center gap-1">
                {warningFilters.map(renderFilter)}
            </div>
            {/* Separador de vistas secundarias */}
            <div
                aria-hidden="true"
                className="mx-1 hidden h-6 border-l border-border sm:block"
            />

            {/* Archivados y eliminados */}
            <div className="flex flex-wrap items-center gap-1">
                {secondaryFilters.map(renderFilter)}
            </div>

            {/* TODO: Implementar despues */}
            {/* <div className=" md:hidden">
                <Button variant="basic" padding="p-none" className=" hidden ">
                    <MdMoreVert size={20} />
                </Button>
            </div> */}
        </div>
    );
};
