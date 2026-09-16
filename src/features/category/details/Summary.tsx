import {  RecordStatusBadge, RecordStatusDb, serializeRecordStatusLabel } from "@/src/shared/domains/recordStatus";
import { IMAGE_STYLE } from "@/src/shared/theme/image";
import { dateFormatter } from "@/src/shared/utils";
import Image from "next/image";

interface Props {
    name: string;
    imageUrl: string | null;
    recordStatus: RecordStatusDb;
    level: number;
    slug: string;
    description: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
}
export const Summary = ({
    name, imageUrl, recordStatus, slug, level,
    description, createdAt, updatedAt
}: Props) => {


    return (
        <section className="col-span-12 lg:col-span-8">
            <div className="bg-surface border border-border rounded-xl shadow-card overflow-hidden">
                <div className="flex flex-col items-start sm:items-center sm:flex-row gap-6 p-6">

                    <div className={IMAGE_STYLE.thumb+" rounded-md "}>
                        
                        <Image src={imageUrl ?? "/assets/notfound.jpg"} className={IMAGE_STYLE.image}
                            sizes={IMAGE_STYLE.size_thumb} alt={name} fill
                            loading="eager" />
                    </div>

                    <div className="w-full">

                        <div className="flex items-center justify-between mb-4">
                            <RecordStatusBadge status={recordStatus} />
                            <span className="text-text text-xs">Nivel: <span className="font-semibold">{level}</span> </span>
                        </div>

                        <h2 className="text-xl font-semibold text-text-strong mb-1">
                            {name}
                        </h2>

                        <p className="text-primary text-sm mb-4">
                            {slug}
                        </p>
                        {description &&
                            <p className="text-text leading-relaxed">
                                {description}
                            </p>
                        }

                        <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-border">

                            <div>
                                <p className="text-xs text-text-muted uppercase">
                                    Creado
                                </p>
                                <p className="text-text">
                                    {dateFormatter.format(createdAt)}
                                </p>
                            </div>

                            {
                                updatedAt &&
                                <div>
                                    <p className="text-xs text-text-muted uppercase">
                                        Actualizado
                                    </p>
                                    <p className="text-text">
                                        {dateFormatter.format(updatedAt)}
                                    </p>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
