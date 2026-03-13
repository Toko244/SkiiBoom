import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Instructor {
  id: string;
  name: string;
  image: string;
  alt: string;
  specialization: string;
  experience: string;
  languages: string[];
  rating: number;
  totalLessons: number;
  certifications: string[];
}

interface InstructorCardProps {
  instructor: Instructor;
  onViewProfile: (instructorId: string) => void;
}

const InstructorCard = ({ instructor, onViewProfile }: InstructorCardProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-elevated transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={instructor.image}
          alt={instructor.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Icon name="StarIcon" size={16} variant="solid" className="text-primary" />
          <span className="font-outfit font-bold text-sm text-foreground">{instructor.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-outfit font-bold text-xl text-foreground mb-1">
          {instructor.name}
        </h3>
        <p className="font-inter text-sm text-secondary mb-4">
          {instructor.specialization}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="AcademicCapIcon" size={18} variant="outline" className="text-muted-foreground" />
            <span className="font-inter text-sm text-foreground">{instructor.experience}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="ChatBubbleLeftRightIcon" size={18} variant="outline" className="text-muted-foreground" />
            <span className="font-inter text-sm text-foreground">{instructor.languages.join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="UserGroupIcon" size={18} variant="outline" className="text-muted-foreground" />
            <span className="font-inter text-sm text-foreground">{instructor.totalLessons}+ lessons taught</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {instructor.certifications.map((cert, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full font-inter text-xs font-medium"
            >
              {cert}
            </span>
          ))}
        </div>
        
        <button
          onClick={() => onViewProfile(instructor.id)}
          className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-outfit font-semibold hover:bg-secondary/90 transition-all duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default InstructorCard;