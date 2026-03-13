<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>დაჯავშნის დადასტურება</title>
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
    </style>
</head>
<body>
    <div class="header">
        <h1>⛷️ SkiBoom Gudauri</h1>
        <p>დაჯავშნის დადასტურება</p>
    </div>
    <div class="content">
        <p>ძვირფასო {{ $booking->first_name }} {{ $booking->last_name }},</p>
        <p>გმადლობთ დაჯავშნისთვის! აქ არის თქვენი რეზერვაციის დეტალები:</p>

        <div class="booking-ref">
            დაჯავშნის ნომერი: {{ $booking->booking_ref }}
        </div>

        <div class="section">
            <h3>დაჯავშნის დეტალები</h3>
            <table>
                <tr><td><strong>დაწყების თარიღი:</strong></td><td>{{ $booking->start_date->format('Y-m-d') }}</td></tr>
                <tr><td><strong>დასრულების თარიღი:</strong></td><td>{{ $booking->end_date->format('Y-m-d') }}</td></tr>
                <tr><td><strong>ხანგრძლივობა:</strong></td><td>{{ $booking->number_of_days }} დღე</td></tr>
                <tr><td><strong>ჩამოსვლის თარიღი:</strong></td><td>{{ $booking->arrival_date->format('Y-m-d') }}</td></tr>
            </table>
        </div>

        @if($equipmentItems->count() > 0)
        <div class="section">
            <h3>აღჭურვილობა</h3>
            <table>
                <thead><tr><th>ნივთი</th><th>რაოდ.</th><th>ფასი/დღე</th><th>სულ</th></tr></thead>
                <tbody>
                    @foreach($equipmentItems as $item)
                    <tr>
                        <td>{{ $item->equipment?->name_ka ?? $item->equipment?->name_en ?? 'აღჭურვილობა' }}</td>
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
            <h3>გაკვეთილები</h3>
            <table>
                <thead><tr><th>გაკვეთილი</th><th>ფასი</th></tr></thead>
                <tbody>
                    @foreach($lessonItems as $item)
                    <tr>
                        <td>{{ $item->lesson?->title_ka ?? $item->lesson?->title_en ?? $item->lessonPackage?->name_ka ?? $item->lessonPackage?->name_en ?? 'გაკვეთილი' }}</td>
                        <td>{{ number_format($item->price, 2) }} {{ $booking->currency->value }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @endif

        <div class="section">
            <h3>გადახდის შეჯამება</h3>
            <table>
                <tr><td>ქვეჯამი:</td><td>{{ number_format($booking->subtotal, 2) }} {{ $booking->currency->value }}</td></tr>
                <tr><td>გადასახადი (18%):</td><td>{{ number_format($booking->tax_amount, 2) }} {{ $booking->currency->value }}</td></tr>
                <tr class="total-row"><td><strong>სულ:</strong></td><td><strong>{{ number_format($booking->total_amount, 2) }} {{ $booking->currency->value }}</strong></td></tr>
            </table>
        </div>

        <div class="section">
            <h3>შემდეგი ნაბიჯები</h3>
            <ol>
                <li>შეინახეთ დაჯავშნის ნომერი: <strong>{{ $booking->booking_ref }}</strong></li>
                <li>მოხვდით ჩვენს ობიექტზე ჩამოსვლის თარიღისთვის</li>
                <li>წარმოადგინეთ დაჯავშნის ნომერი მიმღებთან</li>
                <li>ჩვენი გუნდი მოამზადებს თქვენს აღჭურვილობას</li>
            </ol>
        </div>
    </div>
    <div class="footer">
        <p>SkiBoom Gudauri | გუდაურის სათხილამურო კურორტი, საქართველო</p>
        <p>📞 +995 555 123 456 | ✉️ info@skiboom.ge</p>
    </div>
</body>
</html>
