'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useApi } from '@/hooks/useApi';
import { getGalleryPhotos } from '@/services/galleryService';
import type { GalleryPhoto } from '@/lib/api/types';

interface GalleryPreviewProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const GalleryPreview = ({ currentLanguage, pageContent }: GalleryPreviewProps) => {
  const { data: galleryData, loading, error } = useApi(
    (signal) => getGalleryPhotos({ per_page: 6 }, signal),
    []
  );

  const gp = pageContent?.gallery_preview as Record<string, string> | undefined;

  const fallback = {
    en: { title: "Capture the Moment", subtitle: "See the adventures and memories created at Ski Boom Gudauri", viewFullGallery: "View Full Gallery", equipment: "Equipment", action: "Action", scenery: "Scenery", lessons: "Lessons" },
    ka: { title: "დაიჭირეთ მომენტი", subtitle: "იხილეთ თავგადასავლები და მოგონებები, შექმნილი Ski Boom Gudauri-ში", viewFullGallery: "სრული გალერეის ნახვა", equipment: "აღჭურვილობა", action: "მოქმედება", scenery: "პეიზაჟი", lessons: "გაკვეთილები" },
    ru: { title: "Запечатлейте момент", subtitle: "Посмотрите приключения и воспоминания, созданные в Ski Boom Gudauri", viewFullGallery: "Посмотреть полную галерею", equipment: "Снаряжение", action: "Действие", scenery: "Пейзаж", lessons: "Уроки" },
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const text = gp ? {
    title: gp.title || staticText.title,
    subtitle: gp.subtitle || staticText.subtitle,
    viewFullGallery: gp.view_full_gallery || staticText.viewFullGallery,
    equipment: gp.category_equipment || staticText.equipment,
    action: gp.category_action || staticText.action,
    scenery: gp.category_scenery || staticText.scenery,
    lessons: gp.category_lessons || staticText.lessons,
  } : staticText;

  const categoryLabels: Record<string, string> = {
    equipment: text.equipment,
    action: text.action,
    scenery: text.scenery,
    lessons: text.lessons,
  };

  const photos = galleryData?.data || [];

  // Fallback static images when API has no gallery photos
  const fallbackImages = [
    { id: 1, image: "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg", alt: "Professional skier carving down snowy slope", category: "action" },
    { id: 2, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256", alt: "Snow-covered Caucasus mountain peaks", category: "scenery" },
    { id: 3, image: "https://images.pixabay.com/photo/2016/01/19/17/41/skiing-1149877_1280.jpg", alt: "Modern ski equipment on white snow", category: "equipment" },
    { id: 4, image: "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg", alt: "Ski instructor teaching child", category: "lessons" },
    { id: 5, image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766", alt: "Group of skiers on mountain peak", category: "action" },
    { id: 6, image: "https://images.pixabay.com/photo/2017/02/08/17/24/snowboard-2049520_1280.jpg", alt: "Snowboarder mid-jump", category: "action" },
  ];

  const displayImages = photos.length > 0
    ? photos.map((p: GalleryPhoto) => ({ id: p.id, image: p.image, alt: p.alt, category: p.category }))
    : fallbackImages;

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">{text.title}</h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {text.title}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {displayImages.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <AppImage
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full font-inter text-xs font-semibold">
                    {categoryLabels[item.category] || item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center px-8 py-3 bg-conversionAccent text-white rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300 shadow-subtle hover:shadow-elevated transform hover:-translate-y-0.5"
          >
            <Icon name="PhotoIcon" size={20} variant="outline" className="mr-2" />
            {text.viewFullGallery}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
