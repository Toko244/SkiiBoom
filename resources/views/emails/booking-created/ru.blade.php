<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Подтверждение бронирования</title>
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
        <p>Подтверждение бронирования</p>
    </div>
    <div class="content">
        <p>Уважаемый(ая) {{ $booking->first_name }} {{ $booking->last_name }},</p>
        <p>Благодарим за бронирование! Вот детали вашей резервации:</p>

        <div class="booking-ref">
            Номер бронирования: {{ $booking->booking_ref }}
        </div>

        <div class="section">
            <h3>Детали бронирования</h3>
            <table>
                <tr><td><strong>Дата начала:</strong></td><td>{{ $booking->start_date->format('d.m.Y') }}</td></tr>
                <tr><td><strong>Дата окончания:</strong></td><td>{{ $booking->end_date->format('d.m.Y') }}</td></tr>
                <tr><td><strong>Продолжительность:</strong></td><td>{{ $booking->number_of_days }} дн.</td></tr>
                <tr><td><strong>Дата прибытия:</strong></td><td>{{ $booking->arrival_date->format('d.m.Y') }}</td></tr>
            </table>
        </div>

        @if($equipmentItems->count() > 0)
        <div class="section">
            <h3>Снаряжение</h3>
            <table>
                <thead><tr><th>Наименование</th><th>Кол-во</th><th>Цена/день</th><th>Итого</th></tr></thead>
                <tbody>
                    @foreach($equipmentItems as $item)
                    <tr>
                        <td>{{ $item->equipment?->name_ru ?? $item->equipment?->name_en ?? 'Снаряжение' }}</td>
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
            <h3>Уроки</h3>
            <table>
                <thead><tr><th>Урок</th><th>Цена</th></tr></thead>
                <tbody>
                    @foreach($lessonItems as $item)
                    <tr>
                        <td>{{ $item->lesson?->title_ru ?? $item->lesson?->title_en ?? $item->lessonPackage?->name_ru ?? $item->lessonPackage?->name_en ?? 'Урок' }}</td>
                        <td>{{ number_format($item->price, 2) }} {{ $booking->currency->value }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @endif

        <div class="section">
            <h3>Итого к оплате</h3>
            <table>
                <tr><td>Подитог:</td><td>{{ number_format($booking->subtotal, 2) }} {{ $booking->currency->value }}</td></tr>
                <tr><td>Налог (18%):</td><td>{{ number_format($booking->tax_amount, 2) }} {{ $booking->currency->value }}</td></tr>
                <tr class="total-row"><td><strong>Итого:</strong></td><td><strong>{{ number_format($booking->total_amount, 2) }} {{ $booking->currency->value }}</strong></td></tr>
            </table>
        </div>

        <div class="section">
            <h3>Дальнейшие действия</h3>
            <ol>
                <li>Сохраните номер бронирования: <strong>{{ $booking->booking_ref }}</strong></li>
                <li>Прибудьте в наш офис к дате заезда</li>
                <li>Предъявите номер бронирования на стойке</li>
                <li>Наша команда подготовит ваше снаряжение</li>
            </ol>
        </div>
    </div>
    <div class="footer">
        <p>SkiBoom Gudauri | Горнолыжный курорт Гудаури, Грузия</p>
        <p>📞 +995 555 123 456 | ✉️ info@skiboom.ge</p>
    </div>
</body>
</html>
