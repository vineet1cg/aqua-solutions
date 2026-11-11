import { z } from "zod";

// Helper to normalize phone numbers (strip +91, spaces, dashes, leading 0)
export function normalizeIndianPhone(input: string): string {
  const cleaned = input.replace(/[\s\-\(\)\+]/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return cleaned.slice(2);
  }
  if (cleaned.startsWith("0") && cleaned.length === 11) {
    return cleaned.slice(1);
  }
  return cleaned;
}

export const bookingSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "કૃપા કરીને પૂરું નામ લખો | Please enter your full name" })
    .max(100),
  phoneNumber: z
    .string()
    .transform(normalizeIndianPhone)
    .refine((val) => /^[6-9]\d{9}$/.test(val), {
      message: "માન્ય 10-અંકનો ભારતીય મોબાઈલ નંબર દાખલ કરો | Enter a valid 10-digit Indian mobile number",
    }),
  serviceType: z
    .string()
    .min(1, { message: "કૃપા કરીને સર્વિસ પસંદ કરો | Please select a service" }),
  preferredTime: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  sourceForm: z.enum(["hero_quick_form", "main_contact_form", "website"]).default("website"),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const adminUpdateBookingSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["PENDING", "CONTACTED", "ASSIGNED", "COMPLETED", "CANCELLED"]).optional(),
  adminNotes: z.string().optional().nullable(),
});

export type AdminUpdateBookingInput = z.infer<typeof adminUpdateBookingSchema>;
