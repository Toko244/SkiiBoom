'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useFaqs } from '@/hooks/useContent';
import type { FAQ } from '@/lib/api/types';

interface FAQSectionProps {
  pageContent?: Record<string, unknown> | null;
}

const FAQSection = ({ pageContent }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data: faqs, loading, error } = useFaqs();
  const faqContent = pageContent?.faq as Record<string, string> | undefined;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
              {faqContent?.title || "Frequently Asked Questions"}
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              {faqContent?.subtitle || "Everything you need to know about our ski lessons"}
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {faqContent?.title || "Frequently Asked Questions"}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {faqContent?.subtitle || "Everything you need to know about our ski lessons"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq: FAQ, index: number) => (
            <div
              key={faq.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-subtle transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-300"
              >
                <span className="font-outfit font-semibold text-lg text-foreground pr-4">
                  {faq.question}
                </span>
                <Icon
                  name="ChevronDownIcon"
                  size={24}
                  variant="outline"
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
