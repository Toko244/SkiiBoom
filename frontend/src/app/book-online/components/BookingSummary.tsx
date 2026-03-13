import Icon from '@/components/ui/AppIcon';

interface SelectedEquipment {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface SelectedLesson {
  id: number;
  title: string;
  price: number;
}

interface BookingSummaryProps {
  selectedEquipment: SelectedEquipment[];
  selectedLesson: SelectedLesson | null;
  startDate: string;
  endDate: string;
  currency: string;
  exchangeRates: { [key: string]: number };
  pageContent?: Record<string, unknown> | null;
}

export default function BookingSummary({
  selectedEquipment,
  selectedLesson,
  startDate,
  endDate,
  currency,
  exchangeRates,
  pageContent,
}: BookingSummaryProps) {
  const summary = pageContent?.summary as Record<string, string> | undefined;
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const days = calculateDays();

  const equipmentTotal = selectedEquipment.reduce(
    (sum, item) => sum + item.price * item.quantity * days,
    0
  );

  const lessonTotal = selectedLesson ? selectedLesson.price : 0;
  const subtotal = equipmentTotal + lessonTotal;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const convertCurrency = (amount: number) => {
    return (amount * exchangeRates[currency]).toFixed(2);
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GEL':
        return '₾';
      case 'EUR':
        return '€';
      case 'USD':
        return '$';
      default:
        return '₾';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevated p-6 sticky top-24">
      <h3 className="font-outfit font-bold text-xl text-foreground mb-4 flex items-center">
        <Icon name="ShoppingCartIcon" size={24} variant="outline" className="mr-2" />
        {summary?.title || 'Booking Summary'}
      </h3>

      {selectedEquipment.length === 0 && !selectedLesson && (
        <p className="text-muted-foreground font-inter text-sm text-center py-8">
          {summary?.empty || 'No items selected yet'}
        </p>
      )}

      {selectedEquipment.length > 0 && (
        <div className="mb-4">
          <h4 className="font-outfit font-semibold text-sm text-foreground mb-2">
            {summary?.equipment_label || 'Equipment Rentals'} ({days} {days === 1 ? 'day' : 'days'})
          </h4>
          {selectedEquipment.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-border">
              <div className="flex-1">
                <p className="font-inter text-sm text-foreground">{item.name}</p>
                <p className="font-inter text-xs text-muted-foreground">
                  Qty: {item.quantity} × {days} {days === 1 ? 'day' : 'days'}
                </p>
              </div>
              <p className="font-outfit font-semibold text-sm text-foreground">
                {getCurrencySymbol()}
                {convertCurrency(item.price * item.quantity * days)}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedLesson && (
        <div className="mb-4">
          <h4 className="font-outfit font-semibold text-sm text-foreground mb-2">{summary?.lesson_label || 'Ski Lesson'}</h4>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <p className="font-inter text-sm text-foreground flex-1">{selectedLesson.title}</p>
            <p className="font-outfit font-semibold text-sm text-foreground">
              {getCurrencySymbol()}
              {convertCurrency(selectedLesson.price)}
            </p>
          </div>
        </div>
      )}

      {(selectedEquipment.length > 0 || selectedLesson) && (
        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <p className="font-inter text-sm text-muted-foreground">{summary?.subtotal || 'Subtotal'}</p>
            <p className="font-outfit font-semibold text-sm text-foreground">
              {getCurrencySymbol()}
              {convertCurrency(subtotal)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-inter text-sm text-muted-foreground">{summary?.tax || 'Tax (18%)'}</p>
            <p className="font-outfit font-semibold text-sm text-foreground">
              {getCurrencySymbol()}
              {convertCurrency(tax)}
            </p>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <p className="font-outfit font-bold text-lg text-foreground">{summary?.total || 'Total'}</p>
            <p className="font-outfit font-bold text-xl text-primary">
              {getCurrencySymbol()}
              {convertCurrency(total)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}