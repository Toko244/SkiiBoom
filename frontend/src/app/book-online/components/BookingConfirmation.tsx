import Icon from '@/components/ui/AppIcon';

interface BookingConfirmationProps {
  bookingId: string;
  customerName: string;
  email: string;
  onNewBooking: () => void;
  emailSendStatus?: 'idle' | 'sending' | 'sent' | 'error';
  pageContent?: Record<string, unknown> | null;
}

export default function BookingConfirmation({
  bookingId,
  customerName,
  email,
  onNewBooking,
  emailSendStatus = 'idle',
  pageContent,
}: BookingConfirmationProps) {
  const confirmation = pageContent?.confirmation as Record<string, unknown> | undefined;
  const nextStepsItems = (confirmation?.next_steps as string[] | undefined) || [];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg shadow-subtle p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-conversionAccent/10 rounded-full mb-4">
            <Icon name="CheckCircleIcon" size={48} variant="solid" className="text-conversionAccent" />
          </div>
          <h2 className="font-outfit font-bold text-3xl text-foreground mb-2">
            {(confirmation?.title as string) || 'Booking Request Submitted!'}
          </h2>
          <p className="text-muted-foreground font-inter">
            {(confirmation?.subtitle as string) || 'Your booking request has been received. We\'ll contact you shortly to confirm availability.'}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="TicketIcon" size={24} variant="outline" className="text-primary" />
            <p className="font-outfit font-semibold text-lg text-foreground">
              {(confirmation?.booking_id_label as string) || 'Booking ID'}: {bookingId}
            </p>
          </div>
          <h3 className="font-outfit font-semibold text-lg text-foreground mb-4">
            {(confirmation?.next_steps_title as string) || 'Next Steps:'}
          </h3>
          <ul className="space-y-3">
            {nextStepsItems.length > 0 ? (
              nextStepsItems.map((step, index) => {
                const icons = ['ClockIcon', 'EnvelopeIcon', 'CreditCardIcon'];
                return (
                  <li key={index} className="flex items-start text-muted-foreground font-inter">
                    <Icon name={icons[index % icons.length]} size={20} variant="outline" className="mr-3 mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                );
              })
            ) : (
              <>
                <li className="flex items-start text-muted-foreground font-inter">
                  <Icon name="ClockIcon" size={20} variant="outline" className="mr-3 mt-0.5 flex-shrink-0" />
                  <span>Our team will review your request and check equipment availability</span>
                </li>
                <li className="flex items-start text-muted-foreground font-inter">
                  <Icon name="EnvelopeIcon" size={20} variant="outline" className="mr-3 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a confirmation email with payment instructions within 24 hours</span>
                </li>
                <li className="flex items-start text-muted-foreground font-inter">
                  <Icon name="CreditCardIcon" size={20} variant="outline" className="mr-3 mt-0.5 flex-shrink-0" />
                  <span>Payment can be made upon arrival or via bank transfer after confirmation</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Email status section */}
        {emailSendStatus === 'sending' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-blue-700">
              <Icon name="ClockIcon" size={20} variant="outline" className="mr-2 animate-spin" />
              <span className="font-inter text-sm">{(confirmation?.email_sending as string) || 'Sending booking details to our team...'}</span>
            </div>
          </div>
        )}

        {emailSendStatus === 'sent' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-green-700">
              <Icon name="CheckCircleIcon" size={20} variant="solid" className="mr-2" />
              <span className="font-inter text-sm">{(confirmation?.email_sent as string) || 'Booking details sent successfully to our team!'}</span>
            </div>
          </div>
        )}

        {emailSendStatus === 'error' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-yellow-700">
              <Icon name="ExclamationTriangleIcon" size={20} variant="outline" className="mr-2" />
              <span className="font-inter text-sm">
                {(confirmation?.email_error as string) || 'Booking saved, but there was an issue sending the email. We\'ll still process your request.'}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onNewBooking}
            className="flex-1 px-6 py-3 bg-conversionAccent text-white rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300 flex items-center justify-center"
          >
            <Icon name="PlusIcon" size={20} variant="outline" className="mr-2" />
            {(confirmation?.new_booking_btn as string) || 'Make Another Booking'}
          </button>
          <a
            href="/homepage"
            className="flex-1 px-6 py-3 bg-muted text-foreground rounded-md font-outfit font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center text-center"
          >
            <Icon name="HomeIcon" size={20} variant="outline" className="mr-2" />
            {(confirmation?.home_btn as string) || 'Return to Home'}
          </a>
        </div>
      </div>
    </div>
  );
}