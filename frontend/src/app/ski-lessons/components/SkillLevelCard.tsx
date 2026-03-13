import Icon from '@/components/ui/AppIcon';

interface SkillLevel {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  price: string;
  features: string[];
  color: string;
}

interface SkillLevelCardProps {
  level: SkillLevel;
  onSelect: (levelId: string) => void;
}

const SkillLevelCard = ({ level, onSelect }: SkillLevelCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-elevated">
      <div className={`w-16 h-16 rounded-full ${level.color} flex items-center justify-center mb-4`}>
        <Icon name={level.icon as any} size={32} variant="outline" className="text-white" />
      </div>
      
      <h3 className="font-outfit font-bold text-2xl text-foreground mb-2">
        {level.title}
      </h3>
      
      <p className="font-inter text-muted-foreground mb-4 min-h-[48px]">
        {level.description}
      </p>
      
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="ClockIcon" size={20} variant="outline" className="text-secondary" />
          <span className="font-inter text-sm text-foreground">{level.duration}</span>
        </div>
        <div className="font-outfit font-bold text-xl text-primary">
          {level.price}
        </div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {level.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
            <span className="font-inter text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => onSelect(level.id)}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300"
      >
        Select Level
      </button>
    </div>
  );
};

export default SkillLevelCard;