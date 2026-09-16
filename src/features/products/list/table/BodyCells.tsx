import { RecordStatusBadge, RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { VerificationStatusBadge, VerificationStatusDb } from "@/src/shared/domains/verificationStatus";
import { DateColumn } from "@/src/shared/table/core";
import { IMAGE_STYLE } from "@/src/shared/theme/image";
import Image from "next/image";

interface PriceCellProps {
    minPrice: string;
    maxPrice: string;
    hasDiscount: boolean;
    maxDiscountPercent: string;
    isUniformDiscount: boolean;
    hasNotVariant: boolean;
}

interface StockCellProps {
    totalStock: number;
    lowStockVariantsCount: number;
    hasLowStock: boolean;
    hasNotVariant: boolean;
}

interface StatusCellProps {
    productStatus: RecordStatusDb;
    verificationStatus: VerificationStatusDb;
}

export const BodyCells = {
    Index: (index: string) => <span>{index}</span>,

    Image: (img: { name: string, path: string } | undefined, priority: boolean) =>
        <div className={`${IMAGE_STYLE.list} rounded-lg`}>
            <Image
                src={img?.path ? img.path : "/assets/notfound.jpg"}
                alt={img?.name ?? ""}
                fill
                priority={priority} sizes={IMAGE_STYLE.size_list}
                className={`${IMAGE_STYLE.image}`}
            />
        </div>,

    Name: (val: string) => <p className="font-semibold line-clamp-3 wrap-break-word">{val}</p>,

    Sku: (val: string) => <span >{val}</span>,

    Category: (val: { id: number, name: string }) => <p className=" line-clamp-3 wrap-break-word" > {val.name} </p>,

    VariantsCount: (val: number) => <span >{val}</span>,

    Price: ({
        minPrice,
        maxPrice,
        maxDiscountPercent,
        hasDiscount,
        isUniformDiscount,
        hasNotVariant
    }: PriceCellProps) => {

        const price =
            minPrice === maxPrice
                ? `S/ ${minPrice}`
                : `S/ ${minPrice} – S/ ${maxPrice}`;

        return (
            <div className="flex flex-col gap-1">
                <span className={`${hasNotVariant && "italic line-through"}`}>
                    {price}
                </span>

                {hasDiscount && (
                    <span className="w-fit rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {isUniformDiscount
                            ? `${maxDiscountPercent}% dto.`
                            : `Hasta ${maxDiscountPercent}% dto.`}
                    </span>
                )}
            </div>
        );
    },

    Stock: ({
        totalStock,
        lowStockVariantsCount,
        hasLowStock,
        hasNotVariant
    }: StockCellProps) => {
        return (
            <div className="flex flex-col gap-1">
                <span className={`${hasNotVariant && "italic line-through"}`}>
                    {totalStock} unidades
                </span>

                {hasLowStock && (
                    <span className="w-fit rounded-full py-0.5 text-xs font-medium text-amber-700  dark:text-amber-400">
                        {lowStockVariantsCount === 1
                            ? "1 variante con stock bajo"
                            : `${lowStockVariantsCount} variantes con stock bajo`}
                    </span>
                )}
            </div>
        )
    },

    Status: ({
        productStatus,
        verificationStatus,
    }: StatusCellProps) => {
        return (
            <div className="flex flex-col items-start gap-1">
                <RecordStatusBadge status={productStatus} />
                <div className="inline-flex items-center gap-1">
                    <span className="mt-1 text-xs text-text-muted">
                        Verificación:
                    </span>
                    <VerificationStatusBadge status={verificationStatus} />
                </div>
            </div>
        )
    },

    Date: (createdAt: Date, updatedAt: Date | null) => <DateColumn createdAt={createdAt} updatedAt={updatedAt} />
}