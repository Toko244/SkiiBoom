'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  pageContent?: Record<string, unknown> | null;
}

export default function TestimonialsSection({ testimonials, pageContent }: TestimonialsSectionProps) {
  const testimonialsContent = pageContent?.testimonials as Record<string, string> | undefined;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-foreground mb-4">
            {testimonialsContent?.title || 'What Our Guests Say'}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            {testimonialsContent?.subtitle || 'Real experiences from skiers who trusted us with their mountain adventures'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-lg p-8 lg:p-12 shadow-elevated">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-subtle">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      name="StarIcon"
                      size={20}
                      variant={index < currentTestimonial.rating ? 'solid' : 'outline'}
                      className={index < currentTestimonial.rating ? 'text-primary' : 'text-muted'}
                    />
                  ))}
                </div>

                <p className="font-inter text-lg text-foreground mb-6 leading-relaxed italic">
                  &quot;{currentTestimonial.text}&quot;
                </p>

                <div>
                  <h4 className="font-outfit font-semibold text-xl text-foreground mb-1">
                    {currentTestimonial.name}
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground mb-1">
                    {currentTestimonial.location}
                  </p>
                  <p className="font-inter text-xs text-muted-foreground">
                    {currentTestimonial.date}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <Icon name="ChevronLeftIcon" size={20} variant="outline" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary w-6' : 'bg-muted'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Next testimonial"
              >
                <Icon name="ChevronRightIcon" size={20} variant="outline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}