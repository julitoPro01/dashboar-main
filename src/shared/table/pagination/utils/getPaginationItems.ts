export type PaginationItem = number | string;

export const getPaginationItems = (
    page: number,
    total: number
): PaginationItem[] => {

    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Inicio
    if (page <= 3) {
        return [1, 2, 3, 4, "ellipsis1", total];
    }

    // Final
    if (page >= total - 2) {
        return [
            1,
            "ellipsis1",
            total - 3,
            total - 2,
            total - 1,
            total,
        ];
    }

    // Centro
    return [
        1,
        "ellipsis1",
        page - 1,
        page,
        page + 1,
        "ellipsis2",
        total,
    ];
};