<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(
        private BookingService $bookingService
    ) {}

    public function store(StoreBookingRequest $request): JsonResponse
    {
        $booking = $this->bookingService->createBooking($request->validated());

        return response()->json([
            'success' => true,
            'data' => new BookingResource($booking->load(['equipmentItems.equipment', 'lessonItems.lesson', 'lessonItems.lessonPackage'])),
            'message' => 'Booking created successfully.',
        ], 201);
    }

    public function show(string $bookingRef): JsonResponse
    {
        $booking = Booking::where('booking_ref', $bookingRef)
            ->with(['equipmentItems.equipment', 'lessonItems.lesson', 'lessonItems.lessonPackage'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new BookingResource($booking),
        ]);
    }

    public function myBookings(Request $request): JsonResponse
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['equipmentItems.equipment', 'lessonItems.lesson'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => BookingResource::collection($bookings),
            'meta' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ]);
    }

    public function cancel(Booking $booking, Request $request): JsonResponse
    {
        $this->bookingService->cancelBooking($booking);

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully.',
            'data' => new BookingResource($booking->fresh()),
        ]);
    }
}
