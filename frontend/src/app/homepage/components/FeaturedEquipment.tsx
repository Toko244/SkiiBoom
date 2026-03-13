'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useFeaturedEquipment } from '@/hooks/useEquipment';
import type { Equipment } from '@/lib/api/types';

interface FeaturedEquipmentProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const FeaturedEquipment = ({ currentLanguage, pageContent }: FeaturedEquipmentProps) => {
  const { data: equipment, loading, error } = useFeaturedEquipment();

  const fe = pageContent?.featured_equipment as Record<string, string> | undefined;

  const fallback = {
    en: { title: "Premium Equipment Collection", subtitle: "Top-quality gear for every skill level", viewAll: "View All Equipment", perDay: "per day", features: "Features" },
    ka: { title: "პრემიუმ აღჭურვილობის კოლექცია", subtitle: "უმაღლესი ხარისხის აღჭურვილობა ყველა დონისთვის", viewAll: "ყველა აღჭურვილობის ნახვა", perDay: "დღეში", features: "მახასიათებლები" },
    ru: { title: "Коллекция премиального снаряжения", subtitle: "Высококачественное снаряжение для любого уровня", viewAll: "Посмотреть все снаряжение", perDay: "в день", features: "Характеристики" },
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const text = fe ? {
    title: fe.title || staticText.title,
    subtitle: fe.subtitle || staticText.subtitle,
    viewAll: fe.view_all || staticText.viewAll,
    perDay: fe.per_day || staticText.perDay,
    features: fe.features_label || staticText.features,
  } : staticText;

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">{text.title}</h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-subtle animate-pulse">
                <div className="h-64 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-8 bg-muted rounded w-1/3" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-4/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !equipment || equipment.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {text.title}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {equipment.map((item: Equipment) => (
            <div
              key={item.id}
              className="bg-card rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <AppImage
                  src={item.image || ''}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-outfit font-semibold text-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-outfit font-bold text-xl text-foreground mb-2">
                  {item.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="font-outfit font-bold text-2xl text-conversionAccent">
                    ₾{item.price}
                  </span>
                  <span className="font-inter text-sm text-muted-foreground ml-2">
                    {text.perDay}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="font-inter font-medium text-sm text-foreground mb-2">
                    {text.features}:
                  </p>
                  <ul className="space-y-1">
                    {item.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <Icon name="CheckIcon" size={16} variant="solid" className="text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/equipment-rental"
            className="inline-flex items-center px-8 py-3 bg-secondary text-secondary-foreground rounded-md font-outfit font-semibold hover:opacity-90 transition-all duration-300"
          >
            {text.viewAll}
            <Icon name="ArrowRightIcon" size={20} variant="outline" className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEquipment;
