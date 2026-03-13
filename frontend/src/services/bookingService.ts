import apiClient from '@/lib/api/client';
import type { ApiResponse, Booking, BookingRequest } from '@/lib/api/types';

export async function createBooking(data: BookingRequest): Promise<Booking> {
  const response = await apiClient.post<ApiResponse<Booking>>('/bookings', data);
  return response.data.data;
}

export async function getBookingByRef(bookingRef: string, signal?: AbortSignal): Promise<Booking> {
  const response = await apiClient.get<ApiResponse<Booking>>(`/bookings/${bookingRef}`, { signal });
  return response.data.data;
}

export async function getMyBookings(signal?: AbortSignal): Promise<Booking[]> {
  const response = await apiClient.get<ApiResponse<Booking[]>>('/bookings/my', { signal });
  return response.data.data;
}

export async function cancelBooking(bookingId: number): Promise<Booking> {
  const response = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${bookingId}/cancel`);
  return response.data.data;
}
