import AppImage from '@/components/ui/AppImage';

interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  category: string;
}

interface PartnershipsSectionProps {
  partners: Partner[];
  pageContent?: Record<string, unknown> | null;
}

export default function PartnershipsSection({ partners, pageContent }: PartnershipsSectionProps) {
  const partnersContent = pageContent?.partners as Record<string, string> | undefined;
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-foreground mb-4">
            {partnersContent?.title || 'Trusted Partnerships'}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            {partnersContent?.subtitle || 'Collaborating with leading organizations to deliver exceptional mountain experiences'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-lg hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-24 h-24 mb-3">
                <AppImage
                  src={partner.logo}
                  alt={partner.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-inter text-xs text-muted-foreground text-center">
                {partner.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}