'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  numberOfDays: number;
  message: string;
}

interface CustomerDetailsFormProps {
  details: CustomerDetails;
  onDetailsChange: (details: CustomerDetails) => void;
  pageContent?: Record<string, unknown> | null;
}

export default function CustomerDetailsForm({
  details,
  onDetailsChange,
  pageContent,
}: CustomerDetailsFormProps) {
  const step3 = pageContent?.step_3 as Record<string, string> | undefined;
  const validation = pageContent?.validation as Record<string, string> | undefined;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string | number) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName': case'lastName':
        if (typeof value === 'string' && value.trim().length < 2) {
          newErrors[name] = validation?.name_min || 'Must be at least 2 characters';
        } else {
          delete newErrors[name];
        }
        break;
      case 'arrivalDate':
        if (!value) {
          newErrors.arrivalDate = validation?.arrival_required || 'Please select arrival date';
        } else {
          delete newErrors.arrivalDate;
        }
        break;
      case 'numberOfDays':
        if (typeof value === 'number' && value < 1) {
          newErrors.numberOfDays = validation?.days_min || 'Must be at least 1 day';
        } else {
          delete newErrors.numberOfDays;
        }
        break;
      case 'email':
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'message':
        if (typeof value === 'string' && value.trim().length < 10) {
          newErrors.message = validation?.message_min || 'Please provide more details (at least 10 characters)';
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'numberOfDays' ? parseInt(value) || 1 : value;
    onDetailsChange({ ...details, [name]: processedValue });
    validateField(name, processedValue);
  };

  return (
    <div className="bg-card rounded-lg shadow-subtle p-6">
      <h3 className="font-outfit font-bold text-xl text-foreground mb-6 flex items-center">
        <Icon name="UserIcon" size={24} variant="outline" className="mr-2" />
        {step3?.title || 'Customer Details'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
            {step3?.first_name_label || 'First Name'} *
          </label>
          <input
            type="text"
            name="firstName"
            value={details.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.firstName ? 'border-error' : 'border-input'
            }`}
            placeholder={step3?.first_name_placeholder || 'Enter your first name'}
          />
          {errors.firstName && (
            <p className="text-error text-xs font-inter mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
            {step3?.last_name_label || 'Last Name'} *
          </label>
          <input
            type="text"
            name="lastName"
            value={details.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.lastName ? 'border-error' : 'border-input'
            }`}
            placeholder={step3?.last_name_placeholder || 'Enter your last name'}
          />
          {errors.lastName && (
            <p className="text-error text-xs font-inter mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.email ? 'border-error' : 'border-input'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-error text-xs font-inter mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-input rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="+995 XXX XXX XXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
            {step3?.arrival_date_label || 'Date of Arrival'} *
          </label>
          <input
            type="date"
            name="arrivalDate"
            value={details.arrivalDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-2 border rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.arrivalDate ? 'border-error' : 'border-input'
            }`}
          />
          {errors.arrivalDate && (
            <p className="text-error text-xs font-inter mt-1">{errors.arrivalDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
            {step3?.days_label || 'How Many Days'} *
          </label>
          <input
            type="number"
            name="numberOfDays"
            value={details.numberOfDays}
            onChange={handleChange}
            min="1"
            max="30"
            className={`w-full px-4 py-2 border rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.numberOfDays ? 'border-error' : 'border-input'
            }`}
            placeholder={step3?.days_placeholder || 'Number of days'}
          />
          {errors.numberOfDays && (
            <p className="text-error text-xs font-inter mt-1">{errors.numberOfDays}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-outfit font-semibold text-foreground mb-2">
          {step3?.message_label || 'Message / Special Requests'} *
        </label>
        <textarea
          name="message"
          value={details.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-2 border rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
            errors.message ? 'border-error' : 'border-input'
          }`}
          placeholder={step3?.message_placeholder || 'Please provide details about your booking requirements, special requests, or any questions you have...'}
        />
        {errors.message && (
          <p className="text-error text-xs font-inter mt-1">{errors.message}</p>
        )}
      </div>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground font-inter flex items-start">
          <Icon name="InformationCircleIcon" size={16} variant="outline" className="mr-2 mt-0.5 flex-shrink-0" />
          {step3?.info_text || 'Your booking details will be sent to our team. We\'ll contact you shortly to confirm availability and payment details.'}
        </p>
      </div>
    </div>
  );
}