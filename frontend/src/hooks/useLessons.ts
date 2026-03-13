import { useApi } from './useApi';
import { getSkillLevels, getLessons, getLessonPackages, getInstructors } from '@/services/lessonService';
import type { SkillLevel, Lesson, LessonPackage, Instructor } from '@/lib/api/types';

export function useSkillLevels() {
  return useApi<SkillLevel[]>(
    (signal) => getSkillLevels(signal),
    []
  );
}

export function useLessons(filters?: { skill_level?: string; instructor_id?: number }) {
  return useApi<Lesson[]>(
    (signal) => getLessons(filters, signal),
    [JSON.stringify(filters)]
  );
}

export function useLessonPackages() {
  return useApi<LessonPackage[]>(
    (signal) => getLessonPackages(signal),
    []
  );
}

export function useInstructors() {
  return useApi<Instructor[]>(
    (signal) => getInstructors(signal),
    []
  );
}
