
import Image from "next/image";
import { IMAGE_STYLE } from "@/src/shared/theme/image/imageStyle";
import { dateFormatter } from "@/src/shared/utils";
import { RecordStatusBadge, RecordStatusDb } from "@/src/shared/domains/status";
import { Badge } from "@/src/shared/components/badge";
import { SUPPLIER_CAPABILITIES_LABELS, SUPPLIER_RELATION_MODE_LABEL } from "../../constants";
import { SupplierCapabilityDb, SupplierRelationModeDb } from "../../types";


export const BodyCells = {
    Index: (i: string) => <span className=""> {i}</span>,

    Logo: (val: string, name: string, i: number) =>
        <div className={`${IMAGE_STYLE.list} rounded-lg`}>
            <Image src={val ? val : "/assets/notfound.jpg"}
                alt={name.split(' ')[0]} fill className={`${IMAGE_STYLE.image}`}
                priority={i < 15} sizes={IMAGE_STYLE.size_list}
            />
        </div>,

    Name: (val: string) => <p className=" font-semibold  line-clamp-3 wrap-break-word">{val}</p>,

    Capabilities: (val: SupplierCapabilityDb[], relationMode: SupplierRelationModeDb) => {

        return (
            <div className="flex flex-col min-w-0 gap-1 relative truncate">
                <span className="inline-flex items-center py-1 text-xs font-medium text-foreground">
                    {SUPPLIER_RELATION_MODE_LABEL[relationMode]}
                </span>
                <div className="space-x-2">
                    {[...val.sort()].map(v => (
                        <Badge key={v} variant="surface">
                            {SUPPLIER_CAPABILITIES_LABELS[v]}
                        </Badge>
                    ))}
                </div>
            </div>
        )
    },

    RecordStatus: (val: RecordStatusDb) => <RecordStatusBadge status={val} />,

    CreatedAt: (val: Date | null) => <p className=" text-end">{val && dateFormatter.format(val)}</p>
}

