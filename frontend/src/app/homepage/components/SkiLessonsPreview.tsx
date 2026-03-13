'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useInstructors } from '@/hooks/useLessons';
import type { Instructor } from '@/lib/api/types';

interface SkiLessonsPreviewProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const SkiLessonsPreview = ({ currentLanguage, pageContent }: SkiLessonsPreviewProps) => {
  const { data: instructors, loading, error } = useInstructors();

  const lp = pageContent?.lessons_preview as Record<string, string> | undefined;

  const fallback = {
    en: { title: "Learn from the Best", subtitle: "Expert instructors for all skill levels", viewAllInstructors: "View All Instructors", languages: "Languages", bookLesson: "Book Lesson" },
    ka: { title: "ისწავლეთ საუკეთესოებისგან", subtitle: "ექსპერტი ინსტრუქტორები ყველა დონისთვის", viewAllInstructors: "ყველა ინსტრუქტორის ნახვა", languages: "ენები", bookLesson: "გაკვეთილის დაჯავშნა" },
    ru: { title: "Учитесь у лучших", subtitle: "Опытные инструкторы для всех уровней", viewAllInstructors: "Посмотреть всех инструкторов", languages: "Языки", bookLesson: "Забронировать урок" },
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const text = lp ? {
    title: lp.title || staticText.title,
    subtitle: lp.subtitle || staticText.subtitle,
    viewAllInstructors: lp.view_all_instructors || staticText.viewAllInstructors,
    languages: lp.languages || staticText.languages,
    bookLesson: lp.book_lesson || staticText.bookLesson,
  } : staticText;

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">{text.title}</h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-subtle animate-pulse">
                <div className="h-80 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !instructors || instructors.length === 0) {
    return null;
  }

  const displayInstructors = instructors.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {text.title}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayInstructors.map((instructor: Instructor) => (
            <div
              key={instructor.id}
              className="bg-card rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <AppImage
                  src={instructor.image || ''}
                  alt={instructor.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-outfit font-bold text-2xl mb-1">
                    {instructor.name}
                  </h3>
                  <p className="font-inter text-sm opacity-90">
                    {instructor.specialization}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Icon name="AcademicCapIcon" size={20} variant="solid" className="text-primary mr-2" />
                  <span className="font-inter text-sm text-muted-foreground">
                    {instructor.experience}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="font-inter font-medium text-sm text-foreground mb-2">
                    {text.languages}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.languages.map((lang: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/20 text-secondary rounded-full font-inter text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/ski-lessons"
                  className="block w-full text-center px-4 py-2 bg-conversionAccent text-white rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300"
                >
                  {text.bookLesson}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/ski-lessons"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-md font-outfit font-semibold hover:opacity-90 transition-all duration-300"
          >
            {text.viewAllInstructors}
            <Icon name="ArrowRightIcon" size={20} variant="outline" className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkiLessonsPreview;
