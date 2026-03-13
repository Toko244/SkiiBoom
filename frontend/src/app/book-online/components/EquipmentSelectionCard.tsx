import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Equipment {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  available: boolean;
}

interface EquipmentSelectionCardProps {
  equipment: Equipment;
  isSelected: boolean;
  onSelect: () => void;
  quantity: number;
  onQuantityChange: (change: number) => void;
  pageContent?: Record<string, unknown> | null;
}

export default function EquipmentSelectionCard({
  equipment,
  isSelected,
  onSelect,
  quantity,
  onQuantityChange,
  pageContent,
}: EquipmentSelectionCardProps) {
  const step1 = pageContent?.step_1 as Record<string, string> | undefined;
  return (
    <div
      className={`bg-card rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={equipment.image}
          alt={equipment.alt}
          className="w-full h-full object-cover"
        />
        {!equipment.available && (
          <div className="absolute inset-0 bg-foreground bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-outfit font-semibold text-lg">{step1?.unavailable || 'Unavailable'}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-outfit font-semibold text-lg text-foreground mb-1">
              {equipment.name}
            </h3>
            <p className="text-xs text-muted-foreground font-inter">{equipment.category}</p>
          </div>
          <div className="text-right">
            <p className="font-outfit font-bold text-xl text-primary">₾{equipment.price}</p>
            <p className="text-xs text-muted-foreground font-inter">{step1?.per_day || 'per day'}</p>
          </div>
        </div>
        <p className="text-sm text-foreground font-inter mb-4 line-clamp-2">
          {equipment.description}
        </p>
        {equipment.available && (
          <div className="flex items-center justify-between">
            <button
              onClick={onSelect}
              className={`flex-1 py-2 px-4 rounded-md font-outfit font-semibold text-sm transition-all duration-300 ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {isSelected ? (step1?.selected || 'Selected') : (step1?.select || 'Select')}
            </button>
            {isSelected && (
              <div className="flex items-center ml-3 space-x-2">
                <button
                  onClick={() => onQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="MinusIcon" size={16} variant="outline" />
                </button>
                <span className="font-outfit font-semibold text-foreground w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => onQuantityChange(1)}
                  className="w-8 h-8 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
                >
                  <Icon name="PlusIcon" size={16} variant="outline" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}