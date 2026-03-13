'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import HeroSection from './HeroSection';
import QuickBookingWidget from './QuickBookingWidget';
import FeaturedEquipment from './FeaturedEquipment';
import SkiLessonsPreview from './SkiLessonsPreview';
import TestimonialsSection from './TestimonialsSection';
import WhyChooseUs from './WhyChooseUs';
import GalleryPreview from './GalleryPreview';
import CTASection from './CTASection';
import Footer from './Footer';
import { usePageContent } from '@/hooks/useContent';

const HomepageInteractive = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { data: pageContent } = usePageContent('homepage');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 lg:pt-20">
        <HeroSection currentLanguage={currentLanguage} pageContent={pageContent} />

        <div className="container mx-auto px-4 -mt-16 relative z-20 mb-16">
          <QuickBookingWidget currentLanguage={currentLanguage} pageContent={pageContent} />
        </div>

        <FeaturedEquipment currentLanguage={currentLanguage} pageContent={pageContent} />
        <SkiLessonsPreview currentLanguage={currentLanguage} pageContent={pageContent} />
        <WhyChooseUs currentLanguage={currentLanguage} pageContent={pageContent} />
        <TestimonialsSection currentLanguage={currentLanguage} pageContent={pageContent} />
        <GalleryPreview currentLanguage={currentLanguage} pageContent={pageContent} />
        <CTASection currentLanguage={currentLanguage} pageContent={pageContent} />
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default HomepageInteractive;
