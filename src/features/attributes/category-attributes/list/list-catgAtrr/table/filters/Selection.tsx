import { FloatingPanelOld } from "@/src/shared/components/floating"
import { SelectableItem } from "@/src/shared/components/items";
import { APP_ROUTES } from "@/src/shared/routes";
import { AppliedFilterLabel, OpenFilterButton, SELECTION_FILTERS, SelectionFilter } from "@/src/shared/table/filters";
import { updatePaginationParams } from "@/src/shared/table/pagination";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { MouseEvent } from "react";
import { IoMdCheckboxOutline } from "react-icons/io"

export const Selection = () => {

    const setPanel = useStore(v => v.setFloatingPanel);
    const openPanel = useStore(v => v.floatingPanel.open);

    const selection = useStore(v => v.categoryAttrFilters.selection)?.type ?? "all";
    const setSelection = useStore(v => v.setCategoryAttrFilters);

    const handleApply = (value: SelectionFilter) => {
        const selectedIds = useStore.getState().categoryAttrSelectedIds;
        const ids = (value === "selected-only" || value === "unselected" || value === "selected-first") ? { ids: selectedIds } : undefined;
        const currentPage = new URLSearchParams(window.location.search).get("page");
        const page = currentPage !== "1" ? { page: 1 } : {};

        setSelection({ fil: { selection: { type: value, ...ids } } });

        if (currentPage !== "1") {
            updatePaginationParams({
                basePath: APP_ROUTES.ATTRIBUTES.CATEGORY,
                searchParams: window.location.search,
                query: page,
                reagent: false
            });
        }
    };

    const handleFilterOpen = (e: MouseEvent, open: boolean) => {
        const x = e.clientX;
        const y = e.clientY;
        setPanel({ open, cx: x, cy: y, type: FLOATING_PANEL_TYPE.CATG_ATTR_SELECTED_ROWS })
    }

    const label = SELECTION_FILTERS.find(v => v.value === selection)?.label ?? ""

    return (
        <>
            <div className="flex gap-2 items-center">
                <IoMdCheckboxOutline size={20} className="" />
                <OpenFilterButton
                    active={openPanel}
                    onClick={(e) => handleFilterOpen(e, true)}
                />
            </div>

            {(!openPanel && selection !== "all") && <AppliedFilterLabel label={label} onClick={() => handleApply("all")} />}

            <FloatingPanelOld panelType={FLOATING_PANEL_TYPE.CATG_ATTR_SELECTED_ROWS}
                y={20}>
                <div className="w-64 p-2 text-sm text-text">
                    {SELECTION_FILTERS.map(({ value, label }) => (
                        <SelectableItem key={value} label={label} onClick={() => handleApply(value)}
                            isSelected={value === selection} activeBullet />
                    ))}
                </div>
            </FloatingPanelOld>
        </>
    )
}
