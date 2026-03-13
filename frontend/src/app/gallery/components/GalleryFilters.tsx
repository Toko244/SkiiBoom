'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface GalleryFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  pageContent?: Record<string, unknown> | null;
}

interface FilterState {
  category: string;
  season: string;
  sortBy: string;
}

const GalleryFilters = ({ onFilterChange, pageContent }: GalleryFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSeason, setActiveSeason] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filters = (pageContent?.filters as Record<string, unknown>) || {};
  const apiCategories = filters.categories as Array<{ id: string; label: string }> | undefined;
  const apiSeasons = filters.seasons as Array<{ id: string; label: string }> | undefined;
  const apiSortOptions = filters.sort_options as Array<{ id: string; label: string }> | undefined;

  const categoryIcons: Record<string, string> = {
    all: 'PhotoIcon',
    skiing: 'UserIcon',
    equipment: 'CubeIcon',
    lessons: 'AcademicCapIcon',
    slopes: 'MapIcon',
  };

  const categories = apiCategories || [
    { id: 'all', label: 'All Photos' },
    { id: 'skiing', label: 'Skiing' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'slopes', label: 'Slopes' },
  ];

  const seasons = apiSeasons || [
    { id: 'all', label: 'All Seasons' },
    { id: 'winter', label: 'Winter 2025/26' },
    { id: 'spring', label: 'Spring 2026' },
    { id: 'autumn', label: 'Autumn 2025' },
  ];

  const sortOptions = apiSortOptions || [
    { id: 'recent', label: 'Most Recent' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'oldest', label: 'Oldest First' },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    onFilterChange({ category: categoryId, season: activeSeason, sortBy });
  };

  const handleSeasonChange = (seasonId: string) => {
    setActiveSeason(seasonId);
    onFilterChange({ category: activeCategory, season: seasonId, sortBy });
  };

  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
    onFilterChange({ category: activeCategory, season: activeSeason, sortBy: sortId });
  };

  return (
    <div className="bg-card rounded-lg p-4 lg:p-6 shadow-subtle">
      {/* Category Filters */}
      <div className="mb-6">
        <h3 className="font-outfit font-semibold text-foreground text-sm mb-3">
          {(filters.category_label as string) || 'Category'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-inter font-medium text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Icon name={(categoryIcons[category.id] || 'PhotoIcon') as any} size={16} variant="outline" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Season & Sort Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Season Filter */}
        <div>
          <label className="font-outfit font-semibold text-foreground text-sm mb-2 block">
            {(filters.season_label as string) || 'Season'}
          </label>
          <select
            value={activeSeason}
            onChange={(e) => handleSeasonChange(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="font-outfit font-semibold text-foreground text-sm mb-2 block">
            {(filters.sort_label as string) || 'Sort By'}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;