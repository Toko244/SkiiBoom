import apiClient from '@/lib/api/client';
import type { ApiResponse, GalleryPhoto, GalleryFilters, GallerySubmission, PaginationMeta } from '@/lib/api/types';

export async function getGalleryPhotos(
  filters?: GalleryFilters,
  signal?: AbortSignal
): Promise<{ data: GalleryPhoto[]; meta: PaginationMeta }> {
  const params: Record<string, string | number> = {};
  if (filters?.category && filters.category !== 'all') params.category = filters.category;
  if (filters?.season && filters.season !== 'all') params.season = filters.season;
  if (filters?.sort) params.sort = filters.sort;
  if (filters?.per_page) params.per_page = filters.per_page;
  if (filters?.page) params.page = filters.page;

  const response = await apiClient.get<ApiResponse<GalleryPhoto[]> & { meta: PaginationMeta }>('/gallery', { params, signal });
  return { data: response.data.data, meta: response.data.meta! };
}

export async function getGalleryPhoto(id: number, signal?: AbortSignal): Promise<GalleryPhoto> {
  const response = await apiClient.get<ApiResponse<GalleryPhoto>>(`/gallery/${id}`, { signal });
  return response.data.data;
}

export async function submitGalleryPhoto(data: GallerySubmission): Promise<GalleryPhoto> {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('image', data.image);
  formData.append('category', data.category);
  if (data.description) formData.append('description', data.description);
  if (data.season) formData.append('season', data.season);
  if (data.author_name) formData.append('author_name', data.author_name);

  const response = await apiClient.post<ApiResponse<GalleryPhoto>>('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
}

export async function likePhoto(photoId: number): Promise<void> {
  await apiClient.post(`/gallery/${photoId}/like`);
}

export async function unlikePhoto(photoId: number): Promise<void> {
  await apiClient.delete(`/gallery/${photoId}/like`);
}
