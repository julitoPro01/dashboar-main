export type DateTimeFormatMode = "date" | "time" | "dateTime" | "dateTimeShort"; // 👈 Corregido typo: "dateTimeShort"

const BASE_OPTIONS: Intl.DateTimeFormatOptions = {
  timeZone: "America/Lima", // 👈 ¡CRUCIAL! Esto garantiza consistencia en todo el sistema
};

const FORMAT_OPTIONS: Record<DateTimeFormatMode, Intl.DateTimeFormatOptions> = {
  date: {
    ...BASE_OPTIONS,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
  time: {
    ...BASE_OPTIONS,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Opcional: añade am/pm si lo prefieres para clientes
  },
  dateTime: {
    ...BASE_OPTIONS,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
  dateTimeShort: {
    ...BASE_OPTIONS,
    dateStyle: "short",
    timeStyle: "short",
  }
};

const formatters: Record<DateTimeFormatMode, Intl.DateTimeFormat> = {
  date: new Intl.DateTimeFormat("es-PE", FORMAT_OPTIONS.date),
  time: new Intl.DateTimeFormat("es-PE", FORMAT_OPTIONS.time),
  dateTime: new Intl.DateTimeFormat("es-PE", FORMAT_OPTIONS.dateTime),
  dateTimeShort: new Intl.DateTimeFormat("es-PE", FORMAT_OPTIONS.dateTimeShort),
};

// PARA PRESENTAR AL USUARIO 
/** Formatea fechas y horas con configuración regional peruana de forma óptima. */
export const dateFormatter = {
  format(value: Date | number | string | null | undefined, mode: DateTimeFormatMode = "date") {
    
    if (!value) return undefined;

    // Protección por si llega un valor inválido o nulo de la base de datos
       // Convertimos a objeto Date si viene como string
    const dateParsed = value instanceof Date ? value : new Date(value);

    if (!value || (value instanceof Date && Number.isNaN(value.getTime()))) {
      return undefined;
    }
    return formatters[mode].format(dateParsed);
  },
};
