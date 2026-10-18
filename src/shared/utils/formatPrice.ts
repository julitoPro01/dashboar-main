export const formatPrice = (value: unknown) => {
    const amount = Number(value);

    if (!Number.isFinite(amount)) return "—";

    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};