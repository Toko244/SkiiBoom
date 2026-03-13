'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import BookingStepIndicator from './BookingStepIndicator';
import EquipmentSelectionCard from './EquipmentSelectionCard';
import LessonSelectionCard from './LessonSelectionCard';
import DateRangePicker from './DateRangePicker';
import BookingSummary from './BookingSummary';
import CustomerDetailsForm from './CustomerDetailsForm';
import BookingConfirmation from './BookingConfirmation';
import { useEquipment } from '@/hooks/useEquipment';
import { useLessons } from '@/hooks/useLessons';
import { usePageContent } from '@/hooks/useContent';
import { createBooking } from '@/services/bookingService';
import { detectUserLanguage } from '@/services/emailService';
import type { Equipment as ApiEquipment, Lesson as ApiLesson } from '@/lib/api/types';

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

interface SelectedEquipment {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  numberOfDays: number;
  message: string;
}

export default function BookOnlineInteractive() {
  const { data: pageContent } = usePageContent('book-online');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState<SelectedEquipment[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    arrivalDate: '',
    numberOfDays: 1,
    message: '',
  });
  const [currency, setCurrency] = useState('GEL');
  const [bookingId, setBookingId] = useState('');
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [emailSendStatus, setEmailSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [bookingError, setBookingError] = useState<string | null>(null);

  const headingContent = pageContent?.heading as Record<string, string> | undefined;
  const currencyContent = pageContent?.currency as Record<string, string> | undefined;
  const stepsContent = pageContent?.steps as Record<string, string> | undefined;
  const step1Content = pageContent?.step_1 as Record<string, string> | undefined;
  const step2Content = pageContent?.step_2 as Record<string, string> | undefined;
  const navigationContent = pageContent?.navigation as Record<string, string> | undefined;

  const steps = [
    stepsContent?.step_1_label || 'Select Items',
    stepsContent?.step_2_label || 'Choose Dates',
    stepsContent?.step_3_label || 'Your Details',
    stepsContent?.step_4_label || 'Confirmation',
  ];

  const exchangeRates = {
    GEL: 1,
    EUR: 0.35,
    USD: 0.37,
  };

  const { equipment: apiEquipment, loading: equipmentLoading } = useEquipment({ per_page: 50 });
  const { data: apiLessons, loading: lessonsLoading } = useLessons();

  const equipmentData: Equipment[] = apiEquipment.map((item: ApiEquipment) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image || '',
    alt: item.alt,
    description: item.description,
    available: item.available,
  }));

  const lessonData: Lesson[] = (apiLessons || []).map((item: ApiLesson) => ({
    id: item.id,
    title: item.title,
    instructor: item.instructor,
    level: item.level,
    duration: String(item.duration),
    price: item.price,
    image: item.image || '',
    alt: item.title,
    description: item.description,
    available: item.available,
  }));

  const handleEquipmentSelect = (equipment: Equipment) => {
    const existingIndex = selectedEquipment.findIndex((item) => item.id === equipment.id);

    if (existingIndex >= 0) {
      setSelectedEquipment(selectedEquipment.filter((item) => item.id !== equipment.id));
    } else {
      setSelectedEquipment([
        ...selectedEquipment,
        {
          id: equipment.id,
          name: equipment.name,
          price: equipment.price,
          quantity: 1,
        },
      ]);
    }
  };

  const handleQuantityChange = (equipmentId: number, change: number) => {
    setSelectedEquipment(
      selectedEquipment.map((item) =>
        item.id === equipmentId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleLessonSelect = (lesson: Lesson) => {
    if (selectedLesson?.id === lesson.id) {
      setSelectedLesson(null);
    } else {
      setSelectedLesson(lesson);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return selectedEquipment.length > 0 || selectedLesson !== null;
      case 1:
        return startDate !== '' && endDate !== '';
      case 2:
        return (
          customerDetails.firstName.trim() !== '' &&
          customerDetails.lastName.trim() !== '' &&
          customerDetails.email.trim() !== '' &&
          customerDetails.arrivalDate !== '' &&
          customerDetails.numberOfDays > 0 &&
          customerDetails.message.trim() !== ''
        );
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    if (canProceedToNextStep()) {
      if (currentStep === 2) {
        setEmailSendStatus('sending');
        setBookingError(null);

        const bookingRequest = {
          first_name: customerDetails.firstName,
          last_name: customerDetails.lastName,
          email: customerDetails.email,
          phone: customerDetails.phone || undefined,
          start_date: startDate,
          end_date: endDate,
          arrival_date: customerDetails.arrivalDate || undefined,
          number_of_days: customerDetails.numberOfDays,
          currency: currency as 'GEL' | 'EUR' | 'USD',
          customer_message: customerDetails.message || undefined,
          language: detectUserLanguage(),
          equipment: selectedEquipment.length > 0
            ? selectedEquipment.map(item => ({
                equipment_id: item.id,
                quantity: item.quantity,
              }))
            : undefined,
          lesson: selectedLesson
            ? { lesson_id: selectedLesson.id }
            : undefined,
        };

        try {
          const booking = await createBooking(bookingRequest);
          setBookingId(booking.bookingId);
          setIsBookingComplete(true);
          setEmailSendStatus('sent');
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Booking failed. Please try again.';
          setBookingError(message);
          setEmailSendStatus('error');
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNewBooking = () => {
    setCurrentStep(0);
    setSelectedEquipment([]);
    setSelectedLesson(null);
    setStartDate('');
    setEndDate('');
    setCustomerDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      arrivalDate: '',
      numberOfDays: 1,
      message: '',
    });
    setIsBookingComplete(false);
    setBookingId('');
    setEmailSendStatus('idle');
    setBookingError(null);
  };

  const isDataLoading = equipmentLoading || lessonsLoading;

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <BookingConfirmation
            bookingId={bookingId}
            customerName={`${customerDetails.firstName} ${customerDetails.lastName}`}
            email={customerDetails.email}
            onNewBooking={handleNewBooking}
            emailSendStatus={emailSendStatus}
            pageContent={pageContent}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-outfit font-bold text-4xl md:text-5xl text-foreground mb-4">
              {headingContent?.title || 'Book Your Adventure'}
            </h1>
            <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
              {headingContent?.subtitle || 'Reserve premium equipment and expert lessons for an unforgettable skiing experience in Gudauri'}
            </p>
          </div>

          <div className="flex items-center justify-end mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="GlobeAltIcon" size={20} variant="outline" className="text-muted-foreground" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-1 border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="GEL">₾ {currencyContent?.gel || 'GEL'}</option>
                <option value="EUR">€ {currencyContent?.eur || 'EUR'}</option>
                <option value="USD">$ {currencyContent?.usd || 'USD'}</option>
              </select>
            </div>
          </div>

          <BookingStepIndicator currentStep={currentStep} steps={steps} />

          {bookingError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center text-red-700">
                <Icon name="ExclamationTriangleIcon" size={20} variant="outline" className="mr-2" />
                <span className="font-inter text-sm">{bookingError}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-lg shadow-subtle p-6">
                    <h2 className="font-outfit font-bold text-2xl text-foreground mb-6 flex items-center">
                      <Icon name="CubeIcon" size={28} variant="outline" className="mr-3" />
                      {step1Content?.equipment_title || 'Select Equipment'}
                    </h2>
                    {isDataLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {equipmentData.map((equipment) => (
                          <EquipmentSelectionCard
                            key={equipment.id}
                            equipment={equipment}
                            isSelected={selectedEquipment.some((item) => item.id === equipment.id)}
                            onSelect={() => handleEquipmentSelect(equipment)}
                            quantity={
                              selectedEquipment.find((item) => item.id === equipment.id)?.quantity || 1
                            }
                            onQuantityChange={(change) => handleQuantityChange(equipment.id, change)}
                            pageContent={pageContent}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-card rounded-lg shadow-subtle p-6">
                    <h2 className="font-outfit font-bold text-2xl text-foreground mb-6 flex items-center">
                      <Icon name="AcademicCapIcon" size={28} variant="outline" className="mr-3" />
                      {step1Content?.lessons_title || 'Add Ski Lesson (Optional)'}
                    </h2>
                    {isDataLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lessonData.map((lesson) => (
                          <LessonSelectionCard
                            key={lesson.id}
                            lesson={lesson}
                            isSelected={selectedLesson?.id === lesson.id}
                            onSelect={() => handleLessonSelect(lesson)}
                            pageContent={pageContent}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="bg-card rounded-lg shadow-subtle p-6">
                  <h2 className="font-outfit font-bold text-2xl text-foreground mb-6 flex items-center">
                    <Icon name="CalendarDaysIcon" size={28} variant="outline" className="mr-3" />
                    {step2Content?.title || 'Select Rental Dates'}
                  </h2>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    pageContent={pageContent}
                  />
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground font-inter flex items-start">
                      <Icon name="InformationCircleIcon" size={16} variant="outline" className="mr-2 mt-0.5" />
                      {step2Content?.info_text || 'Equipment must be returned by 6:00 PM on the end date. Late returns may incur additional charges.'}
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <CustomerDetailsForm
                  details={customerDetails}
                  onDetailsChange={setCustomerDetails}
                  pageContent={pageContent}
                />
              )}

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-muted text-foreground rounded-md font-outfit font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Icon name="ChevronLeftIcon" size={20} variant="outline" className="mr-2" />
                  {navigationContent?.previous || 'Previous'}
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep() || emailSendStatus === 'sending'}
                  className="px-6 py-3 bg-conversionAccent text-white rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {emailSendStatus === 'sending' ? (
                    <>
                      <Icon name="ArrowPathIcon" size={20} variant="outline" className="mr-2 animate-spin" />
                      {navigationContent?.submit_booking || 'Submitting'}...
                    </>
                  ) : (
                    <>
                      {currentStep === 2 ? (navigationContent?.submit_booking || 'Submit Booking') : (navigationContent?.next_step || 'Next Step')}
                      <Icon name="ChevronRightIcon" size={20} variant="outline" className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <BookingSummary
                selectedEquipment={selectedEquipment}
                selectedLesson={selectedLesson}
                startDate={startDate}
                endDate={endDate}
                currency={currency}
                exchangeRates={exchangeRates}
                pageContent={pageContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
