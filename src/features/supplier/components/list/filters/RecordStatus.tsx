import { AppliedFilterLabel, BtnActiveItemFilter } from "@/src/components/table";
import { RECORD_STATUS_LABELS, RECORD_STATUS_OPTIONS, RECORD_STATUS_STYLES } from "@/src/domains/record-status";
import { RECORD_STATUS_TYPE } from "@/src/interfaces/record-status"
import { useState } from "react"
import { FaCheck } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

export const RecordStatus = () => {

    const [status, setStatus] = useState<{ value?: RECORD_STATUS_TYPE, active: boolean }>({ active: false });

    const handleApply = (value?: RECORD_STATUS_TYPE) => {
        setStatus(v => ({ ...v, value }));

        //TODO: api... 
    }

    return (
        <>
            {/* CAPA */}
            {status.active &&
                <div className=" fixed inset-0 z-10" onClick={() => setStatus(v => ({ ...v, active: false }))} />
            }
            <div className="flex items-center gap-1">
                <span className="font-bold text-xs uppercase">Estado</span>

                <BtnActiveItemFilter
                    active={status.active}
                    onClick={() => setStatus(v => ({ ...v, active: !v.active }))}
                    icon={<MdExpandMore size={16}/>}
                />
            </div>

            {!status.active && !!status.value && <AppliedFilterLabel label={RECORD_STATUS_LABELS[status.value]} onClick={() => handleApply()} />}

            {
                status.active &&

                <div className="absolute top-full left-0 z-50 mt-1 w-40 text-sm font-normal rounded-xl border border-border dark:border-border-strong bg-surface-overlay shadow-xl">
                    <div className="p-2" >

                        <div className="flex items-center rounded-lg gap-2 px-3 py-2 hover:bg-hover cursor-default"
                            onClick={() => handleApply()}>
                            <span className={`w-2 h-2 rounded-full border border-gray-400`} />
                            <span>Todos</span>
                            <span className="ml-auto text-blue-400">
                                {!status.value &&
                                    <FaCheck />
                                }
                            </span>
                        </div>
                        {
                            RECORD_STATUS_OPTIONS.map(V => (
                                <div key={V.value} className="flex items-center rounded-lg gap-2 px-3 py-2 hover:bg-hover cursor-default"
                                    onClick={() => handleApply(V.value)}>
                                    <span className={`w-2 h-2 rounded-full ${RECORD_STATUS_STYLES[V.value].color400}`} />
                                    <span>{V.label}</span>
                                    <span className="ml-auto text-blue-400">
                                        {V.value === status.value &&
                                            <FaCheck />
                                        }
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}


