import { useApi, useMutation } from './useApi';
import { getGalleryPhotos, submitGalleryPhoto } from '@/services/galleryService';
import type { GalleryPhoto, GalleryFilters, GallerySubmission, PaginationMeta } from '@/lib/api/types';

export function useGallery(filters?: GalleryFilters) {
  const result = useApi<{ data: GalleryPhoto[]; meta: PaginationMeta }>(
    (signal) => getGalleryPhotos(filters, signal),
    [JSON.stringify(filters)]
  );
  return {
    photos: result.data?.data ?? [],
    meta: result.data?.meta ?? null,
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}

export function useGallerySubmission() {
  return useMutation<GalleryPhoto, GallerySubmission>(submitGalleryPhoto);
}
