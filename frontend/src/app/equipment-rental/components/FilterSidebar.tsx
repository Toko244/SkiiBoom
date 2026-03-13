'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useEquipmentCategories } from '@/hooks/useEquipment';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  pageContent?: Record<string, unknown> | null;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  availability: boolean | null;
  rating: number;
}

export default function FilterSidebar({ onFilterChange, isMobileOpen, onMobileClose, pageContent }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    sizes: [],
    availability: null,
    rating: 0,
  });

  const { data: apiCategories } = useEquipmentCategories();

  const categories = (apiCategories && apiCategories.length > 0)
    ? apiCategories.map(c => ({ id: c.slug, label: c.name, count: c.count }))
    : [
        { id: 'skis', label: 'Skis', count: 0 },
        { id: 'snowboards', label: 'Snowboards', count: 0 },
        { id: 'boots', label: 'Boots', count: 0 },
        { id: 'helmets', label: 'Helmets', count: 0 },
        { id: 'poles', label: 'Poles', count: 0 },
        { id: 'goggles', label: 'Goggles', count: 0 },
      ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filtersContent = pageContent?.filters as Record<string, string> | undefined;

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = (available: boolean | null) => {
    const newFilters = { ...filters, availability: available };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 500],
      sizes: [],
      availability: null,
      rating: 0,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="font-outfit font-bold text-xl text-foreground">{filtersContent?.header || "Filters"}</h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-secondary hover:text-primary transition-colors duration-300"
        >
          {filtersContent?.clear_all || "Clear All"}
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-outfit font-semibold text-base text-foreground mb-3">
          {filtersContent?.category_label || "Categories"}
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                  {category.label}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-outfit font-semibold text-base text-foreground mb-3">
          {filtersContent?.price_label || "Price Range (₾)"}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
              className="w-20 px-2 py-1 border border-border rounded-md text-sm"
              min="0"
              max={filters.priceRange[1]}
            />
            <span className="text-muted-foreground">-</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
              className="w-20 px-2 py-1 border border-border rounded-md text-sm"
              min={filters.priceRange[0]}
              max="500"
            />
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-outfit font-semibold text-base text-foreground mb-3">
          {filtersContent?.size_label || "Sizes"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                filters.sizes.includes(size)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-outfit font-semibold text-base text-foreground mb-3">
          {filtersContent?.availability_label || "Availability"}
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === true}
              onChange={() => handleAvailabilityChange(true)}
              className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm text-foreground">{filtersContent?.available_only || "Available Only"}</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === null}
              onChange={() => handleAvailabilityChange(null)}
              className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm text-foreground">{filtersContent?.all_items || "All Items"}</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-outfit font-semibold text-base text-foreground mb-3">
          {filtersContent?.rating_label || "Minimum Rating"}
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-all duration-300 ${
                filters.rating === rating
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={16}
                    variant={index < rating ? 'solid' : 'outline'}
                    className={index < rating ? 'text-primary' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <span className="text-sm">& Up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card rounded-lg shadow-subtle p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onMobileClose}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card shadow-elevated overflow-y-auto">
            <div className="p-6">
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-md transition-colors duration-300"
                aria-label="Close filters"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}