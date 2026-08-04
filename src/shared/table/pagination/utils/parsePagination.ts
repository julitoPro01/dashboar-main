import { MAX_PAGE_SIZE_100 } from "../constants";

export const getAvailablePages = (page: number, totalPages: number, range = 5) => {
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};


export const parsePage = (pageSize: number, totalItems: number, page: number) => {
    if ((page - 1) * pageSize >= totalItems)
        return Math.max(1, Math.ceil(totalItems / pageSize));
    return page
}

interface ParseProps {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number
}

export const parsePagination = ({ currentPage, pageSize, totalItems, totalPages }: ParseProps) => {

    const page = parsePage(pageSize, totalItems, currentPage);
    const showing = (page * pageSize <= totalItems ? pageSize : pageSize - ((page * pageSize) - totalItems))
    const availablePage = getAvailablePages(page, totalPages, 10);
    const availablePageSize = [ 5, 10, 20, 30, 40, 50, MAX_PAGE_SIZE_100];

    if (!availablePageSize.includes(pageSize) && pageSize > 0 && pageSize < MAX_PAGE_SIZE_100 + 1)
        availablePageSize.push(pageSize);

    return {
        page,
        showing,
        availablePage,
        isNotValidPage: currentPage > totalPages,
        availablePageSize: availablePageSize.sort((a, b) => a - b)
    }

}