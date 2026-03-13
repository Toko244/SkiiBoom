<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a5f, #2563eb); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .booking-ref { font-size: 20px; font-weight: bold; color: #2563eb; background: #eff6ff; padding: 12px; border-radius: 6px; text-align: center; margin: 20px 0; }
        .section { margin: 20px 0; }
        .section h3 { color: #1e3a5f; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f3f4f6; font-weight: 600; }
        .total-row { font-weight: bold; font-size: 18px; color: #1e3a5f; }
        .footer { background: #1e3a5f; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
        .footer a { color: #93c5fd; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⛷️ SkiBoom Gudauri</h1>
        <p>Booking Confirmation</p>
    </div>
    <div class="content">
        <p>Dear {{ $booking->first_name }} {{ $booking->last_name }},</p>
        <p>Thank you for your booking! Here are your reservation details:</p>

        <div class="booking-ref">
            Booking Reference: {{ $booking->booking_ref }}
        </div>

        <div class="section">
            <h3>Booking Details</h3>
            <table>
                <tr><td><strong>Start Date:</strong></td><td>{{ $booking->start_date->format('F j, Y') }}</td></tr>
                <tr><td><strong>End Date:</strong></td><td>{{ $booking->end_date->format('F j, Y') }}</td></tr>
                <tr><td><strong>Duration:</strong></td><td>{{ $booking->number_of_days }} day(s)</td></tr>
                <tr><td><strong>Arrival Date:</strong></td><td>{{ $booking->arrival_date->format('F j, Y') }}</td></tr>
            </table>
        </div>

        @if($equipmentItems->count() > 0)
        <div class="section">
            <h3>Equipment</h3>
            <table>
                <thead>
                    <tr><th>Item</th><th>Qty</th><th>Price/Day</th><th>Total</th></tr>
                </thead>
                <tbody>
                    @foreach($equipmentItems as $item)
                    <tr>
                        <td>{{ $item->equipment?->name_en ?? 'Equipment' }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>{{ number_format($item->price_per_day, 2) }} {{ $booking->currency->value }}</td>
                        <td>{{ number_format($item->line_total, 2) }} {{ $booking->currency->value }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @endif

        @if($lessonItems->count() > 0)
        <div class="section">
            <h3>Lessons</h3>
            <table>
                <thead>
                    <tr><th>Lesson</th><th>Price</th></tr>
                </thead>
                <tbody>
                    @foreach($lessonItems as $item)
                    <tr>
                        <td>{{ $item->lesson?->title_en ?? $item->lessonPackage?->name_en ?? 'Lesson' }}</td>
                        <td>{{ number_format($item->price, 2) }} {{ $booking->currency->value }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @endif

        <div class="section">
            <h3>Payment Summary</h3>
            <table>
                <tr><td>Subtotal:</td><td>{{ number_format($booking->subtotal, 2) }} {{ $booking->currency->value }}</td></tr>
                <tr><td>Tax (18%):</td><td>{{ number_format($booking->tax_amount, 2) }} {{ $booking->currency->value }}</td></tr>
                <tr class="total-row"><td><strong>Total:</strong></td><td><strong>{{ number_format($booking->total_amount, 2) }} {{ $booking->currency->value }}</strong></td></tr>
            </table>
        </div>

        @if($booking->customer_message)
        <div class="section">
            <h3>Your Message</h3>
            <p>{{ $booking->customer_message }}</p>
        </div>
        @endif

        <div class="section">
            <h3>What's Next?</h3>
            <ol>
                <li>Save your booking reference: <strong>{{ $booking->booking_ref }}</strong></li>
                <li>Arrive at our facility by your arrival date</li>
                <li>Present your booking reference at the counter</li>
                <li>Our team will prepare your equipment</li>
            </ol>
        </div>
    </div>
    <div class="footer">
        <p>SkiBoom Gudauri | Gudauri Ski Resort, Georgia</p>
        <p>📞 +995 555 123 456 | ✉️ info@skiboom.ge</p>
    </div>
</body>
</html>
