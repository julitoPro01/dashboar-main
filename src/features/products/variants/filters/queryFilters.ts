import { VariantFilters } from "../../types";

// Para enviar a la url
export const serializeFiltersParams = (status: VariantFilters["status"]) => {
    // Si no viene un estado, o si es "ALL", devolvemos "all" para limpiar la búsqueda
    if (!status || status === "ALL") return "all";

    // Convierte automáticamente "DRAFT" en "draft", "ACTIVE" en "active", etc.
    return status.toLowerCase();
}

const VALID_VARIANT_STATUSES = [
  'DRAFT', 'ACTIVE', 'INACTIVE', 'LOW_STOCK', 'ARCHIVED', 'DELETED',
] as const satisfies readonly VariantFilters['status'][];

const isValidVariantStatus = (value: string): value is VariantFilters['status'] =>
  (VALID_VARIANT_STATUSES as readonly string[]).includes(value);

export const normalizeFiltersParams = (
  statusFromUrl?: string | null,
): VariantFilters['status'] => {
  if (!statusFromUrl || statusFromUrl.toLowerCase() === 'all') return 'ALL';

  const normalized = statusFromUrl.trim().toUpperCase();
  return isValidVariantStatus(normalized) ? normalized : 'ALL';
};