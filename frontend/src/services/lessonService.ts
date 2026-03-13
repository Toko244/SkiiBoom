import apiClient from '@/lib/api/client';
import type { ApiResponse, Lesson, LessonPackage, SkillLevel, Instructor } from '@/lib/api/types';

export async function getSkillLevels(signal?: AbortSignal): Promise<SkillLevel[]> {
  const response = await apiClient.get<ApiResponse<SkillLevel[]>>('/skill-levels', { signal });
  return response.data.data;
}

export async function getLessons(
  filters?: { skill_level?: string; instructor_id?: number },
  signal?: AbortSignal
): Promise<Lesson[]> {
  const response = await apiClient.get<ApiResponse<Lesson[]>>('/lessons', { params: filters, signal });
  return response.data.data;
}

export async function getLessonBySlug(slug: string, signal?: AbortSignal): Promise<Lesson> {
  const response = await apiClient.get<ApiResponse<Lesson>>(`/lessons/${slug}`, { signal });
  return response.data.data;
}

export async function getLessonPackages(signal?: AbortSignal): Promise<LessonPackage[]> {
  const response = await apiClient.get<ApiResponse<LessonPackage[]>>('/lesson-packages', { signal });
  return response.data.data;
}

export async function getAvailableLessonPackages(signal?: AbortSignal): Promise<LessonPackage[]> {
  const response = await apiClient.get<ApiResponse<LessonPackage[]>>('/lesson-packages/available', { signal });
  return response.data.data;
}

export async function getInstructors(signal?: AbortSignal): Promise<Instructor[]> {
  const response = await apiClient.get<ApiResponse<Instructor[]>>('/instructors', { signal });
  return response.data.data;
}

export async function getInstructorBySlug(slug: string, signal?: AbortSignal): Promise<Instructor> {
  const response = await apiClient.get<ApiResponse<Instructor>>(`/instructors/${slug}`, { signal });
  return response.data.data;
}
