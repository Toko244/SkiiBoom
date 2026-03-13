'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SortDropdownProps {
  onSortChange: (sortBy: string) => void;
  pageContent?: Record<string, unknown> | null;
}

export default function SortDropdown({ onSortChange, pageContent }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');

  const sort = pageContent?.sort as Record<string, string> | undefined;

  const sortOptions = [
    { value: 'featured', label: sort?.featured || 'Featured' },
    { value: 'price-low', label: sort?.price_low || 'Price: Low to High' },
    { value: 'price-high', label: sort?.price_high || 'Price: High to Low' },
    { value: 'rating', label: sort?.rating || 'Highest Rated' },
    { value: 'newest', label: sort?.newest || 'Newest First' },
    { value: 'popular', label: sort?.popularity || 'Most Popular' },
  ];

  const handleSortSelect = (option: { value: string; label: string }) => {
    setSelectedSort(option.label);
    onSortChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-300"
      >
        <span className="text-sm font-medium text-foreground">Sort by: {selectedSort}</span>
        <Icon
          name="ChevronDownIcon"
          size={16}
          variant="outline"
          className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated z-20 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option)}
                className={`w-full px-4 py-3 text-left text-sm transition-colors duration-300 ${
                  selectedSort === option.label
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}