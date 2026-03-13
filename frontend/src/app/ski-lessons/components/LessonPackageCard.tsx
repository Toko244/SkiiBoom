import Icon from '@/components/ui/AppIcon';

interface LessonPackage {
  id: string;
  name: string;
  description: string;
  sessions: number;
  duration: string;
  price: string;
  savings: string;
  features: string[];
  popular: boolean;
}

interface LessonPackageCardProps {
  package: LessonPackage;
  onBook: (packageId: string) => void;
}

const LessonPackageCard = ({ package: pkg, onBook }: LessonPackageCardProps) => {
  return (
    <div className={`relative bg-card rounded-lg p-6 border-2 ${pkg.popular ? 'border-primary shadow-elevated' : 'border-border'} hover:shadow-elevated transition-all duration-300`}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full font-outfit font-bold text-sm">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="font-outfit font-bold text-2xl text-foreground mb-2">
          {pkg.name}
        </h3>
        <p className="font-inter text-muted-foreground mb-4">
          {pkg.description}
        </p>
        
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="font-outfit font-bold text-4xl text-primary">
            {pkg.price}
          </span>
          <span className="font-inter text-sm text-muted-foreground">
            / package
          </span>
        </div>
        
        {pkg.savings && (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full">
            <Icon name="TagIcon" size={16} variant="solid" />
            <span className="font-inter text-sm font-medium">Save {pkg.savings}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="font-inter text-sm text-muted-foreground">Sessions</span>
          <span className="font-outfit font-semibold text-foreground">{pkg.sessions}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-inter text-sm text-muted-foreground">Duration</span>
          <span className="font-outfit font-semibold text-foreground">{pkg.duration}</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-6">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
            <span className="font-inter text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => onBook(pkg.id)}
        className={`w-full px-6 py-3 rounded-md font-outfit font-semibold transition-all duration-300 ${
          pkg.popular
            ? 'bg-conversionAccent text-white hover:bg-ctaHover' :'bg-primary text-primary-foreground hover:bg-ctaHover'
        }`}
      >
        Book Package
      </button>
    </div>
  );
};

export default LessonPackageCard;