import prisma from "./prisma";
import type { BookingInput, AdminUpdateBookingInput } from "./validations";

export interface StoredBooking {
  id: string;
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  preferredTime?: string | null;
  address?: string | null;
  sourceForm: string;
  status: string;
  adminNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory fallback cache when PostgreSQL is not yet configured or connection fails
const inMemoryBookings: StoredBooking[] = [
  {
    id: "sample-lead-01",
    customerName: "રાજેશભાઈ પટેલ (Rajesh Patel)",
    phoneNumber: "9825012345",
    serviceType: "Filter Change & TDS Balance",
    preferredTime: "Morning (9 AM - 1 PM)",
    address: "B-402, Shivam Heights, Vastrapur, Ahmedabad",
    sourceForm: "hero_quick_form",
    status: "PENDING",
    adminNotes: "Customer reported water taste issue after 8 months.",
    createdAt: new Date(Date.now() - 3600000 * 2),
    updatedAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "sample-lead-02",
    customerName: "પ્રિયા શર્મા (Priya Sharma)",
    phoneNumber: "9898054321",
    serviceType: "Comprehensive AMC",
    preferredTime: "Afternoon (1 PM - 5 PM)",
    address: "12, Shukan Bungalows, Bodakdev, Ahmedabad",
    sourceForm: "main_contact_form",
    status: "CONTACTED",
    adminNotes: "Quote shared for Kent Grand+ RO AMC.",
    createdAt: new Date(Date.now() - 3600000 * 6),
    updatedAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: "sample-lead-03",
    customerName: "વિજય એન્ટરપ્રાઇઝ (Vijay Logistics)",
    phoneNumber: "9724098765",
    serviceType: "Commercial Plant (250 LPH)",
    preferredTime: "Morning (9 AM - 1 PM)",
    address: "Shed No. 14, Changodar GIDC, Ahmedabad",
    sourceForm: "main_contact_form",
    status: "ASSIGNED",
    adminNotes: "Technician Haresh assigned for plant site survey.",
    createdAt: new Date(Date.now() - 3600000 * 24),
    updatedAt: new Date(Date.now() - 3600000 * 12),
  },
];

export async function createBooking(input: BookingInput): Promise<StoredBooking> {
  try {
    const booking = await prisma.serviceBooking.create({
      data: {
        customerName: input.customerName,
        phoneNumber: input.phoneNumber,
        serviceType: input.serviceType,
        preferredTime: input.preferredTime ?? null,
        address: input.address ?? null,
        sourceForm: input.sourceForm ?? "website",
        status: "PENDING",
      },
    });
    return booking;
  } catch (error) {
    console.warn("[Database] Prisma create failed (falling back to memory store):", error instanceof Error ? error.message : error);
    const fallbackBooking: StoredBooking = {
      id: "cl" + Math.random().toString(36).substring(2, 11),
      customerName: input.customerName,
      phoneNumber: input.phoneNumber,
      serviceType: input.serviceType,
      preferredTime: input.preferredTime ?? null,
      address: input.address ?? null,
      sourceForm: input.sourceForm ?? "website",
      status: "PENDING",
      adminNotes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryBookings.unshift(fallbackBooking);
    return fallbackBooking;
  }
}

export async function getBookings(statusFilter?: string): Promise<StoredBooking[]> {
  try {
    const whereClause = statusFilter && statusFilter !== "ALL" ? { status: statusFilter } : {};
    const bookings = await prisma.serviceBooking.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
    return bookings;
  } catch (error) {
    console.warn("[Database] Prisma findMany failed (falling back to memory store):", error instanceof Error ? error.message : error);
    if (statusFilter && statusFilter !== "ALL") {
      return inMemoryBookings.filter((b) => b.status === statusFilter);
    }
    return inMemoryBookings;
  }
}

export async function updateBooking(input: AdminUpdateBookingInput): Promise<StoredBooking | null> {
  try {
    const dataToUpdate: Record<string, any> = {};
    if (input.status) dataToUpdate.status = input.status;
    if (input.adminNotes !== undefined) dataToUpdate.adminNotes = input.adminNotes;

    const updated = await prisma.serviceBooking.update({
      where: { id: input.id },
      data: dataToUpdate,
    });
    return updated;
  } catch (error) {
    console.warn("[Database] Prisma update failed (falling back to memory store):", error instanceof Error ? error.message : error);
    const index = inMemoryBookings.findIndex((b) => b.id === input.id);
    if (index === -1) return null;
    const existing = inMemoryBookings[index];
    const updated: StoredBooking = {
      ...existing,
      status: input.status ?? existing.status,
      adminNotes: input.adminNotes !== undefined ? input.adminNotes : existing.adminNotes,
      updatedAt: new Date(),
    };
    inMemoryBookings[index] = updated;
    return updated;
  }
}
