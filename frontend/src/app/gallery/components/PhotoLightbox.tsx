'use client';

import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface PhotoLightboxProps {
  photo: {
    id: number;
    image: string;
    alt: string;
    title: string;
    author: string;
    authorAvatar: string;
    authorAvatarAlt: string;
    date: string;
    likes: number;
    category: string;
    description: string;
  } | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  pageContent?: Record<string, unknown> | null;
}

const PhotoLightbox = ({ photo, onClose, onNext, onPrevious, pageContent }: PhotoLightboxProps) => {
  const lightbox = (pageContent?.lightbox as Record<string, string>) || {};
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  if (!photo) return null;

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing photo: ${photo.title}`);
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      instagram: `https://www.instagram.com/`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 p-3 bg-background/90 rounded-full hover:bg-background transition-all duration-300 z-10"
      >
        <Icon name="XMarkIcon" size={24} variant="outline" className="text-foreground" />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-background/90 rounded-full hover:bg-background transition-all duration-300 z-10"
      >
        <Icon name="ChevronLeftIcon" size={24} variant="outline" className="text-foreground" />
      </button>

      <button
        onClick={onNext}
        className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-background/90 rounded-full hover:bg-background transition-all duration-300 z-10"
      >
        <Icon name="ChevronRightIcon" size={24} variant="outline" className="text-foreground" />
      </button>

      {/* Content Container */}
      <div className="w-full max-w-6xl max-h-[90vh] bg-card rounded-lg overflow-hidden shadow-elevated flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="flex-1 relative bg-foreground/5 flex items-center justify-center p-4 lg:p-8">
          <div className="relative w-full h-full max-h-[60vh] lg:max-h-full">
            <AppImage
              src={photo.image}
              alt={photo.alt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-96 p-6 overflow-y-auto">
          {/* Title & Category */}
          <div className="mb-4">
            <div className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full font-inter font-medium text-xs mb-3">
              {photo.category}
            </div>
            <h2 className="font-outfit font-bold text-foreground text-2xl mb-2">
              {photo.title}
            </h2>
            <p className="font-inter text-muted-foreground text-sm leading-relaxed">
              {photo.description}
            </p>
          </div>

          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-border">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <AppImage
                src={photo.authorAvatar}
                alt={photo.authorAvatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-semibold text-foreground text-base">
                {photo.author}
              </span>
              <span className="font-inter text-muted-foreground text-sm">
                {photo.date}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="HeartIcon" size={20} variant="outline" className="text-destructive" />
              <span className="font-inter font-medium text-foreground text-sm">
                {photo.likes} {lightbox.likes || 'likes'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="EyeIcon" size={20} variant="outline" className="text-secondary" />
              <span className="font-inter font-medium text-foreground text-sm">
                {Math.floor(Math.random() * 500) + 100} {lightbox.views || 'views'}
              </span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            <h3 className="font-outfit font-semibold text-foreground text-sm">
              {lightbox.share_title || 'Share this photo'}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { platform: 'facebook', icon: 'ShareIcon', label: 'Facebook' },
                { platform: 'twitter', icon: 'ShareIcon', label: 'Twitter' },
                { platform: 'instagram', icon: 'ShareIcon', label: 'Instagram' },
                { platform: 'whatsapp', icon: 'ShareIcon', label: 'WhatsApp' },
              ].map((social) => (
                <button
                  key={social.platform}
                  onClick={() => handleShare(social.platform)}
                  className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon name={social.icon as any} size={20} variant="outline" />
                  <span className="font-inter text-xs mt-1">{social.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;