export const buildMeta = ({
    totalItems, pageSize, totalPages, page
}: {
    totalItems: number; pageSize: number; totalPages: number; page: number;
}) => {
    return {
        totalItems,
        itemsPerPage: pageSize,
        totalPages: !!totalPages ? totalPages : 1,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
    }
}