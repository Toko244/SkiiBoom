'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/common/Header';
import EquipmentCard from './EquipmentCard';
import FilterSidebar, { FilterState } from './FilterSidebar';
import EquipmentDetailsModal from './EquipmentDetailsModal';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import ComparisonTool from './ComparisonTool';
import Icon from '@/components/ui/AppIcon';
import { useEquipment } from '@/hooks/useEquipment';
import { usePageContent } from '@/hooks/useContent';
import type { Equipment } from '@/lib/api/types';

export default function EquipmentRentalInteractive() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    sizes: [],
    availability: null,
    rating: 0,
  });
  const [comparedItems, setComparedItems] = useState<Equipment[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { data: pageContent } = usePageContent('equipment-rental');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const apiFilters = useMemo(() => ({
    search: searchQuery || undefined,
    category: filters.categories.length > 0 ? filters.categories : undefined,
    price_min: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
    price_max: filters.priceRange[1] < 500 ? filters.priceRange[1] : undefined,
    size: filters.sizes.length > 0 ? filters.sizes : undefined,
    availability: filters.availability === true ? 'available' : undefined,
    min_rating: filters.rating > 0 ? filters.rating : undefined,
    sort: sortBy,
    per_page: itemsPerPage,
    page: currentPage,
  }), [searchQuery, filters, sortBy, currentPage]);

  const { equipment, meta, loading, error } = useEquipment(apiFilters);

  const handleViewDetails = (id: number) => {
    const item = equipment.find((e: Equipment) => e.id === id);
    if (item) {
      setSelectedEquipment(item);
      setIsModalOpen(true);
    }
  };

  const handleAddToWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleQuickBook = (id: number) => {
    const item = equipment.find((e: Equipment) => e.id === id);
    if (item) {
      setSelectedEquipment(item);
      setIsModalOpen(true);
    }
  };

  const handleBook = (id: number, size: string, quantity: number) => {
    console.log(`Booking equipment ${id} - Size: ${size}, Quantity: ${quantity}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleAddToComparison = (id: number) => {
    const item = equipment.find((e: Equipment) => e.id === id);
    if (item && comparedItems.length < 4 && !comparedItems.find(c => c.id === id)) {
      setComparedItems([...comparedItems, item]);
    }
  };

  const handleRemoveFromComparison = (id: number) => {
    setComparedItems(comparedItems.filter(item => item.id !== id));
  };

  const handleClearComparison = () => {
    setComparedItems([]);
  };

  const totalPages = meta?.last_page ?? 1;
  const totalCount = meta?.total ?? equipment.length;

  const hero = pageContent?.hero as Record<string, unknown> | undefined;
  const trustBadges = (hero?.trust_badges as string[] | undefined) || ['Latest Models', 'Professional Fitting', 'Flexible Rental Periods'];
  const resultsContent = pageContent?.results as Record<string, string> | undefined;
  const emptyState = pageContent?.empty_state as Record<string, string> | undefined;
  const trustSignals = pageContent?.trust_signals as Record<string, string> | undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-outfit font-bold text-4xl lg:text-5xl text-primary-foreground mb-4">
                {(hero?.title as string) || "Premium Equipment Rental"}
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground opacity-90 mb-8">
                {(hero?.description as string) || "Discover our comprehensive collection of top-quality ski and snowboard equipment. From beginner-friendly gear to expert-level performance equipment, find everything you need for an unforgettable mountain experience."}
              </p>
              <div className="flex flex-wrap gap-4">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2 text-primary-foreground">
                    <Icon name="CheckCircleIcon" size={20} variant="solid" />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setIsMobileFilterOpen(true)}
              pageContent={pageContent}
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Filter Sidebar */}
              <FilterSidebar
                onFilterChange={handleFilterChange}
                isMobileOpen={isMobileFilterOpen}
                onMobileClose={() => setIsMobileFilterOpen(false)}
                pageContent={pageContent}
              />

              {/* Equipment Grid */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-outfit font-semibold text-2xl text-foreground">
                      {loading ? 'Loading...' : `${totalCount} ${resultsContent?.title_suffix || "Equipment Available"}`}
                    </h2>
                    {searchQuery && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Showing results for &quot;{searchQuery}&quot;
                      </p>
                    )}
                  </div>
                  <SortDropdown onSortChange={handleSortChange} pageContent={pageContent} />
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-card rounded-lg overflow-hidden shadow-subtle animate-pulse">
                        <div className="h-48 bg-muted" />
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-muted rounded w-3/4" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                          <div className="h-6 bg-muted rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {error && !loading && (
                  <div className="text-center py-16">
                    <Icon name="ExclamationTriangleIcon" size={64} variant="outline" className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-outfit font-semibold text-2xl text-foreground mb-2">
                      Unable to Load Equipment
                    </h3>
                    <p className="text-muted-foreground mb-6">{error}</p>
                  </div>
                )}

                {/* Equipment Cards */}
                {!loading && !error && equipment.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {equipment.map((item: Equipment) => (
                        <div key={item.id} className="relative">
                          <EquipmentCard
                            equipment={item}
                            onViewDetails={handleViewDetails}
                            onAddToWishlist={handleAddToWishlist}
                            onQuickBook={handleQuickBook}
                            pageContent={pageContent}
                          />
                          <button
                            onClick={() => handleAddToComparison(item.id)}
                            disabled={comparedItems.length >= 4 || comparedItems.some(c => c.id === item.id)}
                            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Add to comparison"
                          >
                            <Icon name="ScaleIcon" size={16} variant="outline" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-md hover:bg-muted transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Previous page"
                        >
                          <Icon name="ChevronLeftIcon" size={20} variant="outline" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-10 h-10 rounded-md font-medium transition-all duration-300 ${
                              currentPage === index + 1
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted text-foreground'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-md hover:bg-muted transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Next page"
                        >
                          <Icon name="ChevronRightIcon" size={20} variant="outline" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Empty State */}
                {!loading && !error && equipment.length === 0 && (
                  <div className="text-center py-16">
                    <Icon name="MagnifyingGlassIcon" size={64} variant="outline" className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-outfit font-semibold text-2xl text-foreground mb-2">
                      {emptyState?.title || "No Equipment Found"}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {emptyState?.message || "Try adjusting your filters or search query"}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          categories: [],
                          priceRange: [0, 500],
                          sizes: [],
                          availability: null,
                          rating: 0,
                        });
                      }}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-ctaHover transition-all duration-300"
                    >
                      {emptyState?.clear_button || "Clear All Filters"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShieldCheckIcon" size={32} variant="solid" className="text-primary-foreground" />
                </div>
                <h3 className="font-outfit font-semibold text-xl text-foreground mb-2">
                  {trustSignals?.card_1_title || "Quality Guaranteed"}
                </h3>
                <p className="text-muted-foreground">
                  {trustSignals?.card_1_description || "All equipment is professionally maintained and safety certified"}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserGroupIcon" size={32} variant="solid" className="text-secondary-foreground" />
                </div>
                <h3 className="font-outfit font-semibold text-xl text-foreground mb-2">
                  {trustSignals?.card_2_title || "Expert Fitting"}
                </h3>
                <p className="text-muted-foreground">
                  {trustSignals?.card_2_description || "Professional staff ensures perfect fit for optimal performance"}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-conversionAccent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ClockIcon" size={32} variant="solid" className="text-white" />
                </div>
                <h3 className="font-outfit font-semibold text-xl text-foreground mb-2">
                  {trustSignals?.card_3_title || "Flexible Rentals"}
                </h3>
                <p className="text-muted-foreground">
                  {trustSignals?.card_3_description || "Daily, weekly, and seasonal rental options available"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Equipment Details Modal */}
      <EquipmentDetailsModal
        equipment={selectedEquipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBook}
        pageContent={pageContent}
      />

      {/* Comparison Tool */}
      <ComparisonTool
        comparedItems={comparedItems}
        onRemoveItem={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
        pageContent={pageContent}
      />
    </div>
  );
}
