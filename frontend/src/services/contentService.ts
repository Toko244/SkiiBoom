import apiClient from '@/lib/api/client';
import type { ApiResponse, Testimonial, FAQ, TeamMember, Certification, Partner, Facility, TimelineEvent } from '@/lib/api/types';

export async function getTestimonials(signal?: AbortSignal): Promise<Testimonial[]> {
  const response = await apiClient.get<ApiResponse<Testimonial[]>>('/testimonials', { signal });
  return response.data.data;
}

export async function getFaqs(signal?: AbortSignal): Promise<FAQ[]> {
  const response = await apiClient.get<ApiResponse<FAQ[]>>('/faqs', { signal });
  return response.data.data;
}

export async function getTeamMembers(signal?: AbortSignal): Promise<TeamMember[]> {
  const response = await apiClient.get<ApiResponse<TeamMember[]>>('/about/team', { signal });
  return response.data.data;
}

export async function getCertifications(signal?: AbortSignal): Promise<Certification[]> {
  const response = await apiClient.get<ApiResponse<Certification[]>>('/about/certifications', { signal });
  return response.data.data;
}

export async function getPartners(signal?: AbortSignal): Promise<Partner[]> {
  const response = await apiClient.get<ApiResponse<Partner[]>>('/about/partners', { signal });
  return response.data.data;
}

export async function getFacilities(signal?: AbortSignal): Promise<Facility[]> {
  const response = await apiClient.get<ApiResponse<Facility[]>>('/about/facilities', { signal });
  return response.data.data;
}

export async function getTimeline(signal?: AbortSignal): Promise<TimelineEvent[]> {
  const response = await apiClient.get<ApiResponse<TimelineEvent[]>>('/about/timeline', { signal });
  return response.data.data;
}

export async function getPageContent(page: string, signal?: AbortSignal): Promise<Record<string, unknown>> {
  const response = await apiClient.get<ApiResponse<Record<string, unknown>>>(`/content/${page}`, { signal });
  return response.data.data;
}

export async function getSettings(group?: string, signal?: AbortSignal): Promise<Record<string, unknown>> {
  const url = group ? `/settings/${group}` : '/settings';
  const response = await apiClient.get<ApiResponse<Record<string, unknown>>>(url, { signal });
  return response.data.data;
}
