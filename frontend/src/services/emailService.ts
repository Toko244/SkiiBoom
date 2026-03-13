interface BookingEmailData {
  bookingId: string;
  customerName: string;
  email: string;
  language: string;
  equipment: Array<{ name: string; quantity: number; price: number }>;
  lesson?: { title: string; instructor: string; duration: string; price: number };
  startDate: string;
  endDate: string;
  arrivalDate: string;
  numberOfDays: number;
  customerMessage: string;
  totalAmount: number;
  currency: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendBookingConfirmationEmail(
  bookingData: BookingEmailData
): Promise<EmailResponse> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured');
    }

    const functionUrl = `${supabaseUrl}/functions/v1/send-booking-email`;

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export function detectUserLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('ka')) return 'ka';
  if (browserLang.startsWith('ru')) return 'ru';
  return 'en';
}