import { useRef, useState } from "react"
import { SUPPLIER_CAPABILITIES_LABELS } from "../../../shared/capability.constans";
import { AppliedFilterLabel, OpenFilterButton, CellTitle } from "@/src/shared/table";
import { FloatingWrapper } from "@/src/shared/components/floating";


type CapabilityType = keyof typeof SUPPLIER_CAPABILITIES_LABELS;
type Filter = { active: boolean, caps: CapabilityType[] }

export const Capabilities = () => {

    const [filter, setFilter] = useState<Filter>({ active: false, caps: [] });
    const prevFilter_Ref = useRef<string>("");

    const handleChange = (type: CapabilityType) => {
        setFilter(v => ({ ...v, caps: v.caps.some(vv => vv === type) ? v.caps.filter(vv => vv !== type) : [...v.caps, type] }))
    }

    const handleApply = () => {
        if (filter.caps.length > 0) {
            //TODO: api - []
        }

        setFilter(v => ({ ...v, active: false }))
    }

    const handleClean = () => {

        setFilter(v => ({ ...v, caps: [] }));
        prevFilter_Ref.current = "[]";
        // TODO:... API - []
    }

    const openFilter = (active: boolean) => {
        if (active) {
            setFilter(V => ({ ...V, active: true }));
            prevFilter_Ref.current = JSON.stringify(filter.caps);
        } else {
            const caps = JSON.parse(prevFilter_Ref.current)
            setFilter(v => ({ caps, active: false }))
            prevFilter_Ref.current = "";
        }
    }


    return (
        <>

            {/* TITULO */}
            <CellTitle title="Capacidades">
                <OpenFilterButton
                    active={filter.active}
                    onClick={() => openFilter(true)}
                />
            </CellTitle>
            {!filter.active && filter.caps.length > 0 && <AppliedFilterLabel label={filter.caps.map(v => SUPPLIER_CAPABILITIES_LABELS[v]).join(", ")} onClick={handleClean} />}

            <FloatingWrapper open={filter.active} onClose={() => openFilter(false)} >
                <div className="w-64">
                    {/* Actions */}
                    <div className="flex px-4 py-3 bg-surface-elevated font-semibold">
                        <button className="text-xs text-text-muted hover:text-text" onClick={handleClean}>
                            Limpiar
                        </button>
                        <div className="flex-1"></div>
                        <button className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold" onClick={handleApply}>
                            Aplicar filtros
                        </button>
                    </div>

                    {/* Options */}
                    <div className="max-h-60 overflow-y-auto p-2">
                        {Object.entries(SUPPLIER_CAPABILITIES_LABELS).map(([value, label]) => (
                            <label
                                key={value}
                                className="group flex items-center rounded-lg px-3 py-2 transition-colors hover:bg-hover"
                            >
                                <div className="relative flex h-5 w-5 items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className=" h-4 w-4 cursor-pointer"
                                        checked={filter.caps.some(v => v === value)}
                                        onChange={() => handleChange(value as CapabilityType)}
                                    />
                                </div>
                                <span className="ml-3  text-text-muted group-hover:text-text">
                                    {label}
                                </span>
                                <div className="ml-auto h-2 w-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100"></div>
                            </label>
                        ))}
                    </div>
                </div>
            </FloatingWrapper>

        </>
    )
}
