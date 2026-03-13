'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ComparisonToolProps {
  comparedItems: Array<{
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    alt: string;
    rating: number;
    features: string[];
    specifications: { label: string; value: string }[];
  }>;
  onRemoveItem: (id: number) => void;
  onClearAll: () => void;
  pageContent?: Record<string, unknown> | null;
}

export default function ComparisonTool({ comparedItems, onRemoveItem, onClearAll, pageContent }: ComparisonToolProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const comparison = pageContent?.comparison as Record<string, string> | undefined;
  const labels = pageContent?.labels as Record<string, string> | undefined;

  if (comparedItems.length === 0) return null;

  return (
    <>
      {/* Floating Comparison Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-300"
              >
                <Icon
                  name={isExpanded ? 'ChevronDownIcon' : 'ChevronUpIcon'}
                  size={20}
                  variant="outline"
                />
                <span className="font-semibold">
                  {comparison?.compare_label || "Compare"} ({comparedItems.length})
                </span>
              </button>
              
              <div className="flex items-center space-x-2">
                {comparedItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="relative w-12 h-12 rounded-md overflow-hidden border border-border">
                    <AppImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {comparedItems.length > 3 && (
                  <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    +{comparedItems.length - 3}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClearAll}
                className="px-4 py-2 text-sm text-error hover:bg-error hover:text-error-foreground rounded-md transition-all duration-300"
              >
                {comparison?.clear_all || "Clear All"}
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-ctaHover transition-all duration-300"
              >
                {comparison?.compare_now || "Compare Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Comparison View */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto">
          <div className="min-h-screen py-8 px-4">
            <div className="container mx-auto">
              <div className="bg-card rounded-lg shadow-elevated">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="font-outfit font-bold text-2xl text-foreground">
                    {comparison?.title || "Equipment Comparison"}
                  </h2>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-muted rounded-md transition-colors duration-300"
                    aria-label="Close comparison"
                  >
                    <Icon name="XMarkIcon" size={24} variant="outline" />
                  </button>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="p-4 text-left font-outfit font-semibold text-foreground w-48">
                          Feature
                        </th>
                        {comparedItems.map((item) => (
                          <th key={item.id} className="p-4 text-center min-w-64">
                            <div className="space-y-3">
                              <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
                                <AppImage
                                  src={item.image}
                                  alt={item.alt}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-error hover:text-error-foreground transition-all duration-300"
                                  aria-label="Remove from comparison"
                                >
                                  <Icon name="XMarkIcon" size={16} variant="outline" />
                                </button>
                              </div>
                              <div>
                                <p className="text-xs text-secondary uppercase tracking-wide mb-1">
                                  {item.category}
                                </p>
                                <h3 className="font-outfit font-semibold text-lg text-foreground">
                                  {item.name}
                                </h3>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price */}
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="p-4 font-medium text-foreground">Price</td>
                        {comparedItems.map((item) => (
                          <td key={item.id} className="p-4 text-center">
                            <p className="text-2xl font-outfit font-bold text-foreground">
                              ₾{item.price}
                            </p>
                            <p className="text-xs text-muted-foreground">{labels?.per_day || "per day"}</p>
                          </td>
                        ))}
                      </tr>

                      {/* Rating */}
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="p-4 font-medium text-foreground">Rating</td>
                        {comparedItems.map((item) => (
                          <td key={item.id} className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                  <Icon
                                    key={index}
                                    name="StarIcon"
                                    size={16}
                                    variant={index < Math.floor(item.rating) ? 'solid' : 'outline'}
                                    className={index < Math.floor(item.rating) ? 'text-primary' : 'text-muted-foreground'}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-semibold text-foreground">
                                {item.rating}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Specifications */}
                      {comparedItems[0]?.specifications.map((spec, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted">
                          <td className="p-4 font-medium text-foreground">{spec.label}</td>
                          {comparedItems.map((item) => (
                            <td key={item.id} className="p-4 text-center text-foreground">
                              {item.specifications[index]?.value || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}

                      {/* Features */}
                      <tr className="border-b border-border hover:bg-muted">
                        <td className="p-4 font-medium text-foreground">Features</td>
                        {comparedItems.map((item) => (
                          <td key={item.id} className="p-4">
                            <div className="space-y-2">
                              {item.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center justify-center space-x-2">
                                  <Icon name="CheckCircleIcon" size={14} variant="solid" className="text-success" />
                                  <span className="text-sm text-foreground">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      onClick={onClearAll}
                      className="px-6 py-2 text-error hover:bg-error hover:text-error-foreground rounded-md transition-all duration-300"
                    >
                      {comparison?.clear_all || "Clear All"}
                    </button>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-ctaHover transition-all duration-300"
                    >
                      {comparison?.close || "Close Comparison"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}