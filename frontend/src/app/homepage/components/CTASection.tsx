import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const CTASection = ({ currentLanguage, pageContent }: CTASectionProps) => {
  const cta = pageContent?.cta as Record<string, string> | undefined;

  const fallback = {
    en: { title: "Ready for Your Mountain Adventure?", subtitle: "Book your equipment and lessons today for an unforgettable experience on Gudauri's slopes", bookEquipment: "Book Equipment", bookLessons: "Book Lessons", contactUs: "Contact Us" },
    ka: { title: "მზად ხართ თქვენი მთის თავგადასავლისთვის?", subtitle: "დაჯავშნეთ თქვენი აღჭურვილობა და გაკვეთილები დღეს დაუვიწყარი გამოცდილებისთვის გუდაურის ფერდობებზე", bookEquipment: "აღჭურვილობის დაჯავშნა", bookLessons: "გაკვეთილების დაჯავშნა", contactUs: "დაგვიკავშირდით" },
    ru: { title: "Готовы к горному приключению?", subtitle: "Забронируйте снаряжение и уроки сегодня для незабываемого опыта на склонах Гудаури", bookEquipment: "Забронировать снаряжение", bookLessons: "Забронировать уроки", contactUs: "Связаться с нами" },
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const text = cta ? {
    title: cta.title || staticText.title,
    subtitle: cta.subtitle || staticText.subtitle,
    bookEquipment: cta.book_equipment || staticText.bookEquipment,
    bookLessons: cta.book_lessons || staticText.bookLessons,
    contactUs: cta.contact_us || staticText.contactUs,
  } : staticText;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-white mb-6">
            {text.title}
          </h2>
          <p className="font-inter text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {text.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/equipment-rental"
              className="inline-flex items-center px-8 py-4 bg-white text-foreground rounded-md font-outfit font-semibold text-lg hover:bg-background transition-all duration-300 shadow-elevated hover:shadow-elevated-hover transform hover:-translate-y-1"
            >
              <Icon name="CubeIcon" size={24} variant="solid" className="mr-2" />
              {text.bookEquipment}
            </Link>
            <Link
              href="/ski-lessons"
              className="inline-flex items-center px-8 py-4 bg-conversionAccent text-white rounded-md font-outfit font-semibold text-lg hover:bg-ctaHover transition-all duration-300 shadow-elevated hover:shadow-elevated-hover transform hover:-translate-y-1"
            >
              <Icon name="AcademicCapIcon" size={24} variant="solid" className="mr-2" />
              {text.bookLessons}
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-md font-outfit font-semibold text-lg hover:bg-white hover:text-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={24} variant="outline" className="mr-2" />
              {text.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
