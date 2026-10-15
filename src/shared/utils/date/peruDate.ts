
import { DateTime } from "luxon";

const PERU_TIMEZONE = "America/Lima";


export function parsePeruDateTime(value?: string | null): Date | null {
  if (!value) return null;

  const date = DateTime.fromISO(value, {
    zone: PERU_TIMEZONE,
    setZone: true,
  });

  if (!date.isValid) {
    throw new Error("La fecha y hora ingresadas no son válidas.");
  }

  return date.toUTC().toJSDate();
}


