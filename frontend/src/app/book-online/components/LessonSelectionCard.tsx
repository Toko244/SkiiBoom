import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Lesson {
  id: number;
  title: string;
  instructor: string;
  level: string;
  duration: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  available: boolean;
}

interface LessonSelectionCardProps {
  lesson: Lesson;
  isSelected: boolean;
  onSelect: () => void;
  pageContent?: Record<string, unknown> | null;
}

export default function LessonSelectionCard({
  lesson,
  isSelected,
  onSelect,
  pageContent,
}: LessonSelectionCardProps) {
  const step1 = pageContent?.step_1 as Record<string, string> | undefined;
  return (
    <div
      className={`bg-card rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 border-2 ${
        isSelected ? 'border-secondary' : 'border-transparent'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={lesson.image}
          alt={lesson.alt}
          className="w-full h-full object-cover"
        />
        {!lesson.available && (
          <div className="absolute inset-0 bg-foreground bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-outfit font-semibold text-lg">{step1?.fully_booked || 'Fully Booked'}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-outfit font-semibold text-lg text-foreground mb-1">
              {lesson.title}
            </h3>
            <p className="text-xs text-muted-foreground font-inter mb-1">
              {step1?.instructor || 'Instructor'}: {lesson.instructor}
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground font-inter">
              <span className="px-2 py-1 bg-muted rounded">{lesson.level}</span>
              <span className="flex items-center">
                <Icon name="ClockIcon" size={14} variant="outline" className="mr-1" />
                {lesson.duration}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-outfit font-bold text-xl text-secondary">₾{lesson.price}</p>
            <p className="text-xs text-muted-foreground font-inter">{step1?.per_session || 'per session'}</p>
          </div>
        </div>
        <p className="text-sm text-foreground font-inter mb-4 line-clamp-2">
          {lesson.description}
        </p>
        {lesson.available && (
          <button
            onClick={onSelect}
            className={`w-full py-2 px-4 rounded-md font-outfit font-semibold text-sm transition-all duration-300 ${
              isSelected
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted text-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            {isSelected ? (step1?.selected || 'Selected') : (step1?.select_lesson || 'Select Lesson')}
          </button>
        )}
      </div>
    </div>
  );
}