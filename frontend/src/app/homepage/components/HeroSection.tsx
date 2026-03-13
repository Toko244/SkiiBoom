'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const HeroSection = ({ currentLanguage, pageContent }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const hero = pageContent?.hero as Record<string, string> | undefined;

  const slides = hero ? [
    { image: hero.slide_1_image, alt: hero.slide_1_alt },
    { image: hero.slide_2_image, alt: hero.slide_2_alt },
    { image: hero.slide_3_image, alt: hero.slide_3_alt },
  ].filter(s => s.image) : [
    {
      image: "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg",
      alt: "Professional skier in bright yellow jacket carving down snowy mountain slope with blue sky background"
    },
    {
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      alt: "Group of skiers standing on mountain peak with panoramic view of snow-covered Caucasus mountains"
    },
    {
      image: "https://images.pixabay.com/photo/2016/01/19/17/41/skiing-1149877_1280.jpg",
      alt: "Close-up of modern ski equipment with red and black skis against white snow background"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const content = hero ? {
    title: hero.title,
    subtitle: hero.subtitle,
    cta1: hero.cta1,
    cta2: hero.cta2,
    stats: [
      { value: hero.stat_1_value, label: hero.stat_1_label },
      { value: hero.stat_2_value, label: hero.stat_2_label },
      { value: hero.stat_3_value, label: hero.stat_3_label },
    ]
  } : {
    title: "Experience the Thrill of Gudauri's Slopes",
    subtitle: "Premium ski equipment rental and expert lessons in the heart of the Caucasus Mountains",
    cta1: "Rent Equipment",
    cta2: "Book Lessons",
    stats: [
      { value: "500+", label: "Premium Equipment" },
      { value: "15+", label: "Expert Instructors" },
      { value: "10K+", label: "Happy Skiers" }
    ]
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <AppImage
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight animate-fade-in">
            {content.title}
          </h1>
          <p className="font-inter text-lg md:text-xl mb-8 opacity-90 animate-fade-in-delay">
            {content.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-delay-2">
            <Link
              href="/equipment-rental"
              className="inline-flex items-center justify-center px-8 py-4 bg-conversionAccent text-white rounded-md font-outfit font-semibold text-lg hover:bg-ctaHover transition-all duration-300 shadow-elevated hover:shadow-elevated-hover transform hover:-translate-y-1"
            >
              <Icon name="CubeIcon" size={24} variant="outline" className="mr-2" />
              {content.cta1}
            </Link>
            <Link
              href="/ski-lessons"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-md font-outfit font-semibold text-lg hover:bg-white hover:text-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <Icon name="AcademicCapIcon" size={24} variant="outline" className="mr-2" />
              {content.cta2}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl animate-fade-in-delay-3">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-outfit font-bold text-3xl md:text-4xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-inter text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <Icon name="ChevronDownIcon" size={32} variant="outline" className="text-white" />
      </div>
    </section>
  );
};

export default HeroSection;
