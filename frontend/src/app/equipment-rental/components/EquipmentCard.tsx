'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface EquipmentCardProps {
  equipment: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    alt: string;
    rating: number;
    reviews: number;
    available: boolean;
    features: string[];
    sizes: string[];
  };
  onViewDetails: (id: number) => void;
  onAddToWishlist: (id: number) => void;
  onQuickBook: (id: number) => void;
  pageContent?: Record<string, unknown> | null;
}

export default function EquipmentCard({ equipment, onViewDetails, onAddToWishlist, onQuickBook, pageContent }: EquipmentCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const labels = pageContent?.labels as Record<string, string> | undefined;

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(equipment.id);
  };

  return (
    <div className="bg-card rounded-lg shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <AppImage
          src={equipment.image}
          alt={equipment.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
          equipment.available 
            ? 'bg-success text-success-foreground' 
            : 'bg-error text-error-foreground'
        }`}>
          {equipment.available ? (labels?.available || 'Available') : (labels?.unavailable || 'Unavailable')}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-primary transition-colors duration-300"
          aria-label="Add to wishlist"
        >
          <Icon
            name="HeartIcon"
            size={20}
            variant={isWishlisted ? 'solid' : 'outline'}
            className={isWishlisted ? 'text-error' : 'text-foreground'}
          />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(equipment.id)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-foreground rounded-md font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          {labels?.quick_view || "Quick View"}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-1">
          {equipment.category}
        </p>

        {/* Name */}
        <h3 className="font-outfit font-semibold text-lg text-foreground mb-2 line-clamp-1">
          {equipment.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={16}
                variant={index < Math.floor(equipment.rating) ? 'solid' : 'outline'}
                className={index < Math.floor(equipment.rating) ? 'text-primary' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({equipment.reviews})
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {equipment.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-2xl font-outfit font-bold text-foreground">
              ₾{equipment.price}
            </p>
            <p className="text-xs text-muted-foreground">{labels?.per_day || "per day"}</p>
          </div>
          <button
            onClick={() => onQuickBook(equipment.id)}
            disabled={!equipment.available}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
              equipment.available
                ? 'bg-conversionAccent text-white hover:bg-ctaHover' :'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {equipment.available ? (labels?.book_now || 'Book Now') : (labels?.unavailable || 'Unavailable')}
          </button>
        </div>
      </div>
    </div>
  );
}