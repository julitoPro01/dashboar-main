
import Image from "next/image";
import { SUPPLIER_CAPABILITIES_LABELS } from "../../../shared/capability.constans";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IMAGE_STYLE } from "@/src/shared/theme/image/imageStyle";
import { SupplierCapabilityDb } from "../../../types";
import { dateFormatter } from "@/src/shared/utils";
import { RecordStatusBadge, RecordStatusDb } from "@/src/shared/domains/status";
import { Badge } from "@/src/shared/components/badge";


export const BodyCells = {
    Index: (i: number) => <span className=""> {i < 10 ? 0 + "" + i : i}</span>,

    Logo: (val: string, name: string, i: number) =>
        <div className={`${IMAGE_STYLE.list} rounded-lg`}>
            <Image src={val ? val : "/assets/notfound.jpg"}
                alt={name.split(' ')[0]} fill className={`${IMAGE_STYLE.image}`}
                priority={i < 15} sizes={IMAGE_STYLE.size_list}
            />
        </div>,

    Name: (val: string) => <p className=" font-semibold  line-clamp-3 wrap-break-word">{val}</p>,

    Capabilities: (val: SupplierCapabilityDb[]) => {

        return (
            <div className="flex min-w-0 gap-1 relative truncate">
                {[...val.sort()].map(v => (
                    <Badge key={v} variant="darkInfo">
                        {SUPPLIER_CAPABILITIES_LABELS[v]}
                    </Badge>
                ))}
            </div>
        )
    },

    RecordStatus: (val: RecordStatusDb) => <RecordStatusBadge status={val} />,

    CreatedAt: (val: Date | null) => <p className=" text-end">{val && dateFormatter.format(val)}</p>
}

