'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface EquipmentDetailsModalProps {
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
    description: string;
    specifications: { label: string; value: string }[];
    images: { url: string; alt: string }[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (id: number, size: string, quantity: number) => void;
  pageContent?: Record<string, unknown> | null;
}

export default function EquipmentDetailsModal({ equipment, isOpen, onClose, onBook, pageContent }: EquipmentDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const detailsModal = pageContent?.details_modal as Record<string, string> | undefined;
  const labels = pageContent?.labels as Record<string, string> | undefined;

  if (!isOpen || !equipment) return null;

  const handleBook = () => {
    if (selectedSize && quantity > 0) {
      onBook(equipment.id, selectedSize, quantity);
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === equipment.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? equipment.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-elevated">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-outfit font-bold text-2xl text-foreground">
            {detailsModal?.title || "Equipment Details"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors duration-300"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-4">
                <AppImage
                  src={equipment.images[currentImageIndex].url}
                  alt={equipment.images[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                />
                
                {equipment.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Previous image"
                    >
                      <Icon name="ChevronLeftIcon" size={24} variant="outline" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Next image"
                    >
                      <Icon name="ChevronRightIcon" size={24} variant="outline" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black bg-opacity-60 text-white rounded-full text-sm">
                  {currentImageIndex + 1} / {equipment.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto">
                {equipment.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'border-primary' :'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <AppImage
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Category & Availability */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary uppercase tracking-wide">
                  {equipment.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  equipment.available 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-error text-error-foreground'
                }`}>
                  {equipment.available ? (labels?.available || 'Available') : (labels?.unavailable || 'Unavailable')}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-outfit font-bold text-3xl text-foreground">
                {equipment.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      name="StarIcon"
                      size={20}
                      variant={index < Math.floor(equipment.rating) ? 'solid' : 'outline'}
                      className={index < Math.floor(equipment.rating) ? 'text-primary' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {equipment.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({equipment.reviews} {labels?.reviews || "reviews"})
                </span>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-border">
                <p className="text-4xl font-outfit font-bold text-foreground">
                  ₾{equipment.price}
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    {labels?.per_day || "per day"}
                  </span>
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-outfit font-semibold text-lg text-foreground mb-2">
                  {detailsModal?.description || "Description"}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {equipment.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-outfit font-semibold text-lg text-foreground mb-3">
                  {detailsModal?.key_features || "Key Features"}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {equipment.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="font-outfit font-semibold text-lg text-foreground mb-3">
                  {detailsModal?.specifications || "Specifications"}
                </h4>
                <div className="space-y-2">
                  {equipment.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">{spec.label}</span>
                      <span className="text-sm font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h4 className="font-outfit font-semibold text-lg text-foreground mb-3">
                  {detailsModal?.select_size || "Select Size"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {equipment.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h4 className="font-outfit font-semibold text-lg text-foreground mb-3">
                  {detailsModal?.quantity || "Quantity"}
                </h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="MinusIcon" size={20} variant="outline" />
                  </button>
                  <span className="text-2xl font-semibold text-foreground w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="Increase quantity"
                  >
                    <Icon name="PlusIcon" size={20} variant="outline" />
                  </button>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBook}
                disabled={!equipment.available || !selectedSize}
                className={`w-full py-4 rounded-md font-outfit font-bold text-lg transition-all duration-300 ${
                  equipment.available && selectedSize
                    ? 'bg-conversionAccent text-white hover:bg-ctaHover shadow-subtle hover:shadow-elevated'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {equipment.available ? (labels?.book_now || 'Book Now') : (detailsModal?.currently_unavailable || 'Currently Unavailable')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}