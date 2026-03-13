import apiClient from '@/lib/api/client';
import type { ApiResponse, Equipment, EquipmentCategory, EquipmentFilters, PaginationMeta } from '@/lib/api/types';

export async function getEquipment(
  filters?: EquipmentFilters,
  signal?: AbortSignal
): Promise<{ data: Equipment[]; meta: PaginationMeta }> {
  const params: Record<string, string | number> = {};
  if (filters?.search) params.search = filters.search;
  if (filters?.category) {
    params.category = Array.isArray(filters.category) ? filters.category.join(',') : filters.category;
  }
  if (filters?.price_min !== undefined) params.price_min = filters.price_min;
  if (filters?.price_max !== undefined) params.price_max = filters.price_max;
  if (filters?.size) {
    params.size = Array.isArray(filters.size) ? filters.size.join(',') : filters.size;
  }
  if (filters?.availability) params.availability = filters.availability;
  if (filters?.min_rating) params.min_rating = filters.min_rating;
  if (filters?.sort) params.sort = filters.sort;
  if (filters?.per_page) params.per_page = filters.per_page;
  if (filters?.page) params.page = filters.page;

  const response = await apiClient.get<ApiResponse<Equipment[]>>('/equipment', { params, signal });
  return { data: response.data.data, meta: response.data.meta! };
}

export async function getFeaturedEquipment(signal?: AbortSignal): Promise<Equipment[]> {
  const response = await apiClient.get<ApiResponse<Equipment[]>>('/equipment/featured', { signal });
  return response.data.data;
}

export async function getEquipmentCategories(signal?: AbortSignal): Promise<EquipmentCategory[]> {
  const response = await apiClient.get<ApiResponse<Record<string, number>>>('/equipment/categories', { signal });
  const data = response.data.data;
  // API returns { "skis": 3, "boots": 1, ... } - transform to EquipmentCategory[]
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return Object.entries(data).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      slug: name,
      count: count as number,
    }));
  }
  return data as unknown as EquipmentCategory[];
}

export async function getEquipmentBySlug(slug: string, signal?: AbortSignal): Promise<Equipment> {
  const response = await apiClient.get<ApiResponse<Equipment>>(`/equipment/${slug}`, { signal });
  return response.data.data;
}
