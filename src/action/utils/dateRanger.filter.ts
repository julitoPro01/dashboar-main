import { Prisma } from "@/src/generated/prisma/client";

export const createDateRangePrisma = (
    from?: string,
    to?: string
): Prisma.DateTimeFilter | undefined => {
    if (!from && !to) return undefined;
    
    const filter: Prisma.DateTimeFilter = {};
    
    if (from) {
        // Inicio del día "desde"
        const fromDate = new Date(from);
        fromDate.setUTCHours(0, 0, 0, 0);
        filter.gte = fromDate;
    }
    
    if (to) {
        // Inicio del día siguiente al "hasta"
        const toDate = new Date(to);
        toDate.setUTCDate(toDate.getUTCDate() + 1);
        toDate.setUTCHours(0, 0, 0, 0);
        filter.lt = toDate;
    }
    
    return filter;
};



export const createDateRangeSql = (
    from?: string,
    to?: string
) => {
    const range: {
        from?: Date;
        to?: Date;
    } = {};

    if (from) {
        const fromDate = new Date(`${from}T00:00:00.000Z`);
        range.from = fromDate;
    }

    if (to) {
        const toDate = new Date(`${to}T00:00:00.000Z`);
        toDate.setUTCDate(toDate.getUTCDate() + 1);
        range.to = toDate;
    }

    return range;
};