'use client';

import { useState } from 'react';
import PhotoCard from './PhotoCard';
import PhotoLightbox from './PhotoLightbox';
import GalleryFilters from './GalleryFilters';
import PhotoSubmissionForm from './PhotoSubmissionForm';
import InstagramFeed from './InstagramFeed';
import TestimonialCard from './TestimonialCard';
import Icon from '@/components/ui/AppIcon';
import { useGallery } from '@/hooks/useGallery';
import { useTestimonials, usePageContent } from '@/hooks/useContent';
import type { GalleryPhoto, Testimonial } from '@/lib/api/types';

interface FilterState {
  category: string;
  season: string;
  sortBy: string;
}

const GalleryInteractive = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    season: 'all',
    sortBy: 'recent',
  });

  const { data: pageContent } = usePageContent('gallery');

  const hero = (pageContent?.hero as Record<string, string>) || {};
  const community = (pageContent?.community as Record<string, string>) || {};
  const reviews = (pageContent?.reviews as Record<string, string>) || {};

  const { photos, loading: photosLoading, error: photosError } = useGallery({
    category: filters.category !== 'all' ? filters.category : undefined,
    season: filters.season !== 'all' ? filters.season : undefined,
    sort: filters.sortBy as 'recent' | 'popular' | 'oldest',
    per_page: 20,
  });

  const { data: testimonials, loading: testimonialsLoading } = useTestimonials();

  // Map API testimonials to the shape expected by TestimonialCard
  const mappedTestimonials = (testimonials || []).slice(0, 4).map((t: Testimonial) => ({
    id: t.id,
    name: t.name,
    avatar: t.image || '',
    avatarAlt: t.alt,
    country: t.country || t.location,
    rating: t.rating,
    date: t.date,
    text: t.text || t.comment,
    platform: t.platform || 'Google',
  }));

  const handlePhotoClick = (photoId: number) => {
    const photo = photos.find((p: GalleryPhoto) => p.id === photoId);
    if (photo) {
      setSelectedPhoto(photo);
    }
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p: GalleryPhoto) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePreviousPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p: GalleryPhoto) => p.id === selectedPhoto.id);
    const previousIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setSelectedPhoto(photos[previousIndex]);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-outfit font-bold text-white text-4xl lg:text-5xl mb-4">
              {hero.title || 'Experience Gallery'}
            </h1>
            <p className="font-inter text-white/90 text-lg mb-8">
              {hero.subtitle || 'Discover the magic of Gudauri through the eyes of our community. Share your adventure and inspire others!'}
            </p>
            <button
              onClick={() => setShowSubmissionForm(true)}
              className="px-8 py-3 bg-white text-foreground rounded-md font-outfit font-semibold text-base hover:bg-background transition-all duration-300 shadow-elevated inline-flex items-center space-x-2"
            >
              <Icon name="CloudArrowUpIcon" size={20} variant="outline" />
              <span>{hero.upload_button || 'Submit Your Photo'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <GalleryFilters onFilterChange={setFilters} pageContent={pageContent} />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-outfit font-bold text-foreground text-2xl lg:text-3xl">
              {community.title || 'Community Photos'}
            </h2>
            <p className="font-inter text-muted-foreground text-sm">
              {photosLoading ? 'Loading...' : (community.count_label || `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`)}
            </p>
          </div>

          {photosLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-muted rounded-lg animate-pulse h-72" />
              ))}
            </div>
          )}

          {photosError && !photosLoading && (
            <div className="text-center py-16">
              <Icon name="ExclamationTriangleIcon" size={64} variant="outline" className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-outfit font-semibold text-foreground text-xl mb-2">
                Unable to load photos
              </h3>
              <p className="font-inter text-muted-foreground text-sm">{photosError}</p>
            </div>
          )}

          {!photosLoading && !photosError && photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo: GalleryPhoto) => (
                <PhotoCard key={photo.id} photo={photo} onPhotoClick={handlePhotoClick} />
              ))}
            </div>
          )}

          {!photosLoading && !photosError && photos.length === 0 && (
            <div className="text-center py-16">
              <Icon name="PhotoIcon" size={64} variant="outline" className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-outfit font-semibold text-foreground text-xl mb-2">
                {community.empty_title || 'No photos found'}
              </h3>
              <p className="font-inter text-muted-foreground text-sm">
                {community.empty_subtitle || 'Try adjusting your filters to see more results'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <InstagramFeed />
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-foreground text-3xl lg:text-4xl mb-4">
              {reviews.title || 'What Our Customers Say'}
            </h2>
            <p className="font-inter text-muted-foreground text-base max-w-2xl mx-auto">
              {reviews.subtitle || 'Real experiences from real adventurers. Join thousands of satisfied customers who trust Ski Boom Gudauri.'}
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : mappedTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mappedTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : null}

          {/* Review Platforms */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="StarIcon" size={20} variant="solid" className="text-primary" />
                ))}
              </div>
              <p className="font-inter font-semibold text-foreground text-sm">{reviews.google_rating || '4.9/5 on Google'}</p>
              <p className="font-inter text-muted-foreground text-xs">{reviews.google_count || '1,234 reviews'}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="StarIcon" size={20} variant="solid" className="text-primary" />
                ))}
              </div>
              <p className="font-inter font-semibold text-foreground text-sm">{reviews.facebook_rating || '4.8/5 on Facebook'}</p>
              <p className="font-inter text-muted-foreground text-xs">{reviews.facebook_count || '892 reviews'}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="StarIcon" size={20} variant="solid" className="text-primary" />
                ))}
              </div>
              <p className="font-inter font-semibold text-foreground text-sm">{reviews.tripadvisor_rating || '5.0/5 on TripAdvisor'}</p>
              <p className="font-inter text-muted-foreground text-xs">{reviews.tripadvisor_count || '567 reviews'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
          pageContent={pageContent}
        />
      )}

      {/* Submission Form */}
      {showSubmissionForm && (
        <PhotoSubmissionForm onClose={() => setShowSubmissionForm(false)} pageContent={pageContent} />
      )}
    </>
  );
};

export default GalleryInteractive;
