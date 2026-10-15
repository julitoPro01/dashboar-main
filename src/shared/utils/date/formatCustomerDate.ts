// PARA PRESENTAR LA FECHA y hora AL USUARIO

export function formatCustomerDate(date?: Date | string | null) {
  if (!date) return null;

  const value = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(value.getTime())) return null;

  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Lima",
  }).format(value);
}