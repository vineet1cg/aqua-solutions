import { NextRequest, NextResponse } from "next/server";
import { bookingSchema, adminUpdateBookingSchema } from "@/lib/validations";
import { createBooking, getBookings, updateBooking } from "@/lib/bookingStore";
import { sendOwnerEmailAlert, generateWhatsAppUrl } from "@/lib/notifications";

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cookieToken = request.cookies.get("admin_token")?.value;
  const expectedPassword = process.env.ADMIN_PASSWORD || "aquasolutions_admin_2026";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token === expectedPassword) return true;
  }

  if (cookieToken && cookieToken === expectedPassword) {
    return true;
  }

  return false;
}

// POST /api/bookings - Public booking creation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = bookingSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json(
        {
          success: false,
          error: firstError,
          details: parseResult.error.issues,
        },
        { status: 400 }
      );
    }

    const booking = await createBooking(parseResult.data);

    // Asynchronously send email notification to owner
    // We do not block the user response if email takes time
    sendOwnerEmailAlert({
      bookingId: booking.id,
      customerName: booking.customerName,
      phoneNumber: booking.phoneNumber,
      serviceType: booking.serviceType,
      preferredTime: booking.preferredTime,
      address: booking.address,
      sourceForm: booking.sourceForm,
      createdAt: booking.createdAt,
    }).catch((err) => console.error("[POST /api/bookings] Async email alert error:", err));

    const whatsappRedirectUrl = generateWhatsAppUrl({
      bookingId: booking.id,
      customerName: booking.customerName,
      phoneNumber: booking.phoneNumber,
      serviceType: booking.serviceType,
      preferredTime: booking.preferredTime,
      address: booking.address,
      sourceForm: booking.sourceForm,
      createdAt: booking.createdAt,
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        whatsappRedirectUrl,
        message: "તમારી સર્વિસ વિનંતી સફળતાપૂર્વક નોંધાઈ ગઈ છે! અમારા ટેકનિશિયન ટૂંક સમયમાં તમારો સંપર્ક કરશે.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/bookings] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "સર્વર એરર: કૃપા કરીને ફરી પ્રયાસ કરો અથવા સીધો કૉલ કરો (+91 96620 21602).",
      },
      { status: 500 }
    );
  }
}

// GET /api/bookings - Protected Admin view
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status") || "ALL";

    const bookings = await getBookings(statusFilter);
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("[GET /api/bookings] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// PATCH /api/bookings - Protected Admin update
export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parseResult = adminUpdateBookingSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid update payload", details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const updated = await updateBooking(parseResult.data);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Booking ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("[PATCH /api/bookings] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 });
  }
}
