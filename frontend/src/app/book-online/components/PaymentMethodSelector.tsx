'use client';

import Icon from '@/components/ui/AppIcon';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCardIcon',
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'CurrencyDollarIcon',
      description: 'Pay securely with your PayPal account',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'BuildingLibraryIcon',
      description: 'Direct bank transfer (confirmation required)',
    },
    {
      id: 'cash',
      name: 'Pay on Arrival',
      icon: 'BanknotesIcon',
      description: 'Pay in cash when you arrive',
    },
  ];

  return (
    <div className="bg-card rounded-lg shadow-subtle p-6">
      <h3 className="font-outfit font-bold text-xl text-foreground mb-6 flex items-center">
        <Icon name="CreditCardIcon" size={24} variant="outline" className="mr-2" />
        Payment Method
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              selectedMethod === method.id
                ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary hover:bg-muted'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <Icon name={method.icon as any} size={20} variant="outline" />
              </div>
              <div className="flex-1">
                <h4 className="font-outfit font-semibold text-foreground mb-1">{method.name}</h4>
                <p className="text-xs text-muted-foreground font-inter">{method.description}</p>
              </div>
              {selectedMethod === method.id && (
                <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm font-inter text-foreground mb-4">
            <Icon name="ShieldCheckIcon" size={16} variant="outline" className="inline mr-2" />
            Your payment information is encrypted and secure
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-2 border border-input rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-input rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full px-4 py-2 border border-input rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}