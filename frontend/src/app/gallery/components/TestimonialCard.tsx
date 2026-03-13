import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    avatar: string;
    avatarAlt: string;
    country: string;
    rating: number;
    date: string;
    text: string;
    platform: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const platformIcons: { [key: string]: string } = {
    Google: 'MagnifyingGlassIcon',
    Facebook: 'UserGroupIcon',
    TripAdvisor: 'MapPinIcon',
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <AppImage
              src={testimonial.avatar}
              alt={testimonial.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-outfit font-semibold text-foreground text-base">
              {testimonial.name}
            </h3>
            <p className="font-inter text-muted-foreground text-sm">
              {testimonial.country}
            </p>
          </div>
        </div>
        
        {/* Platform Badge */}
        <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full">
          <Icon name={platformIcons[testimonial.platform] as any} size={14} variant="outline" />
          <span className="font-inter text-muted-foreground text-xs">
            {testimonial.platform}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            size={16}
            variant={index < testimonial.rating ? 'solid' : 'outline'}
            className={index < testimonial.rating ? 'text-primary' : 'text-muted-foreground'}
          />
        ))}
        <span className="font-inter text-muted-foreground text-sm ml-2">
          {testimonial.date}
        </span>
      </div>

      {/* Review Text */}
      <p className="font-inter text-foreground text-sm leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  );
};

export default TestimonialCard;