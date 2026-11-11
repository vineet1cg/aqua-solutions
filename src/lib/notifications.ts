import { Resend } from "resend";

export interface BookingNotificationData {
  bookingId: string;
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  preferredTime?: string | null;
  address?: string | null;
  sourceForm?: string;
  createdAt?: Date;
}

export function generateWhatsAppMessage(data: BookingNotificationData): string {
  const addressText = data.address?.trim() ? data.address.trim() : "અમદાવાદ (Ahmedabad)";
  const timeText = data.preferredTime?.trim() ? data.preferredTime.trim() : "As soon as possible / ગમે ત્યારે";
  const refText = data.bookingId ? `\n• Booking Ref: #${data.bookingId.slice(-6).toUpperCase()}` : "";

  return `Hi, I am ${data.customerName}.

I would like to book an RO water purifier service with Aqua Solutions:
• Service: ${data.serviceType}
• Mobile: +91 ${data.phoneNumber}
• Preferred Time: ${timeText}
• Address/Area: ${addressText}${refText}

નમસ્તે, મારું નામ ${data.customerName} છે. મને Aqua Solutions માંથી ${data.serviceType} માટે સર્વિસ જોઈએ છે. કૃપા કરીને મારું બુકિંગ કન્ફર્મ કરો.`;
}

export function generateWhatsAppUrl(data: BookingNotificationData): string {
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "9662021602";
  const text = generateWhatsAppMessage(data);
  return `https://wa.me/91${businessPhone}?text=${encodeURIComponent(text)}`;
}

export async function sendOwnerEmailAlert(data: BookingNotificationData): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL || "aquasolutions.ahmedabad@gmail.com";

  // If no Resend API key or placeholder, skip mailer gracefully
  if (!apiKey || apiKey.startsWith("re_sample") || apiKey === "your_resend_api_key") {
    console.log("[Notification] Mailer skipped (direct WhatsApp flow active). Lead recorded:", {
      bookingId: data.bookingId,
      customer: data.customerName,
      phone: data.phoneNumber,
      service: data.serviceType,
    });
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);
    const emailResult = await resend.emails.send({
      from: "Aqua Solutions Alerts <onboarding@resend.dev>",
      to: [ownerEmail],
      subject: `🚨 નવી સર્વિસ બુકિંગ: ${data.customerName} (${data.serviceType})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px;">
          <h2 style="color: #0284c7; margin-top: 0;">Aqua Solutions — New Booking</h2>
          <p><strong>Customer:</strong> ${data.customerName}</p>
          <p><strong>Phone:</strong> +91 ${data.phoneNumber}</p>
          <p><strong>Service:</strong> ${data.serviceType}</p>
          <p><strong>Time:</strong> ${data.preferredTime || "N/A"}</p>
          <p><strong>Address:</strong> ${data.address || "N/A"}</p>
          <p><a href="https://wa.me/91${data.phoneNumber}" style="display:inline-block;padding:8px 16px;background:#0d9488;color:#fff;text-decoration:none;border-radius:4px;">Open WhatsApp with Customer</a></p>
        </div>
      `,
    });

    if (emailResult.error) {
      return { success: false, error: emailResult.error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
