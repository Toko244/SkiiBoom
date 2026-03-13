'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useTestimonials } from '@/hooks/useContent';

interface TestimonialsSectionProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const TestimonialsSection = ({ currentLanguage, pageContent }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonials, loading, error } = useTestimonials();

  const ts = pageContent?.testimonials as Record<string, string> | undefined;

  const fallback = {
    en: { title: "What Our Guests Say", subtitle: "Real experiences from skiers who chose Ski Boom Gudauri", previous: "Previous", next: "Next" },
    ka: { title: "რას ამბობენ ჩვენი სტუმრები", subtitle: "რეალური გამოცდილება მოთხილამურეებისგან, რომლებმაც აირჩიეს Ski Boom Gudauri", previous: "წინა", next: "შემდეგი" },
    ru: { title: "Что говорят наши гости", subtitle: "Реальный опыт лыжников, выбравших Ski Boom Gudauri", previous: "Предыдущий", next: "Следующий" },
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const text = ts ? {
    title: ts.title || staticText.title,
    subtitle: ts.subtitle || staticText.subtitle,
    previous: ts.previous || staticText.previous,
    next: ts.next || staticText.next,
  } : staticText;

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">{text.title}</h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg shadow-elevated p-8 lg:p-12 animate-pulse">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-muted" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-5 bg-muted rounded w-1/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {text.title}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-elevated p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                  <AppImage
                    src={currentTestimonial.image || ''}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3">
                  {[...Array(currentTestimonial.rating)].map((_, index) => (
                    <Icon key={index} name="StarIcon" size={24} variant="solid" className="text-primary" />
                  ))}
                </div>

                <p className="font-inter text-lg text-foreground mb-6 italic">
                  &quot;{currentTestimonial.comment || currentTestimonial.text}&quot;
                </p>

                <div className="mb-2">
                  <h4 className="font-outfit font-bold text-xl text-foreground">
                    {currentTestimonial.name}
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    {currentTestimonial.country || currentTestimonial.location} • {currentTestimonial.date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-outfit font-semibold hover:opacity-90 transition-all duration-300"
              aria-label={text.previous}
            >
              <Icon name="ChevronLeftIcon" size={20} variant="outline" />
              {text.previous}
            </button>

            <div className="flex gap-2">
              {testimonials.map((_: unknown, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-primary w-8' : 'bg-muted hover:bg-muted/80'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-outfit font-semibold hover:opacity-90 transition-all duration-300"
              aria-label={text.next}
            >
              {text.next}
              <Icon name="ChevronRightIcon" size={20} variant="outline" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
