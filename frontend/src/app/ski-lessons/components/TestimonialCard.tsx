import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: string;
  name: string;
  image: string;
  alt: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
  lessonType: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={testimonial.image}
            alt={testimonial.alt}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-outfit font-bold text-lg text-foreground">
            {testimonial.name}
          </h4>
          <p className="font-inter text-sm text-muted-foreground mb-2">
            {testimonial.country}
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={16}
                variant="solid"
                className={index < testimonial.rating ? 'text-primary' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
        
        <span className="font-inter text-xs text-muted-foreground">
          {testimonial.date}
        </span>
      </div>
      
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full font-inter text-xs font-medium">
          {testimonial.lessonType}
        </span>
      </div>
      
      <p className="font-inter text-sm text-foreground leading-relaxed">
        {testimonial.comment}
      </p>
    </div>
  );
};

export default TestimonialCard;