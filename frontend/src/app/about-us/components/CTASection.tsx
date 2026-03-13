import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  pageContent?: Record<string, unknown> | null;
}

export default function CTASection({ pageContent }: CTASectionProps) {
  const ctaContent = pageContent?.cta as Record<string, string> | undefined;
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-white mb-6">
            {ctaContent?.title || 'Ready to Experience Gudauri with Us?'}
          </h2>
          <p className="font-inter text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
            {ctaContent?.subtitle || 'Join thousands of satisfied skiers who trust Ski Boom Gudauri for their mountain adventures. Book your equipment and lessons today!'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-online"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground rounded-lg font-outfit font-semibold text-lg hover:bg-background transition-all duration-300 shadow-elevated hover:shadow-elevated transform hover:-translate-y-1"
            >
              <Icon name="CalendarIcon" size={24} variant="solid" />
              {ctaContent?.button1 || 'Book Online Now'}
            </Link>

            <Link
              href="/equipment-rental"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-outfit font-semibold text-lg hover:bg-white hover:text-foreground transition-all duration-300 transform hover:-translate-y-1"
            >
              <Icon name="CubeIcon" size={24} variant="outline" />
              {ctaContent?.button2 || 'View Equipment'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}