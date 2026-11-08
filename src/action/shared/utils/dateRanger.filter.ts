import { Prisma } from "@/src/generated/prisma/client";
import { DateTime } from "luxon";

const PERU_TIMEZONE = "America/Lima";

const parsePeruCalendarDate = (value: string) => {
    const date = DateTime.fromISO(value, { zone: PERU_TIMEZONE });

    if (!date.isValid || date.toISODate() !== value) {
        throw new RangeError("La fecha del filtro no es válida.");
    }

    return date;
};

export const createDateRangePrisma = (
    from?: string,
    to?: string
): Prisma.DateTimeFilter | undefined => {
    if (!from && !to) return undefined;
    
    const filter: Prisma.DateTimeFilter = {};
    
    if (from) {
        // Inicio del día en Perú, convertido a UTC para consultar el timestamp.
        filter.gte = parsePeruCalendarDate(from).startOf("day").toUTC().toJSDate();
    }
    
    if (to) {
        // Límite exclusivo: inicio del día siguiente en hora de Perú.
        filter.lt = parsePeruCalendarDate(to).plus({ days: 1 }).startOf("day").toUTC().toJSDate();
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
        range.from = parsePeruCalendarDate(from).startOf("day").toUTC().toJSDate();
    }

    if (to) {
        range.to = parsePeruCalendarDate(to).plus({ days: 1 }).startOf("day").toUTC().toJSDate();
    }

    return range;
};
