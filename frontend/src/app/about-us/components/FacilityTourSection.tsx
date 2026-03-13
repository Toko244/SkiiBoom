'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface FacilityImage {
  id: number;
  title: string;
  image: string;
  alt: string;
  description: string;
}

interface FacilityTourSectionProps {
  facilityImages: FacilityImage[];
  pageContent?: Record<string, unknown> | null;
}

export default function FacilityTourSection({ facilityImages, pageContent }: FacilityTourSectionProps) {
  const facilitiesContent = pageContent?.facilities as Record<string, string> | undefined;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? facilityImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === facilityImages.length - 1 ? 0 : prev + 1));
  };

  const currentImage = facilityImages[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-foreground mb-4">
            {facilitiesContent?.title || 'Virtual Facility Tour'}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            {facilitiesContent?.subtitle || 'Explore our state-of-the-art facilities and equipment storage areas'}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-elevated">
            <AppImage
              src={currentImage.image}
              alt={currentImage.alt}
              className="w-full h-full object-cover"
            />
            
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-all duration-300 shadow-subtle"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} variant="outline" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-all duration-300 shadow-subtle"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} variant="outline" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-outfit font-semibold text-2xl text-white mb-2">
                {currentImage.title}
              </h3>
              <p className="font-inter text-white/90 leading-relaxed">
                {currentImage.description}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {facilityImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}