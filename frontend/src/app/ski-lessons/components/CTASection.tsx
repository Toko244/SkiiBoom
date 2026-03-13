import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  pageContent?: Record<string, unknown> | null;
}

const CTASection = ({ pageContent }: CTASectionProps) => {
  const cta = pageContent?.cta as Record<string, unknown> | undefined;
  const trustBadges = cta?.trust_badges as string[] | undefined;
  const defaultBadges = ["Certified Instructors", "Small Groups", "Multilingual Support"];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-white mb-4">
            {(cta?.title as string) || "Ready to Start Your Mountain Journey?"}
          </h2>
          <p className="font-inter text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {(cta?.description as string) || "Book your lesson today and experience the thrill of skiing with Gudauri's finest instructors. Local expertise, international standards."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book-online"
              className="px-8 py-4 bg-conversionAccent text-white rounded-md font-outfit font-semibold text-lg hover:bg-ctaHover transition-all duration-300 shadow-elevated inline-flex items-center gap-2"
            >
              <Icon name="CalendarIcon" size={24} variant="outline" />
              {(cta?.button1 as string) || "Book Your Lesson Now"}
            </Link>

            <Link
              href="/equipment-rental"
              className="px-8 py-4 bg-white text-foreground rounded-md font-outfit font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Icon name="CubeIcon" size={24} variant="outline" />
              {(cta?.button2 as string) || "Browse Equipment"}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Icon name="CheckBadgeIcon" size={20} variant="solid" />
              <span className="font-inter text-sm">{(trustBadges || defaultBadges)[0] || "Certified Instructors"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="UserGroupIcon" size={20} variant="solid" />
              <span className="font-inter text-sm">{(trustBadges || defaultBadges)[1] || "Small Groups"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="LanguageIcon" size={20} variant="solid" />
              <span className="font-inter text-sm">{(trustBadges || defaultBadges)[2] || "Multilingual Support"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;