'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import SkillLevelCard from './SkillLevelCard';
import InstructorCard from './InstructorCard';
import LessonPackageCard from './LessonPackageCard';
import TestimonialCard from './TestimonialCard';
import SafetySection from './SafetySection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Icon from '@/components/ui/AppIcon';
import { useSkillLevels, useInstructors, useLessonPackages } from '@/hooks/useLessons';
import { useTestimonials, usePageContent } from '@/hooks/useContent';
import type { SkillLevel, Instructor, LessonPackage, Testimonial } from '@/lib/api/types';

const SkiLessonsInteractive = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const { data: pageContent } = usePageContent('ski-lessons');
  const skillLevelsContent = pageContent?.skill_levels as Record<string, string> | undefined;
  const instructorsContent = pageContent?.instructors as Record<string, string> | undefined;
  const packagesContent = pageContent?.packages as Record<string, string> | undefined;
  const testimonialsContent = pageContent?.testimonials as Record<string, string> | undefined;

  const { data: skillLevels, loading: skillsLoading } = useSkillLevels();
  const { data: instructors, loading: instructorsLoading } = useInstructors();
  const { data: lessonPackages, loading: packagesLoading } = useLessonPackages();
  const { data: testimonials, loading: testimonialsLoading } = useTestimonials();

  const colorMap: Record<string, string> = {
    green: 'bg-success',
    blue: 'bg-primary',
    red: 'bg-conversionAccent',
    purple: 'bg-secondary',
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleViewProfile = (instructorId: string) => {
    console.log('View instructor profile:', instructorId);
  };

  const handleBookPackage = (packageId: string) => {
    console.log('Book package:', packageId);
  };

  const LoadingSkeleton = ({ count, height = 'h-64' }: { count: number; height?: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${height} bg-muted rounded-lg animate-pulse`} />
      ))}
    </div>
  );

  // Map API instructor data to component-expected shape
  const mappedInstructors = (instructors || []).map((inst: Instructor) => ({
    id: String(inst.id),
    name: inst.name,
    image: inst.image || '',
    alt: inst.alt,
    specialization: inst.specialization,
    experience: inst.experience,
    languages: inst.languages,
    rating: inst.rating,
    totalLessons: inst.totalLessons,
    certifications: inst.certifications,
  }));

  // Map API package data to component-expected shape
  const mappedPackages = (lessonPackages || []).map((pkg: LessonPackage) => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    sessions: pkg.sessions,
    duration: String(pkg.duration),
    price: pkg.price,
    savings: pkg.savings,
    features: pkg.features,
    popular: pkg.popular,
  }));

  // Map API testimonial data to component-expected shape
  const mappedTestimonials = (testimonials || []).slice(0, 4).map((t: Testimonial) => ({
    id: String(t.id),
    name: t.name,
    image: t.image || '',
    alt: t.alt,
    country: t.country || t.location,
    rating: t.rating,
    date: t.date,
    comment: t.comment || t.text,
    lessonType: t.lessonType || '',
  }));

  return (
    <div className="min-h-screen bg-background">
      <HeroSection pageContent={pageContent} />

      {/* Skill Levels Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
              {skillLevelsContent?.title || "Choose Your Skill Level"}
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              {skillLevelsContent?.subtitle || "From first turns to perfect powder days - we have the right program for everyone"}
            </p>
          </div>

          {skillsLoading ? (
            <LoadingSkeleton count={4} />
          ) : skillLevels && skillLevels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillLevels.map((level: SkillLevel) => (
                <SkillLevelCard
                  key={level.id}
                  level={{ ...level, color: colorMap[level.color] || level.color }}
                  onSelect={handleLevelSelect}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
              {instructorsContent?.title || "Meet Our Expert Instructors"}
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              {instructorsContent?.subtitle || "Learn from certified professionals with years of mountain experience and passion for teaching"}
            </p>
          </div>

          {instructorsLoading ? (
            <LoadingSkeleton count={4} height="h-80" />
          ) : mappedInstructors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mappedInstructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Lesson Packages Section */}
      <section id="lesson-packages" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
              {packagesContent?.title || "Lesson Packages"}
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              {packagesContent?.subtitle || "Choose the package that fits your schedule and learning goals"}
            </p>
          </div>

          {packagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : mappedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {mappedPackages.map((pkg) => (
                <LessonPackageCard
                  key={pkg.id}
                  package={pkg}
                  onBook={handleBookPackage}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <SafetySection pageContent={pageContent} />

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
              {testimonialsContent?.title || "What Our Students Say"}
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              {testimonialsContent?.subtitle || "Real experiences from skiers who learned with us"}
            </p>
          </div>

          {testimonialsLoading ? (
            <LoadingSkeleton count={4} height="h-48" />
          ) : mappedTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mappedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <FAQSection pageContent={pageContent} />
      <CTASection pageContent={pageContent} />
    </div>
  );
};

export default SkiLessonsInteractive;
