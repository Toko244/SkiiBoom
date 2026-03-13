'use client';

import Header from '@/components/common/Header';
import HeroSection from './HeroSection';
import BrandStorySection from './BrandStorySection';
import TeamSection from './TeamSection';
import CertificationsSection from './CertificationsSection';
import PartnershipsSection from './PartnershipsSection';
import FacilityTourSection from './FacilityTourSection';
import TimelineSection from './TimelineSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import FooterSection from './FooterSection';
import { useTeamMembers, useCertifications, usePartners, useFacilities, useTimeline, useTestimonials, usePageContent } from '@/hooks/useContent';
import type { TeamMember, Certification, Partner, Facility, TimelineEvent, Testimonial } from '@/lib/api/types';

export default function AboutUsInteractive() {
  const { data: pageContent } = usePageContent('about-us');
  const { data: teamMembers, loading: teamLoading } = useTeamMembers();
  const { data: certifications, loading: certsLoading } = useCertifications();
  const { data: partners, loading: partnersLoading } = usePartners();
  const { data: facilities, loading: facilitiesLoading } = useFacilities();
  const { data: timeline, loading: timelineLoading } = useTimeline();
  const { data: testimonials, loading: testimonialsLoading } = useTestimonials();

  const storyPoints = [
    {
      icon: "SparklesIcon",
      title: "Georgian Heritage Meets Alpine Excellence",
      description: "Founded in the heart of the Caucasus Mountains, we blend traditional Georgian hospitality with world-class alpine standards to create unforgettable mountain experiences."
    },
    {
      icon: "ShieldCheckIcon",
      title: "Safety & Quality First",
      description: "Every piece of equipment undergoes rigorous safety inspections and maintenance. Our internationally certified team ensures you're equipped with the best gear for your skill level."
    },
    {
      icon: "HeartIcon",
      title: "Passionate Mountain Experts",
      description: "Our team lives and breathes mountain life. From first-time skiers to seasoned riders, we're dedicated to making your Gudauri adventure extraordinary."
    }
  ];

  // Map API data to component-expected shapes
  const mappedTeam = (teamMembers || []).map((m: TeamMember) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    image: m.image || '',
    alt: m.alt,
    bio: m.bio,
    certifications: m.certifications,
    experience: m.experience,
  }));

  const mappedCerts = (certifications || []).map((c: Certification) => ({
    id: c.id,
    icon: c.icon || 'ShieldCheckIcon',
    title: c.title,
    description: c.description,
    issuer: c.issuer,
  }));

  const mappedPartners = (partners || []).map((p: Partner) => ({
    id: p.id,
    name: p.name,
    logo: p.logo || '',
    alt: p.alt || `Logo of ${p.name}`,
    category: p.category || '',
  }));

  const mappedFacilities = (facilities || []).map((f: Facility) => ({
    id: f.id,
    title: f.name,
    image: f.images?.[0]?.url || '',
    alt: f.images?.[0]?.alt || f.name,
    description: f.description,
  }));

  const mappedTimeline = (timeline || []).map((t: TimelineEvent) => ({
    id: t.id,
    year: String(t.year),
    title: t.title,
    description: t.description,
    icon: t.icon || 'SparklesIcon',
  }));

  const mappedTestimonials = (testimonials || []).slice(0, 3).map((t: Testimonial) => ({
    id: t.id,
    name: t.name,
    location: t.location || t.country,
    image: t.image || '',
    alt: t.alt,
    rating: t.rating,
    text: t.text || t.comment,
    date: t.date,
  }));

  const LoadingBlock = () => (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <Header className="mt-16 lg:mt-20" />

      <HeroSection
        title="About Ski Boom Gudauri"
        subtitle="Where Georgian mountain heritage meets world-class alpine adventure"
        backgroundImage="https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg"
        backgroundAlt="Panoramic view of Gudauri ski resort with snow-covered mountain peaks, ski slopes, and modern ski lifts under clear blue sky"
        pageContent={pageContent}
      />

      <BrandStorySection
        storyPoints={storyPoints}
        mainImage="https://images.pexels.com/photos/7130506/pexels-photo-7130506.jpeg"
        mainImageAlt="Ski Boom Gudauri team members in branded uniforms standing together in front of equipment showroom with mountain backdrop"
        storyText="Since 2015, we've been transforming mountain dreams into reality. What started as a small rental shop has grown into Gudauri's most trusted ski equipment and instruction provider, serving thousands of adventurers from around the world."
        pageContent={pageContent}
      />

      {teamLoading ? <LoadingBlock /> : mappedTeam.length > 0 ? <TeamSection teamMembers={mappedTeam} pageContent={pageContent} /> : null}

      {certsLoading ? <LoadingBlock /> : mappedCerts.length > 0 ? <CertificationsSection certifications={mappedCerts} pageContent={pageContent} /> : null}

      {partnersLoading ? <LoadingBlock /> : mappedPartners.length > 0 ? <PartnershipsSection partners={mappedPartners} pageContent={pageContent} /> : null}

      {facilitiesLoading ? <LoadingBlock /> : mappedFacilities.length > 0 ? <FacilityTourSection facilityImages={mappedFacilities} pageContent={pageContent} /> : null}

      {timelineLoading ? <LoadingBlock /> : mappedTimeline.length > 0 ? <TimelineSection timelineEvents={mappedTimeline} pageContent={pageContent} /> : null}

      {testimonialsLoading ? <LoadingBlock /> : mappedTestimonials.length > 0 ? <TestimonialsSection testimonials={mappedTestimonials} pageContent={pageContent} /> : null}

      <CTASection pageContent={pageContent} />

      <FooterSection />
    </main>
  );
}
