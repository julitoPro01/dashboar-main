import { IMAGE_STYLE } from "@/src/constants";
import { RECORD_STATUS_LABELS, RECORD_STATUS_STYLES } from "@/src/domains/record-status";
import { RECORD_STATUS_TYPE } from "@/src/interfaces/record-status";
import { SUPPLIER_CAPABILITY_TYPE } from "@/src/interfaces/supplier";
import { dateFormatter } from "@/src/utils";
import Image from "next/image";
import { SUPPLIER_CAPABILITIES_LABELS } from "../../../shared/capability.constans";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";


export const BodyCells = {
    Index: (i: number) => <p className={"text-sm"}> {i < 10 ? 0 + "" + i : i}</p>,

    Logo: (val: string, name: string, i: number) =>
        <div className={`${IMAGE_STYLE.list} rounded-lg`}>
            <Image src={val ? val : "/assets/notfound.jpg"}
                alt={name.split(' ')[0]} fill className={`${IMAGE_STYLE.image}`}
                priority={i < 15} sizes={IMAGE_STYLE.size_list}
            />
        </div>,

    Name: (val: string) => <p className=" font-semibold text-sm line-clamp-3 wrap-break-word">{val}</p>,

    Capabilities: (val: SUPPLIER_CAPABILITY_TYPE[]) => {

        return (
            <div className="flex min-w-0 gap-1 relative truncate">
                {[...val.sort()].map(v => (
                    <span key={v} className="text-xs font-semibold px-2.5 py-0.5 rounded-md text-slate-500 dark:text-blue-300 bg-slate-100 dark:bg-blue-900/30">
                        {SUPPLIER_CAPABILITIES_LABELS[v]}
                    </span>
                ))}
            </div>
        )
    },

    RecordStatus: (val: RECORD_STATUS_TYPE) => {
        const statusTextColor = ` ${RECORD_STATUS_STYLES[val].color500}`;
        const statusBgColor = ` ${RECORD_STATUS_STYLES[val].color50}`;
        const statusBordertColor = `${RECORD_STATUS_STYLES[val].color300}`;
        const statusPointColor = `${RECORD_STATUS_STYLES[val].color400}`;

        return (
            <span className={`text-xs inline-flex items-center gap-2 font-semibold ${statusTextColor} ${statusBordertColor} ${statusBgColor} border px-2.5 py-0.5 rounded-md`}>
                <span className={`w-1.25 h-1.25 rounded-full ${statusPointColor}`} />
                {RECORD_STATUS_LABELS[val]}
            </span>
        )
    },

    CreatedAt: (val: Date | null) => <p className="text-sm text-end">{val && dateFormatter.format(val)}</p>
}

// ------------------
const CapsTooltip = ({ anchorEl, caps }: { anchorEl: any, caps: SUPPLIER_CAPABILITY_TYPE[] }) => {
    const [position, setPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        if (!anchorEl) return;

        const rect = anchorEl.getBoundingClientRect();

        setPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
        });
    }, [anchorEl]);

    if (!anchorEl || !position) return null;

    return createPortal(
        <div
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
            }}
            className="z-50 text-sm p-2 rounded-md bg-surface-overlay shadow-dropdown flex flex-col"
        >
            {caps.map(v => (
                <span key={v}>{SUPPLIER_CAPABILITIES_LABELS[v]}</span>
            ))}
        </div>,
        document.body
    );
};


const More = (caps: SUPPLIER_CAPABILITY_TYPE[]) => {
    const [open, setOpen] = useState(false);

    const anchorEl = useRef(null)

    return (
        <>
            <div
                ref={anchorEl}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="cursor-default text-xs px-2.5 py-0.5 rounded-md bg-primary-light/20"
            >
                <span className="text-primary font-semibold">
                    +{caps.length === 4 ? 2 : 3}
                </span>
            </div>

            {open && <CapsTooltip anchorEl={anchorEl.current} caps={[...caps].sort()} />}
        </>
    );
};