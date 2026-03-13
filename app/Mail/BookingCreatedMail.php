<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingCreatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Booking $booking
    ) {}

    public function envelope(): Envelope
    {
        $subjects = [
            'en' => "Booking Confirmation - {$this->booking->booking_ref}",
            'ka' => "დაჯავშნის დადასტურება - {$this->booking->booking_ref}",
            'ru' => "Подтверждение бронирования - {$this->booking->booking_ref}",
        ];

        return new Envelope(
            subject: $subjects[$this->booking->language] ?? $subjects['en'],
        );
    }

    public function content(): Content
    {
        $lang = $this->booking->language ?? 'en';
        $this->booking->load(['equipmentItems.equipment', 'lessonItems.lesson', 'lessonItems.lessonPackage']);

        return new Content(
            view: "emails.booking-created.{$lang}",
            with: [
                'booking' => $this->booking,
                'equipmentItems' => $this->booking->equipmentItems,
                'lessonItems' => $this->booking->lessonItems,
            ],
        );
    }
}
