import { useApi } from './useApi';
import { getEquipment, getFeaturedEquipment, getEquipmentCategories } from '@/services/equipmentService';
import type { Equipment, EquipmentCategory, EquipmentFilters, PaginationMeta } from '@/lib/api/types';

export function useEquipment(filters?: EquipmentFilters) {
  const result = useApi<{ data: Equipment[]; meta: PaginationMeta }>(
    (signal) => getEquipment(filters, signal),
    [JSON.stringify(filters)]
  );
  return {
    equipment: result.data?.data ?? [],
    meta: result.data?.meta ?? null,
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}

export function useFeaturedEquipment() {
  return useApi<Equipment[]>(
    (signal) => getFeaturedEquipment(signal),
    []
  );
}

export function useEquipmentCategories() {
  return useApi<EquipmentCategory[]>(
    (signal) => getEquipmentCategories(signal),
    []
  );
}
