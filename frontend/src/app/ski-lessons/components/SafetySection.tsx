import Icon from '@/components/ui/AppIcon';

interface SafetyFeature {
  icon: string;
  title: string;
  description: string;
}

interface SafetySectionProps {
  pageContent?: Record<string, unknown> | null;
}

const SafetySection = ({ pageContent }: SafetySectionProps) => {
  const safety = pageContent?.safety as Record<string, unknown> | undefined;
  const apiFeatures = safety?.features as Array<Record<string, string>> | undefined;

  const defaultFeatures: SafetyFeature[] = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Certified Instructors',
      description: 'All instructors hold international ski instructor certifications and undergo regular safety training'
    },
    {
      icon: 'HeartIcon',
      title: 'First Aid Ready',
      description: 'Every instructor is certified in mountain first aid and emergency response procedures'
    },
    {
      icon: 'UserGroupIcon',
      title: 'Small Group Sizes',
      description: 'Maximum 6 students per group lesson ensures personalized attention and safety monitoring'
    },
    {
      icon: 'ClipboardDocumentCheckIcon',
      title: 'Equipment Checks',
      description: 'Comprehensive safety equipment inspection before every lesson with proper fitting guidance'
    }
  ];

  const safetyFeatures: SafetyFeature[] = apiFeatures
    ? defaultFeatures.map((def, i) => ({
        icon: def.icon,
        title: apiFeatures[i]?.title || def.title,
        description: apiFeatures[i]?.description || def.description,
      }))
    : defaultFeatures;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {(safety?.title as string) || "Your Safety is Our Priority"}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {(safety?.subtitle as string) || "We maintain the highest safety standards to ensure you can focus on learning and enjoying your mountain experience"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 text-center hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={feature.icon as any} size={32} variant="outline" className="text-primary" />
              </div>
              <h3 className="font-outfit font-bold text-xl text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;