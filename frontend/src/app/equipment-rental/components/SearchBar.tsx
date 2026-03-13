'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
  pageContent?: Record<string, unknown> | null;
}

export default function SearchBar({ onSearch, onFilterToggle, pageContent }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const search = pageContent?.search as Record<string, string> | undefined;

  const mockSuggestions = [
    'Rossignol Experience Skis',
    'Burton Custom Snowboard',
    'Salomon Quest Boots',
    'Smith I/O Goggles',
    'Black Diamond Poles',
    'Atomic Helmet',
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={search?.placeholder || "Search equipment by name, brand, or category..."}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            variant="outline"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-ctaHover transition-all duration-300 shadow-subtle hover:shadow-elevated"
        >
          {search?.button || "Search"}
        </button>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={onFilterToggle}
          className="lg:hidden p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-300"
          aria-label="Toggle filters"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={20} variant="outline" />
        </button>
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevated z-10 overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-foreground hover:bg-muted transition-colors duration-300 flex items-center space-x-3"
            >
              <Icon name="MagnifyingGlassIcon" size={16} variant="outline" className="text-muted-foreground" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}