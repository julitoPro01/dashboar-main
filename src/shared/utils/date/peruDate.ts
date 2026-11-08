
import { DateTime } from "luxon";

const PERU_TIMEZONE = "America/Lima";

//Convierte la fecha del input para guardar a la DB
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


export type DateInputMode = "date" | "dateTime";

/** 
 * Convierte un objeto Date nativo a un formato de texto compatible 
 * con inputs de HTML (<input type="date"> o <input type="datetime-local">)
 * forzando siempre la zona horaria de Perú.
 */
export const toPeruDateTimeInput = (
  date: Date | null | undefined, 
  mode: DateInputMode = "dateTime"
): string | null => {
  if (!date) return null;

  const luxonDate = DateTime.fromJSDate(date).setZone("America/Lima");

  // Si por alguna razón el objeto Date no es válido, evitamos que la app falle
  if (!luxonDate.isValid) return null;

  const formats: Record<DateInputMode, string> = {
    // Formato exacto requerido por <input type="date" /> -> YYYY-MM-DD
    date: "yyyy-MM-dd",
    
    // Formato exacto requerido por <input type="datetime-local" /> -> YYYY-MM-DDTHH:mm
    dateTime: "yyyy-MM-dd'T'HH:mm",
  };

  return luxonDate.toFormat(formats[mode]);
};
