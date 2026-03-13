import { useApi } from './useApi';
import { getTestimonials, getFaqs, getTeamMembers, getCertifications, getPartners, getFacilities, getTimeline, getPageContent } from '@/services/contentService';
import type { Testimonial, FAQ, TeamMember, Certification, Partner, Facility, TimelineEvent } from '@/lib/api/types';

export function usePageContent(page: string) {
  return useApi<Record<string, unknown>>(
    (signal) => getPageContent(page, signal),
    [page]
  );
}

export function useTestimonials() {
  return useApi<Testimonial[]>(
    (signal) => getTestimonials(signal),
    []
  );
}

export function useFaqs() {
  return useApi<FAQ[]>(
    (signal) => getFaqs(signal),
    []
  );
}

export function useTeamMembers() {
  return useApi<TeamMember[]>(
    (signal) => getTeamMembers(signal),
    []
  );
}

export function useCertifications() {
  return useApi<Certification[]>(
    (signal) => getCertifications(signal),
    []
  );
}

export function usePartners() {
  return useApi<Partner[]>(
    (signal) => getPartners(signal),
    []
  );
}

export function useFacilities() {
  return useApi<Facility[]>(
    (signal) => getFacilities(signal),
    []
  );
}

export function useTimeline() {
  return useApi<TimelineEvent[]>(
    (signal) => getTimeline(signal),
    []
  );
}
