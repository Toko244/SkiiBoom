'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface QuickBookingWidgetProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const QuickBookingWidget = ({ currentLanguage, pageContent }: QuickBookingWidgetProps) => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<'equipment' | 'lessons'>('equipment');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
    if (!selectedDate) {
      setSelectedDate(formattedDate);
    }
  }, [selectedDate]);

  const qb = pageContent?.quick_booking as Record<string, string> | undefined;

  const fallback = {
    en: {
      title: "Quick Booking",
      subtitle: "Reserve your equipment or lessons in seconds",
      equipment: "Equipment Rental",
      lessons: "Ski Lessons",
      date: "Select Date",
      duration: "Duration (Days)",
      checkAvailability: "Check Availability",
      bookNow: "Book Now"
    },
    ka: {
      title: "სწრაფი დაჯავშნა",
      subtitle: "დაჯავშნეთ თქვენი აღჭურვილობა ან გაკვეთილები წამებში",
      equipment: "აღჭურვილობის გაქირავება",
      lessons: "სათხილამურო გაკვეთილები",
      date: "აირჩიეთ თარიღი",
      duration: "ხანგრძლივობა (დღეები)",
      checkAvailability: "ხელმისაწვდომობის შემოწმება",
      bookNow: "დაჯავშნა ახლავე"
    },
    ru: {
      title: "Быстрое бронирование",
      subtitle: "Забронируйте снаряжение или уроки за секунды",
      equipment: "Аренда снаряжения",
      lessons: "Уроки катания",
      date: "Выберите дату",
      duration: "Продолжительность (дни)",
      checkAvailability: "Проверить доступность",
      bookNow: "Забронировать сейчас"
    }
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const text = qb ? {
    title: qb.title || staticText.title,
    subtitle: qb.subtitle || staticText.subtitle,
    equipment: qb.equipment || staticText.equipment,
    lessons: qb.lessons || staticText.lessons,
    date: qb.date || staticText.date,
    duration: qb.duration || staticText.duration,
    checkAvailability: qb.check_availability || staticText.checkAvailability,
    bookNow: qb.book_now || staticText.bookNow,
  } : staticText;

  const handleBookNow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      router.push('/book-online');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/book-online';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevated p-6 lg:p-8">
      <h3 className="font-outfit font-bold text-2xl lg:text-3xl text-foreground mb-2">
        {text.title}
      </h3>
      <p className="font-inter text-muted-foreground mb-6">
        {text.subtitle}
      </p>

      {/* Service Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSelectedService('equipment')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-outfit font-semibold transition-all duration-300 ${
            selectedService === 'equipment' ?'bg-primary text-primary-foreground shadow-subtle' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Icon name="CubeIcon" size={20} variant={selectedService === 'equipment' ? 'solid' : 'outline'} />
          {text.equipment}
        </button>
        <button
          onClick={() => setSelectedService('lessons')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-outfit font-semibold transition-all duration-300 ${
            selectedService === 'lessons' ?'bg-primary text-primary-foreground shadow-subtle' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Icon name="AcademicCapIcon" size={20} variant={selectedService === 'lessons' ? 'solid' : 'outline'} />
          {text.lessons}
        </button>
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <label className="block font-inter font-medium text-foreground mb-2">
          {text.date}
        </label>
        <div className="relative">
          <Icon name="CalendarIcon" size={20} variant="outline" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
            className="w-full pl-10 pr-4 py-3 border border-input rounded-md font-inter focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Duration Selection */}
      <div className="mb-6">
        <label className="block font-inter font-medium text-foreground mb-2">
          {text.duration}
        </label>
        <div className="relative">
          <Icon name="ClockIcon" size={20} variant="outline" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-input rounded-md font-inter focus:outline-none focus:ring-2 focus:ring-ring appearance-none bg-white"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <option key={day} value={day}>
                {day} {day === 1 ? 'Day' : 'Days'}
              </option>
            ))}
          </select>
          <Icon name="ChevronDownIcon" size={20} variant="outline" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={selectedService === 'equipment' ? '/equipment-rental' : '/ski-lessons'}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-outfit font-semibold hover:opacity-90 transition-all duration-300"
        >
          <Icon name="MagnifyingGlassIcon" size={20} variant="outline" className="mr-2" />
          {text.checkAvailability}
        </Link>
        <Link
          href="/book-online"
          onClick={handleBookNow}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-conversionAccent text-white rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300 shadow-subtle hover:shadow-elevated transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Icon name="CheckCircleIcon" size={20} variant="solid" className="mr-2" />
          {text.bookNow}
        </Link>
      </div>
    </div>
  );
};

export default QuickBookingWidget;
