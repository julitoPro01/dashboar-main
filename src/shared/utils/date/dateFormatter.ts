
//Para mostrar una fecha al usuario,
// día - mes - año

export const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
