'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  pageContent?: Record<string, unknown> | null;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  pageContent,
}: DateRangePickerProps) {
  const step2 = pageContent?.step_2 as Record<string, string> | undefined;
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-card rounded-lg p-4 shadow-subtle">
        <label className="flex items-center text-sm font-outfit font-semibold text-foreground mb-2">
          <Icon name="CalendarIcon" size={18} variant="outline" className="mr-2" />
          {step2?.start_date_label || 'Start Date'}
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          min={minDate}
          className="w-full px-4 py-2 border border-input rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="bg-card rounded-lg p-4 shadow-subtle">
        <label className="flex items-center text-sm font-outfit font-semibold text-foreground mb-2">
          <Icon name="CalendarIcon" size={18} variant="outline" className="mr-2" />
          {step2?.end_date_label || 'End Date'}
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={startDate || minDate}
          className="w-full px-4 py-2 border border-input rounded-md font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}