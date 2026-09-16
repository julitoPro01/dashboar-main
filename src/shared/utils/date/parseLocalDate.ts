
// PARA EXTRAER SOLO EL AÑO, MES, DÍA
// OMITE EL HORARIO

export const parseLocalDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};