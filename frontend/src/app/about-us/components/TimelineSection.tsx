import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineSectionProps {
  timelineEvents: TimelineEvent[];
  pageContent?: Record<string, unknown> | null;
}

export default function TimelineSection({ timelineEvents, pageContent }: TimelineSectionProps) {
  const timelineContent = pageContent?.timeline as Record<string, string> | undefined;
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-foreground mb-4">
            {timelineContent?.title || 'Our Journey'}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            {timelineContent?.subtitle || "From humble beginnings to becoming Gudauri\u0027s premier ski equipment provider"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30" />

            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative mb-12 lg:mb-16 ${
                  index % 2 === 0 ? 'lg:pr-1/2 lg:text-right' : 'lg:pl-1/2 lg:ml-auto'
                }`}
              >
                <div className="flex items-start gap-4 lg:gap-8">
                  <div className={`flex-shrink-0 ${index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1'}`}>
                    <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-elevated">
                      <Icon name={event.icon as any} size={28} variant="solid" className="text-primary-foreground" />
                    </div>
                  </div>

                  <div className={`flex-1 ${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2'}`}>
                    <div className="bg-card rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all duration-300">
                      <span className="inline-block font-outfit font-bold text-2xl text-primary mb-2">
                        {event.year}
                      </span>
                      <h3 className="font-outfit font-semibold text-xl text-foreground mb-3">
                        {event.title}
                      </h3>
                      <p className="font-inter text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}